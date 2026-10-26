
/* CNC compartido: una causa documentada por entregable y fecha límite original. */
function normalizeCncRecords(input){
  if(!Array.isArray(input))return [];
  const map=new Map();
  for(const raw of input){
    if(!raw||typeof raw!=='object')continue;
    const taskId=String(raw.taskId||'').trim(),deadline=String(raw.deadline||'');
    if(!taskId||!/^\d{4}-\d{2}-\d{2}$/.test(deadline)||!Number.isFinite(Date.parse(deadline)))continue;
    const id=taskId+'|'+deadline;
    if(map.has(id)||!raw.category||!raw.description||!raw.action||!raw.createdAt)continue;
    map.set(id,{id,taskId,deadline,week:String(raw.week||''),
      category:String(raw.category).slice(0,100),description:String(raw.description).slice(0,1000),
      action:String(raw.action).slice(0,1000),proposedDate:String(raw.proposedDate||''),
      reporter:String(raw.reporter||'No identificado').slice(0,100),
      owner:String(raw.owner||'').slice(0,100),createdAt:String(raw.createdAt)});
  }
  return [...map.values()].sort((a,b)=>a.createdAt.localeCompare(b.createdAt));
}
function mergeCncRecords(remote,local){
  const merged=new Map();
  for(const r of normalizeCncRecords(local))merged.set(r.id,r);
  for(const r of normalizeCncRecords(remote))merged.set(r.id,r);
  return [...merged.values()].sort((a,b)=>a.createdAt.localeCompare(b.createdAt));
}
function taskCncIncident(task){
  if(!task||!task.deadline)return false;
  if(categoryOf(task.status)==='done')return Boolean(task.completedAt&&task.completedAt>task.deadline);
  return task.deadline<todayString();
}
function cncFor(taskId,deadline){
  return (catalogs.cncRecords||[]).find(r=>r.taskId===taskId&&r.deadline===deadline)||null;
}
function taskCncButton(t,mobile=false){
  const record=cncFor(t.id,t.deadline);
  if(!record&&!taskCncIncident(t))return '';
  const label=record?'Ver causa CNC':'Registrar causa CNC';
  return '<button type="button" class="task-cnc-button'+(mobile?' task-mobile-cnc':'')+
    '" data-cnc-id="'+esc(t.id)+'" aria-label="'+esc(label+' del entregable '+t.id)+'">'+label+'</button>';
}
let cncOpenTaskId=null;
function openCnc(id){
  const task=tasks.find(t=>t.id===id);if(!task)return;
  const record=cncFor(task.id,task.deadline);
  if(!record&&!taskCncIncident(task)){toast('La actividad no presenta incumplimiento de plazo.');return;}
  cncOpenTaskId=id;
  $('#cnc-title').textContent=record?'CAUSA CNC REGISTRADA':'REGISTRAR CAUSA CNC';
  $('#cnc-task-context').innerHTML='<strong>'+esc(task.title)+'</strong>'+
    '<span>Entregable: '+esc(task.id)+' · Responsable: '+esc(task.owner||'Sin asignar')+'</span>'+
    '<span>Fecha comprometida: '+esc(dateDisplay(task.deadline))+
    ' · '+(categoryOf(task.status)==='done'?'Cierre fuera de plazo':'Vencida sin completar')+'</span>';
  $('#cnc-form').classList.toggle('hidden',!!record);
  $('#cnc-existing').classList.toggle('hidden',!record);
  if(record){
    const fields=[['Causa principal',record.category],['Descripción',record.description],
      ['Acción correctiva',record.action],['Nueva fecha propuesta',record.proposedDate?dateDisplay(record.proposedDate):'No indicada'],
      ['Registrado por (declarado)',record.reporter],['Fecha de registro',record.createdAt]];
    $('#cnc-existing').innerHTML=fields.map(pair=>'<div><b>'+esc(pair[0])+'</b><p>'+esc(pair[1])+'</p></div>').join('');
  }else{
    $('#cnc-form').reset();$('#cnc-date').min=todayString();
  }
  $('#cnc-back').classList.add('open');document.body.style.overflow='hidden';
  if(!record)$('#cnc-category').focus();
}
function closeCnc(){
  $('#cnc-back').classList.remove('open');$('#cnc-form').reset();
  document.body.style.overflow='';cncOpenTaskId=null;
}
function saveCnc(event){
  event.preventDefault();
  const task=tasks.find(t=>t.id===cncOpenTaskId);
  if(!task||!taskCncIncident(task)){toast('El compromiso ya no cumple los criterios CNC.');return;}
  if(cncFor(task.id,task.deadline)){toast('Este incumplimiento ya tiene una causa.');closeCnc();return;}
  const category=$('#cnc-category').value.trim(),description=$('#cnc-description').value.trim(),
    action=$('#cnc-action').value.trim(),reporter=$('#cnc-reporter').value.trim(),
    proposedDate=$('#cnc-date').value;
  if(!category||!description||!action||!reporter){toast('Completa los campos obligatorios.');return;}
  if(proposedDate&&proposedDate<todayString()){toast('La fecha propuesta no puede ser anterior a hoy.');return;}
  const record={id:task.id+'|'+task.deadline,taskId:task.id,deadline:task.deadline,
    week:effectiveTaskWeek(task),category,description,action,proposedDate,reporter,
    owner:task.owner||'',createdAt:new Date().toISOString()};
  catalogs.cncRecords=mergeCncRecords(catalogs.cncRecords,[record]);
  closeCnc();persist();
  toast('Causa registrada; pendiente de confirmar sincronización con Supabase.');
}
document.addEventListener('click',event=>{
  const button=event.target.closest('[data-cnc-id]');
  if(!button)return;
  event.preventDefault();event.stopPropagation();openCnc(button.dataset.cncId);
});
function renderRegisteredWeeklyCnc(m){
  const container=$('#weekly-cnc'),count=$('#weekly-cnc-count');
  if(!container||!count)return;
  const cutoff=m.observedUntil||todayString();
  const incidents=m.rows.filter(t=>{
    if(!t.deadline)return false;
    if(t.done&&t.completedAt)return t.completedAt>t.deadline;
    return t.deadline<cutoff;
  });
  const without=incidents.filter(t=>!cncFor(t.id,t.deadline));
  count.textContent=without.length+' sin causa';
  if(!m.planned){
    container.innerHTML='<div class="weekly-empty"><strong>Sin compromisos para analizar</strong><span>El panel se activa con registros reales de la semana elegida.</span></div>';
    return;
  }
  if(!incidents.length){
    container.innerHTML='<div class="weekly-cnc-summary">No hay incumplimientos de plazo verificados en esta semana.</div>'+
      '<div class="weekly-cnc-note"><strong>Seguimiento CNC</strong><div>Las causas se registran desde Control de tareas cuando vence un entregable o se completa fuera de plazo.</div></div>';
    return;
  }
  const currentTasks=new Map(tasks.map(t=>[t.id,t]));
  const list=incidents.slice(0,5).map(t=>{
    const record=cncFor(t.id,t.deadline),live=!m.closed?currentTasks.get(t.id):null;
    const late=t.done&&t.completedAt&&t.completedAt>t.deadline;
    return '<div class="weekly-cnc-item"><strong>'+esc(live?.title||t.title||t.id)+'</strong>'+
      '<p>Compromiso '+esc(t.id)+' · '+esc(t.owner||'Sin responsable')+'</p>'+
      '<small>Plazo: '+esc(dateDisplay(t.deadline))+' · '+(late?'Cierre tardío':'Sin cierre en plazo')+'</small>'+
      (record?'<p class="cnc-cause">'+esc(record.category)+'</p><p>'+esc(record.description)+'</p>'+
        '<div class="cnc-action"><b>Acción:</b> '+esc(record.action)+'</div>'+
        (record.proposedDate?'<small>Fecha propuesta: '+esc(dateDisplay(record.proposedDate))+'</small>':''):
        '<p class="cnc-cause">Causa pendiente de registrar desde Control de tareas</p>')+'</div>';
  }).join('');
  const registered=incidents.length-without.length;
  container.innerHTML='<div class="weekly-cnc-summary"><strong>'+incidents.length+
    ' incumplimiento(s)</strong> · '+registered+' documentado(s) · '+without.length+
    ' por registrar.</div><div class="weekly-cnc-list">'+list+'</div>'+
    (incidents.length>5?'<p class="weekly-cnc-summary">+'+(incidents.length-5)+' incumplimientos adicionales.</p>':'')+
    '<div class="weekly-cnc-note"><strong>Seguimiento de causas</strong><div>'+
    (without.length?without.length+' actividad(es) requieren causa y acción correctiva desde Control de tareas.':
      'Todas las incidencias tienen causa y acción correctiva documentadas.')+
    ' Se conserva el vencimiento original.</div></div>';
}
