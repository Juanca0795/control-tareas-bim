
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
  // Al entrar a Proyección semanal se parte de la semana vigente.
  if(mode==='proyeccion'&&weeklyInnerTab!=='proyeccion'&&!weeklyProjectionMonthlyMode){
    selectedWeek=isoWeekKey(new Date());
    try{sessionStorage.setItem('area-bim-selected-week',selectedWeek)}catch(e){}
    if(typeof ensureWeeklyTimelineWindow==='function')ensureWeeklyTimelineWindow(selectedWeek);
  }
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
  // El fin programado define el compromiso. Sin plazo no se proyecta.
  // El cierre real se obtiene exclusivamente de completedAt.
  const scheduled=m.rows.filter(t=>projectionDateValid(t.deadline));
  const verified=t=>Boolean(t.done&&t.completedAt&&t.completedAt<=cutoff);
  const completed=scheduled.filter(verified);
  const pending=scheduled.filter(t=>!verified(t));
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
  const planned=days.map(day=>scheduled.filter(t=>{
    const due=t.deadline;
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
// Modo de visualización de Curva S. No altera los compromisos ni pronósticos.
let weeklyProjectionMonthlyMode=false;
// Ventana de la Curva S independiente del selector de compromisos.
// Se inicializa al dibujar por primera vez: este archivo se carga en <head>
// antes de que index.html declare isoWeekKey y todayString.
let projectionTrendWeekAnchor=null;
let projectionTrendMonthAnchor=null;
function ensureProjectionTrendAnchors(){
  if(!projectionTrendWeekAnchor)projectionTrendWeekAnchor=isoWeekKey(new Date());
  if(!projectionTrendMonthAnchor)projectionTrendMonthAnchor=todayString().slice(0,7);
}
function navigateProjectionTrend(direction){
  if(!Number.isInteger(direction)||Math.abs(direction)!==1)return;
  if(weeklyProjectionMonthlyMode){
    ensureProjectionTrendAnchors();
    projectionTrendMonthAnchor=offsetPpcMonth(projectionTrendMonthAnchor,direction);
    if(typeof renderWeekly==='function')renderWeekly();
  }else{
    // La curva diaria, los KPI y la línea de tiempo usan la MISMA semana.
    changeWeeklyWeek(neighborWeek(selectedWeek,direction));
  }
}
function resetProjectionTrend(){
  projectionTrendWeekAnchor=isoWeekKey(new Date());
  projectionTrendMonthAnchor=todayString().slice(0,7);
  if(weeklyProjectionMonthlyMode){
    if(typeof renderWeekly==='function')renderWeekly();
  }else{
    changeWeeklyWeek(projectionTrendWeekAnchor);
  }
}
function toggleProjectionMonthlyMode(checked){
  weeklyProjectionMonthlyMode=Boolean(checked);
  if(typeof renderWeekly==='function')renderWeekly();
}
// Los meses usan el mismo criterio del PPC: mes del jueves ISO de la semana.
// Se consideran los compromisos del alcance y sus cierres verificados, sin
// duplicar una tarea dentro de una misma semana ni inventar fechas previstas.
function projectionWeeksForPeriod(period,monthly){
  return monthly?weeksAssignedToPpcMonth(period):[period];
}
function projectionPeriodSummary(period,monthly){
  const weeks=projectionWeeksForPeriod(period,monthly);
  const weekly=weeks.map(week=>{
    const m=weeklyMetrics(week);
    return {m,p:weeklyProjectionModel(m)};
  });
  const total=key=>weekly.reduce((sum,row)=>sum+row.m[key],0);
  const planned=total('planned'),completed=total('completed');
  const estimated=weekly.reduce((sum,row)=>sum+row.p.estimates.size,0);
  const unestimated=Math.max(0,planned-completed-estimated);
  const now=monthly?todayString().slice(0,7):isoWeekKey(new Date());
  const historic=period<now;
  return {period,monthly,weeks,planned,completed,estimated,
    remaining:planned-completed,unestimated,historic,
    projectedTotal:completed+estimated,
    projectionReady:!historic&&planned>0&&(estimated>0||completed===planned)};
}
function projectionTrendModel(){
  ensureProjectionTrendAnchors();
  const monthly=weeklyProjectionMonthlyMode;
  const periods=monthly?
    Array.from({length:9},(_,i)=>offsetPpcMonth(projectionTrendMonthAnchor,i-4)):
    Array.from({length:9},(_,i)=>neighborWeek(projectionTrendWeekAnchor,i-4));
  const now=monthly?todayString().slice(0,7):isoWeekKey(new Date());
  const summaries=periods.map(period=>projectionPeriodSummary(period,monthly));
  const labels=periods.map(monthly?ppcMonthlyLabel:weekShort);
  const planned=[],actual=[],forecast=[];
  // Acumulado real: incluir compromisos anteriores a la ventana visible.
  const earlierWeeks=new Set([
    ...tasks.map(t=>effectiveTaskWeek(t)),
    ...weeklySnapshots.map(t=>t.week)
  ].filter(w=>w&&weekStart(w)&&(monthly?monthOfPpcWeek(w)<periods[0]:w<periods[0])));
  let runningPlanned=0,runningReal=0;
  for(const week of earlierWeeks){
    const previous=weeklyMetrics(week);
    runningPlanned+=previous.planned;
    runningReal+=previous.completed;
  }
  for(const summary of summaries){
    runningPlanned+=summary.planned;
    planned.push(runningPlanned);
    if(summary.period<=now)runningReal+=summary.completed;
    actual.push(summary.period<=now?runningReal:null);
  }
  const currentIndex=periods.indexOf(now);
  const lastForecastIndex=summaries.findLastIndex((r,i)=>i>=Math.max(0,currentIndex)&&r.estimated>0);
  // Sólo se traza una proyección si existe al menos una fecha ingresada.
  // El pronóstico parte del último cumplimiento verificable, no del programa.
  let runningProjected=0;
  for(let i=0;i<summaries.length;i++){
    const row=summaries[i];
    if(i<currentIndex||currentIndex<0||lastForecastIndex<0||i>lastForecastIndex){
      forecast.push(null);continue;
    }
    runningProjected+=row.estimated;
    forecast.push(runningReal+runningProjected);
  }
  return {monthly,periods,labels,summaries,planned,actual,forecast,
    hasForecast:lastForecastIndex>=0,now};
}
function renderWeeklyProjection(m){
  const view=$('#weekly-proyeccion');
  if(!view)return;
  const p=weeklyProjectionModel(m),monthly=weeklyProjectionMonthlyMode;
  const month=monthOfPpcWeek(m.week);
  const totals=monthly?projectionPeriodSummary(month,true):null;
  const planned=monthly?totals.planned:m.planned;
  const done=monthly?totals.completed:p.completed.length;
  const pending=monthly?totals.remaining:p.pending.length;
  const estimates=monthly?totals.estimated:p.estimates.size;
  const projected=monthly?totals.projectedTotal:p.projectedTotal;
  const ready=monthly?totals.projectionReady:p.projectionReady;
  const editable=monthly?!totals.historic:p.editable;
  const percent=n=>planned?(100*n/planned).toFixed(1)+'%':'—';
  $('#weekly-projection-kpis').setAttribute('aria-label',monthly?'Indicadores de proyección mensual':'Indicadores de proyección semanal');
  $('#weekly-projection-composition-title').textContent=monthly?
    'COMPOSICIÓN DEL COMPROMISO MENSUAL':'COMPOSICIÓN DEL COMPROMISO SEMANAL';
  $('#weekly-projection-pending-title').textContent='ESTIMACIÓN DE ACTIVIDADES PENDIENTES';
  $('#weekly-projection-pending-desc').textContent=monthly?
    'Las fechas se siguen registrando en la semana '+weekShort(m.week)+'; los KPI y la Curva S muestran el mes completo.':
    'Indica cuándo esperas completar cada entregable pendiente de esta semana';
  const kpis=[
    ['PROGRAMADAS',String(planned),'Compromisos de '+(monthly?ppcMonthlyLabel(month):weekShort(m.week)),''],
    ['CUMPLIDAS',String(done),percent(done)+' del alcance','positive'],
    ['PENDIENTES',String(pending),'Sin cierre verificado al corte','projection-pending'],
    ['PROYECCIÓN AL CIERRE',ready?percent(projected):'—',
      !editable?'Histórico: no aplica estimación':!planned?'Sin compromisos':
      !ready?'Asigna fechas a las tareas pendientes':
      projected+' de '+planned+' previstas · '+(pending-estimates)+' sin estimar','projection']
  ];
  $('#weekly-projection-kpis').innerHTML=kpis.map(([label,val,foot,kind])=>
    '<article class="weekly-projection-kpi '+kind+'"><span class="proj-label">'+esc(label)+'</span>'+
    '<strong class="proj-value">'+esc(val)+'</strong><span class="proj-foot">'+esc(foot)+'</span></article>').join('');
  const confirmed=done,estimated=estimates,unestimated=planned-confirmed-estimated;
  const width=n=>planned?100*n/planned:0;
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
  const chartStatus=$('#weekly-projection-chart-status');
  if(chartStatus){
    const lastReal=[...p.actual].reverse().find(Number.isFinite);
    const real=lastReal===undefined?null:lastReal;
    chartStatus.innerHTML=
      '<span class="proj-chart-reality"><i aria-hidden="true"></i>'+
        (real===null?'Cumplido real: sin corte registrado':'Cumplido real al corte: <strong>'+real+'</strong>')+'</span>'+
      (!p.projectionReady&&p.pending.length?
        '<span class="proj-chart-unestimated">Proyección pendiente · Sin fecha estimada</span>':'');
  }
  const projectionLegend=$('#weekly-projection-legend-forecast');
  if(projectionLegend)projectionLegend.textContent=
    p.projectionReady?'Proyección al cierre':'Proyección pendiente';
  renderWeeklyProjectionChart(p);
}
// Curva S comparativa de 9 períodos (4 anteriores, elegido y 4 posteriores).
// El acumulado reinicia en el primer período visible, nunca extrapola tareas.
function renderWeeklyProjectionChart(p){
  const node=$('#weekly-projection-chart');
  if(!node)return;
  // Modo semanal: mostrar LUN-DOM de la semana seleccionada, no nueve semanas.
  if(!weeklyProjectionMonthlyMode){
    const checkbox=$('#weekly-projection-monthly');
    if(checkbox)checkbox.checked=false;
    const heading=$('#weekly-projection-trend-title');
    const description=$('#weekly-projection-trend-desc');
    const range=$('#weekly-projection-trend-range');
    if(heading)heading.textContent='CURVA S · EVOLUCIÓN SEMANAL ACUMULADA';
    if(description)description.textContent='Acumulado diario de lunes a domingo · Programado · Cumplido real · Proyección';
    if(range)range.textContent=weekShort(p.m.week)+' · '+weekDatesText(p.m.week);
    const status=$('#weekly-projection-chart-status');
    const lastReal=[...p.actual].reverse().find(Number.isFinite);
    if(status)status.innerHTML=
      '<span class="proj-chart-reality"><i aria-hidden="true"></i>'+
      (lastReal===undefined?'Cumplido real: sin corte registrado':
        'Cumplido real al corte: <strong>'+lastReal+'</strong>')+'</span>'+
      (!p.estimates.size?'<span class="proj-chart-unestimated">Proyección pendiente · Sin fecha estimada</span>':'');
    const legend=$('#weekly-projection-legend-forecast');
    if(legend)legend.textContent=p.estimates.size?'Proyección con fechas estimadas':'Proyección pendiente';
    renderWeeklyProjectionDailyChart(p);
    return;
  }
  // El modo mensual conserva la comparación de nueve meses y el acumulado histórico.
  const model=projectionTrendModel();
  const {monthly,periods,labels,planned,actual,forecast}=model;
  const periodLabel=monthly?ppcMonthlyLabel:weekShort;
  const selectedLabel=monthly?periodLabel(monthOfPpcWeek(selectedWeek)):periodLabel(selectedWeek);
  const heading=$('#weekly-projection-trend-title');
  const description=$('#weekly-projection-trend-desc');
  const range=$('#weekly-projection-trend-range');
  const checkbox=$('#weekly-projection-monthly');
  if(checkbox)checkbox.checked=monthly;
  if(heading)heading.textContent='CURVA S · EVOLUCIÓN '+(monthly?'MENSUAL':'SEMANAL')+' ACUMULADA';
  if(description)description.textContent='Programado acumulado · Cumplido real · Proyección según fechas estimadas';
  if(range)range.textContent=labels.length?
    'Desde '+labels[0]+' · '+labels.length+(monthly?' meses':' semanas'):'Sin períodos';
  const periodTotals=model.summaries.reduce((n,summary)=>n+summary.planned,0);
  const chartStatus=$('#weekly-projection-chart-status');
  const lastReal=[...actual].reverse().find(Number.isFinite);
  if(chartStatus){
    chartStatus.innerHTML=
      '<span class="proj-chart-reality"><i aria-hidden="true"></i>'+
      (lastReal===undefined?'Cumplido real: sin corte registrado':
        'Cumplido real acumulado: <strong>'+lastReal+'</strong>')+'</span>'+
      (!model.hasForecast?
        '<span class="proj-chart-unestimated">Proyección pendiente · Sin fecha estimada</span>':'');
  }
  const forecastLegend=$('#weekly-projection-legend-forecast');
  if(forecastLegend)forecastLegend.textContent=model.hasForecast?'Proyección con fechas verificadas':'Proyección pendiente';
  if(!periodTotals){
    node.innerHTML='<div class="proj-empty">No existen compromisos en los 9 períodos mostrados.</div>';
    return;
  }
  const c=weeklyChartOptions(),projectionColor='#e8783c';
  const values=[...planned,...actual.filter(Number.isFinite),...forecast.filter(Number.isFinite)];
  const upper=Math.max(1,...values);
  const margin=Math.max(.16,upper*.09);
  const marker={
    id:'weeklyProjectionPeriodRealMarker',
    afterDatasetsDraw(chart){
      const index=actual.findLastIndex(Number.isFinite);
      if(index<0)return;
      const point=chart.getDatasetMeta(1)?.data?.[index],ctx=chart.ctx;
      if(!point||!Number.isFinite(point.x)||!Number.isFinite(point.y))return;
      const {x,y}=point,area=chart.chartArea;
      const caption='Cumplido: '+actual[index];
      ctx.save();
      ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fillStyle=c.green;ctx.fill();
      ctx.lineWidth=2;
      ctx.strokeStyle=document.documentElement.dataset.theme==='light'?'#fff':'#111b2a';ctx.stroke();
      ctx.font='600 10px Inter, sans-serif';
      const w=ctx.measureText(caption).width+16,h=21;
      const left=Math.max(area.left,Math.min(x+12,area.right-w));
      const top=Math.max(area.top+2,Math.min(y-31,area.bottom-h-2));
      ctx.fillStyle=document.documentElement.dataset.theme==='light'?'rgba(255,255,255,.95)':'rgba(16,25,42,.95)';
      ctx.fillRect(left,top,w,h);ctx.strokeStyle=c.green;ctx.lineWidth=1;ctx.strokeRect(left,top,w,h);
      ctx.fillStyle=c.green;ctx.textBaseline='middle';ctx.fillText(caption,left+8,top+h/2);
      ctx.restore();
    }
  };
  if(typeof Chart!=='undefined'&&weeklyInnerTab==='proyeccion'){
    node.innerHTML='<canvas role="img" aria-label="Curva S de nueve períodos: programa acumulado, real acumulado y proyección con fechas registradas"></canvas>';
    WEEKLY_CHARTS.projection=new Chart(node.querySelector('canvas'),{
      type:'line',data:{labels,datasets:[
        {label:'Programado acumulado',data:planned,borderColor:c.blue,backgroundColor:c.blue,
          tension:0,fill:false,borderWidth:2.3,pointRadius:3,pointHoverRadius:5},
        {label:'Cumplido real',data:actual,borderColor:c.green,backgroundColor:c.green,
          tension:0,fill:false,borderWidth:2.5,pointRadius:4,pointHoverRadius:6,spanGaps:false},
        ...(model.hasForecast?[{label:'Proyección según fechas estimadas',data:forecast,
          borderColor:projectionColor,backgroundColor:projectionColor,
          tension:0,fill:false,borderWidth:2.5,pointRadius:3,pointHoverRadius:5,spanGaps:false}]:[])
      ]},
      plugins:[marker],
      options:{...weeklyChartMotionOptions(),
        responsive:true,maintainAspectRatio:false,
        layout:{padding:{top:10,bottom:4,left:10,right:12}},
        interaction:{intersect:false,mode:'index'},
        plugins:{legend:{display:false},
          tooltip:{callbacks:{
            title:items=>periods[items[0]?.dataIndex]||selectedLabel,
            label:ctx=>ctx.parsed.y===null?'Sin dato':ctx.dataset.label+': '+ctx.parsed.y+' compromisos'
          }}},
        scales:{x:{ticks:{color:c.text,maxRotation:0},grid:{display:false}},
          y:{min:-margin,max:upper+margin,
            ticks:{color:c.text,stepSize:1,callback:value=>Number.isInteger(value)&&value>=0&&value<=upper?value:''},
            grid:{color:context=>Number.isInteger(context.tick.value)&&context.tick.value>=0?c.grid:'transparent'}}}
      }
    });
    return;
  }
  node.innerHTML='<div class="proj-fallback"><table><thead><tr><th>Período</th><th>Programa</th><th>Real</th><th>Proyección</th></tr></thead><tbody>'+
    labels.map((label,i)=>'<tr><th>'+esc(label)+'</th><td>'+planned[i]+'</td><td>'+
      (actual[i]===null?'—':actual[i])+'</td><td>'+
      (forecast[i]===null?'—':forecast[i])+'</td></tr>').join('')+'</tbody></table></div>';
}
// Se conserva el renderer diario original para consultas específicas y
// futuras extensiones sin alterar los registros de pronósticos por semana.
function renderWeeklyProjectionDailyChart(p){
  const node=$('#weekly-projection-chart');
  if(!node)return;
  if(!p.m.planned){
    node.innerHTML='<div class="proj-empty">Sin actividades comprometidas para representar.</div>';
    return;
  }
  const labels=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  const c=weeklyChartOptions();
  // Margen proporcional, incluso con 1 único compromiso, para que 0 y 1 no se corten.
  const upper=Math.max(1,p.m.planned,...p.planned,
    ...p.actual.filter(Number.isFinite),...p.projected.filter(Number.isFinite));
  const margin=Math.max(.16,upper*.09);
  const projectionColor='#e8783c';
  // La anotación verde se dibuja al final para no quedar oculta bajo el azul
  // cuando ambos puntos coinciden en 0.
  const realMarker={
    id:'weeklyProjectionRealMarker',
    afterDatasetsDraw(chart){
      const index=p.actual.findLastIndex(Number.isFinite);
      if(index<0)return;
      const point=chart.getDatasetMeta(1)?.data?.[index],ctx=chart.ctx;
      if(!point||!Number.isFinite(point.x)||!Number.isFinite(point.y))return;
      const x=point.x,y=point.y,area=chart.chartArea;
      const label='Cumplido: '+p.actual[index];
      ctx.save();
      ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);
      ctx.fillStyle=c.green;ctx.fill();
      ctx.lineWidth=2;ctx.strokeStyle=
        document.documentElement.dataset.theme==='light'?'#ffffff':'#111b2a';
      ctx.stroke();
      ctx.font='600 10px Inter, sans-serif';
      const width=ctx.measureText(label).width+16,height=21;
      const left=Math.max(area.left,Math.min(x+12,area.right-width));
      const top=Math.max(area.top+2,Math.min(y-31,area.bottom-height-2));
      ctx.fillStyle=document.documentElement.dataset.theme==='light'?
        'rgba(255,255,255,.95)':'rgba(16,25,42,.95)';
      ctx.fillRect(left,top,width,height);
      ctx.strokeStyle=c.green;ctx.lineWidth=1;ctx.strokeRect(left,top,width,height);
      ctx.fillStyle=c.green;ctx.textBaseline='middle';
      ctx.fillText(label,left+8,top+height/2);
      ctx.restore();
    }
  };
  if(typeof Chart!=='undefined'&&weeklyInnerTab==='proyeccion'){
    node.innerHTML='<canvas role="img" aria-label="Curvas acumuladas de actividades programadas, completadas y previstas"></canvas>';
    WEEKLY_CHARTS.projection=new Chart(node.querySelector('canvas'),{
      type:'line',data:{labels,datasets:[
        {label:'Programado acumulado',data:p.planned,borderColor:c.blue,backgroundColor:c.blue,
          tension:0,stepped:false,fill:false,borderWidth:2.3,pointRadius:3,pointHoverRadius:5,
          borderCapStyle:'round',borderJoinStyle:'round'},
        {label:'Cumplido real',data:p.actual,borderColor:c.green,backgroundColor:c.green,
          tension:0,stepped:false,fill:false,borderWidth:2.5,pointRadius:4,pointHoverRadius:6,
          borderCapStyle:'round',borderJoinStyle:'round',spanGaps:false},
        ...(p.projectionReady?[{
          label:'Proyección al cierre',data:p.projected,borderColor:projectionColor,backgroundColor:projectionColor,
          tension:0,stepped:false,fill:false,borderWidth:2.5,pointRadius:3,pointHoverRadius:5,
          borderCapStyle:'round',borderJoinStyle:'round',spanGaps:false
        }]:[])
      ]},
      plugins:[realMarker],
      options:{...weeklyChartMotionOptions(),responsive:true,maintainAspectRatio:false,
        layout:{padding:{top:10,bottom:4,left:10,right:12}},
        interaction:{intersect:false,mode:'index'},
        plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>ctx.parsed.y===null?'Sin dato':ctx.dataset.label+': '+ctx.parsed.y+' entregables'}}},
        scales:{x:{ticks:{color:c.text},grid:{display:false}},
          y:{min:-margin,max:upper+margin,
            ticks:{color:c.text,stepSize:1,callback:v=>Number.isInteger(v)&&v>=0&&v<=upper?v:''},
            grid:{color:ctx=>Number.isInteger(ctx.tick.value)&&ctx.tick.value>=0?c.grid:'transparent'}}}}
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
