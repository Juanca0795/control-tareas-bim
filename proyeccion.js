
/* PROYECCIÓN SEMANAL — estimaciones manuales, nunca inferidas de tareas pendientes. */
function projectionDateValid(value){
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
  const date=new Date(value+'T00:00:00Z');
  return !Number.isNaN(date.getTime())&&date.toISOString().slice(0,10)===value;
}
function normalizeWeeklyForecasts(input){
  const out={};
  if(!input||typeof input!=='object'||Array.isArray(input))return out;
  for(const [week,records] of Object.entries(input)){
    if(!/^\d{4}-W\d{2}$/.test(week)||!records||typeof records!=='object'||Array.isArray(records))continue;
    const next={};
    for(const [taskId,record] of Object.entries(records)){
      if(!taskId||taskId.length>150||!record||typeof record!=='object')continue;
      const date=String(record.date||''),updatedAt=String(record.updatedAt||'');
      if(date&&!projectionDateValid(date))continue;
      if(!/^\d{4}-\d{2}-\d{2}T/.test(updatedAt)||!Number.isFinite(Date.parse(updatedAt)))continue;
      next[taskId]={date,updatedAt};
    }
    if(Object.keys(next).length)out[week]=next;
  }
  return out;
}
function mergeWeeklyForecasts(remote,local){
  const a=normalizeWeeklyForecasts(remote),b=normalizeWeeklyForecasts(local),out={};
  for(const week of new Set([...Object.keys(a),...Object.keys(b)])){
    out[week]={...b[week]};
    for(const [id,remoteRec] of Object.entries(a[week]||{})){
      const localRec=out[week][id];
      // El cambio más reciente prevalece. En empate prevalece lo confirmado en la nube.
      if(!localRec||remoteRec.updatedAt>=localRec.updatedAt)out[week][id]=remoteRec;
    }
  }
  return out;
}
// Mantener la subpestaña actual al recargar esta misma sesión del navegador.
let weeklyInnerTab=(()=>{
  try{
    const saved=sessionStorage.getItem('area-bim-weekly-subtab')||
      (typeof history!=='undefined'?history.state?.bimWeeklySubtab:'');
    return saved==='proyeccion'?'proyeccion':'seguimiento';
  }catch(e){return 'seguimiento'}
})();
function syncWeeklySubtab(){
  const tracking=$('#weekly-seguimiento'),forecast=$('#weekly-proyeccion');
  if(!tracking||!forecast)return;
  const showingForecast=weeklyInnerTab==='proyeccion';
  tracking.classList.toggle('hidden',showingForecast);
  forecast.classList.toggle('hidden',!showingForecast);
  for(const mode of ['seguimiento','proyeccion']){
    const button=$('#weekly-tab-'+mode);
    if(!button)continue;
    const active=mode===weeklyInnerTab;
    button.classList.toggle('active',active);
    button.setAttribute('aria-selected',String(active));
    button.tabIndex=active?0:-1;
  }
  $('#weekly-compare')?.closest('.weekly-compare')?.classList.toggle('hidden',showingForecast);
}
function switchWeeklySubtab(mode){
  if(!['seguimiento','proyeccion'].includes(mode))return;
  weeklyInnerTab=mode;
  try{sessionStorage.setItem('area-bim-weekly-subtab',mode)}catch(e){}
  if(typeof rememberBimViewInHistory==='function')rememberBimViewInHistory();
  syncWeeklySubtab();
  renderWeekly(true);
}
function weeklyProjectionModel(m,today=todayString()){
  const start=localISO(weekStart(m.week)),end=weekEnd(m.week);
  const cutoff=m.observedUntil||today;
  const historic=m.closed||end<today;
  const editable=!historic;
  const verified=t=>Boolean(t.done&&t.completedAt&&t.completedAt<=cutoff);
  const completed=m.rows.filter(verified);
  const pending=m.rows.filter(t=>!verified(t));
  const saved=catalogs.weeklyForecasts?.[m.week]||{};
  const earliest=today>start?today:start;
  const estimates=new Map();
  for(const task of pending){
    const date=saved[task.id]?.date||'';
    if(editable&&projectionDateValid(date)&&date>=earliest&&date<=end)
      estimates.set(task.id,date);
  }
  const projectedTotal=completed.length+estimates.size;
  const projectionReady=editable&&(pending.length===0||estimates.size>0)&&m.planned>0;
  const days=Array.from({length:7},(_,i)=>{
    const d=weekStart(m.week);
    d.setUTCDate(d.getUTCDate()+i);
    return localISO(d);
  });
  const planned=days.map(day=>m.rows.filter(t=>{
    const due=projectionDateValid(t.deadline)?t.deadline:end;
    const at=due<start?start:due>end?end:due;
    return at<=day;
  }).length);
  const actual=days.map(day=>day<=cutoff?completed.filter(t=>t.completedAt<=day).length:null);
  const projected=days.map(day=>{
    if(!projectionReady||day<earliest)return null;
    return completed.filter(t=>t.completedAt<=day).length+
      [...estimates.values()].filter(date=>date<=day).length;
  });
  return {m,start,end,cutoff,editable,earliest,completed,pending,estimates,saved,days,
    planned,actual,projected,projectedTotal,projectionReady};
}
function renderWeeklyProjection(m){
  const view=$('#weekly-proyeccion');
  if(!view)return;
  const p=weeklyProjectionModel(m);
  const percent=n=>m.planned?(100*n/m.planned).toFixed(1)+'%':'—';
  const kpis=[
    ['PROGRAMADAS',String(m.planned),'Compromisos de '+weekShort(m.week),''],
    ['CUMPLIDAS',String(p.completed.length),percent(p.completed.length)+' del alcance','positive'],
    ['PENDIENTES',String(p.pending.length),'Sin cierre verificado al corte','projection-pending'],
    ['PROYECCIÓN AL CIERRE',p.projectionReady?percent(p.projectedTotal):'—',
      !p.editable?'Histórico: no aplica estimación':!m.planned?'Sin compromisos':
      !p.projectionReady?'Asigna fechas a las tareas pendientes':
      p.projectedTotal+' de '+m.planned+' previstas · '+(p.pending.length-p.estimates.size)+' sin estimar','projection']
  ];
  $('#weekly-projection-kpis').innerHTML=kpis.map(([label,val,foot,kind])=>
    '<article class="weekly-projection-kpi '+kind+'"><span class="proj-label">'+esc(label)+'</span>'+
    '<strong class="proj-value">'+esc(val)+'</strong><span class="proj-foot">'+esc(foot)+'</span></article>').join('');
  const confirmed=p.completed.length,estimated=p.estimates.size,unestimated=m.planned-confirmed-estimated;
  const width=n=>m.planned?100*n/m.planned:0;
  $('#weekly-projection-bar').innerHTML=
    '<div class="proj-stack" role="img" aria-label="'+esc(confirmed+' cumplidas, '+estimated+' estimadas, '+unestimated+' sin estimar')+'">'+
      '<span class="proj-part done" style="width:'+width(confirmed)+'%"></span>'+
      '<span class="proj-part forecast" style="width:'+width(estimated)+'%"></span>'+
      '<span class="proj-part remaining" style="width:'+width(unestimated)+'%"></span></div>'+
    '<div class="proj-legend"><span><i class="done"></i> Cumplidas: '+confirmed+'</span>'+
    '<span><i class="forecast"></i> Previstas: '+estimated+'</span>'+
    '<span><i class="remaining"></i> Sin estimar: '+unestimated+'</span></div>';
  const note=$('#weekly-projection-status');
  note.textContent=!m.planned?'Sin actividades comprometidas para la semana seleccionada.':
    !p.editable?'Semana cerrada o vencida: se muestra el resultado histórico sin generar pronósticos.':
    !p.estimates.size&&p.pending.length?'Registra fechas estimadas para activar la proyección. No se asignan automáticamente.':
    p.pending.length===p.estimates.size?'Todas las actividades pendientes tienen una fecha estimada.':
    p.pending.length-p.estimates.size+' actividades pendientes aún no tienen fecha estimada. La proyección es parcial.';
  const current=new Map(tasks.map(t=>[t.id,t]));
  $('#weekly-projection-tasks').innerHTML=
    !m.planned?'<div class="proj-empty">No hay actividades para esta semana.</div>':
    !p.pending.length?'<div class="proj-empty">No quedan actividades pendientes en el alcance seleccionado.</div>':
    !p.editable?'<div class="proj-empty">Histórico de solo lectura. No es posible modificar estimaciones de esta semana.</div>':
    '<div class="proj-list">'+p.pending.map(t=>{
      const task=current.get(t.id),date=p.saved[t.id]?.date||'';
      const invalid=Boolean(date&&(date<p.earliest||date>p.end));
      return '<div class="proj-task">'+
        '<div class="proj-task-info"><strong title="'+esc(task?.title||t.title||t.id)+'">'+esc(task?.title||t.title||t.id)+'</strong>'+
        '<small>'+esc(t.id)+' · '+esc(t.owner||'Sin responsable')+
        ' · Plazo: '+esc(dateDisplay(t.deadline))+'</small></div>'+
        '<div class="proj-task-date"><label for="proj-'+esc(t.id)+'">Finalización prevista</label>'+
        '<input type="date" id="proj-'+esc(t.id)+'" data-projection-id="'+esc(t.id)+'" value="'+esc(date)+'" min="'+p.earliest+'" max="'+p.end+
        '" aria-label="Fecha estimada de '+esc(t.id)+'" />'+
        (invalid?'<small class="proj-invalid">Fecha anterior fuera del período válido; actualízala</small>':'')+'</div></div>';
    }).join('')+'</div>';
  renderWeeklyProjectionChart(p);
}
function renderWeeklyProjectionChart(p){
  const node=$('#weekly-projection-chart');
  if(!node)return;
  if(!p.m.planned){
    node.innerHTML='<div class="proj-empty">Sin actividades comprometidas para representar.</div>';
    return;
  }
  const labels=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  const c=weeklyChartOptions();
  // Curva S: unir registros acumulados entre días, sin escalones ni áreas rellenas.
  const projectionColor='#e8783c';
  if(typeof Chart!=='undefined'&&weeklyInnerTab==='proyeccion'){
    node.innerHTML='<canvas role="img" aria-label="Curvas acumuladas de actividades programadas, completadas y previstas"></canvas>';
    WEEKLY_CHARTS.projection=new Chart(node.querySelector('canvas'),{
      type:'line',data:{labels,datasets:[
        {label:'Programado acumulado',data:p.planned,borderColor:c.blue,backgroundColor:c.blue,
          tension:0,stepped:false,fill:false,borderWidth:2.3,pointRadius:3,pointHoverRadius:5,
          borderCapStyle:'round',borderJoinStyle:'round'},
        {label:'Cumplido real',data:p.actual,borderColor:c.green,backgroundColor:c.green,
          tension:0,stepped:false,fill:false,borderWidth:2.5,pointRadius:3,pointHoverRadius:5,
          borderCapStyle:'round',borderJoinStyle:'round',spanGaps:false},
        {label:'Proyección al cierre',data:p.projected,borderColor:projectionColor,backgroundColor:projectionColor,
          tension:0,stepped:false,fill:false,borderWidth:2.5,pointRadius:3,pointHoverRadius:5,
          borderCapStyle:'round',borderJoinStyle:'round',spanGaps:false}
      ]},
      options:{...weeklyChartMotionOptions(),responsive:true,maintainAspectRatio:false,
        interaction:{intersect:false,mode:'index'},
        plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>ctx.parsed.y===null?'Sin dato':ctx.dataset.label+': '+ctx.parsed.y+' entregables'}}},
        scales:{x:{ticks:{color:c.text},grid:{display:false}},
          y:{min:0,max:Math.max(1,p.m.planned),ticks:{color:c.text,precision:0,maxTicksLimit:6},
            grid:{color:c.grid}}}}
    });
    return;
  }
  // Fallback accesible cuando Chart.js no carga o la subpestaña está oculta.
  node.innerHTML='<div class="proj-fallback"><table><thead><tr><th>Día</th><th>Programa</th><th>Real</th><th>Proyección</th></tr></thead><tbody>'+
    labels.map((day,i)=>'<tr><th>'+day+'</th><td>'+p.planned[i]+'</td><td>'+
      (p.actual[i]===null?'—':p.actual[i])+'</td><td>'+
      (p.projected[i]===null?'—':p.projected[i])+'</td></tr>').join('')+'</tbody></table></div>';
}
document.addEventListener('change',event=>{
  const field=event.target.closest('[data-projection-id]');
  if(!field)return;
  const m=weeklyMetrics(selectedWeek),p=weeklyProjectionModel(m),id=field.dataset.projectionId;
  if(currentView!=='weekly'||weeklyInnerTab!=='proyeccion'||!p.editable||
     !p.pending.some(row=>row.id===id)){
    toast('No se puede editar esta proyección.');renderWeekly();return;
  }
  const date=field.value;
  if(date&&(!projectionDateValid(date)||date<p.earliest||date>p.end)){
    toast('La fecha debe estar dentro de los días restantes de la semana.');renderWeekly();return;
  }
  if((catalogs.weeklyForecasts?.[m.week]?.[id]?.date||'')===date)return;
  catalogs.weeklyForecasts={...(catalogs.weeklyForecasts||{})};
  catalogs.weeklyForecasts[m.week]={...(catalogs.weeklyForecasts[m.week]||{}),
    [id]:{date,updatedAt:new Date().toISOString()}};
  persist();
  toast(date?'Fecha estimada guardada':'Estimación retirada');
});
