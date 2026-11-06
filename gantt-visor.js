const VGG_CSS="\n#bim-gantt-overlay{position:fixed;inset:0;background:rgba(4,9,20,.82);z-index:99990;display:flex;align-items:center;justify-content:center;padding:12px;box-sizing:border-box}\n#bim-gantt-overlay[hidden]{display:none!important}\n#bim-gantt-overlay *{box-sizing:border-box}\n#bim-gantt-modal{display:flex;flex-direction:column;width:min(97vw,1800px);height:min(94dvh,1100px);min-width:0;max-height:100dvh;overflow:hidden;border:1px solid var(--border-strong,#334155);border-radius:12px;background:var(--bg-panel,#10182a);color:var(--ink-primary,#f8fafc);box-shadow:0 20px 80px #0009}\n#bim-gantt-modal.max{width:100vw;height:100dvh;border-radius:0;border:0}\n#bim-gantt-overlay:has(#bim-gantt-modal.max){padding:0}\n.vgg-header{padding:11px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;border-bottom:1px solid var(--border-base,#344052)}\n.vgg-header h2{font-size:13px;font-weight:800;margin:0 0 4px;letter-spacing:.02em}\n.vgg-header p{font-size:10px;color:var(--ink-secondary,#aab6ca);margin:0;line-height:1.5}\n.vgg-header-actions{display:flex;align-items:center;gap:7px;flex-shrink:0}\n.vgg-header-actions button{background:var(--bg-subtle,#1e293b);color:var(--ink-primary,#f8fafc);border:1px solid var(--border-base,#334155);border-radius:6px;padding:7px 10px;cursor:pointer;font-size:10px}\n.vgg-controls{padding:9px 15px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;border-bottom:1px solid var(--border-base,#334155)}\n.vgg-controls label{font-size:10px;color:var(--ink-secondary,#cbd5e1);display:flex;gap:5px;align-items:center}\n.vgg-controls select,.vgg-controls input[type=search]{max-width:170px;height:30px;border:1px solid var(--border-base,#334155);border-radius:6px;padding:4px 7px;background:var(--bg-subtle,#1e293b);font-size:10px;color:var(--ink-primary,#f8fafc)}\n.vgg-controls input[type=search]{width:165px}\n.vgg-controls input[type=checkbox]{accent-color:#25c7e5}\n.vgg-count{margin-left:auto;font-size:10px;color:var(--ink-secondary,#94a3b8)}\n.vgg-scroll{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;background:#f8fafc;scrollbar-width:thin}\n.vgg-table{border-collapse:separate;border-spacing:0;table-layout:fixed;width:max-content;font-family:Arial,Inter,sans-serif;font-size:10px;color:#293850;background:#fff}\n.vgg-table th,.vgg-table td{border-bottom:1px solid #c4ccd6;border-right:1px solid #bbc5d2;padding:5px 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;height:28px}\n.vgg-table thead th{position:sticky;color:#f7fbff;text-align:center;background:#1d2d4d;font-weight:750;z-index:8}\n.vgg-table thead .vgg-week th{top:0;height:25px}\n.vgg-table thead .vgg-date th{top:25px;height:23px}\n.vgg-table thead .vgg-weekday th{top:48px;height:25px}\n.vgg-table thead th.vgg-meta{top:0;z-index:11}\n.vgg-table .vgg-fixed-0{position:sticky;left:0;z-index:5}\n.vgg-table .vgg-fixed-1{position:sticky;left:56px;z-index:5}\n.vgg-table .vgg-fixed-2{position:sticky;left:118px;z-index:5}\n.vgg-table thead .vgg-fixed-0,.vgg-table thead .vgg-fixed-1,.vgg-table thead .vgg-fixed-2{z-index:14}\n.vgg-table tbody tr.vgg-activity td{background:#fff}\n.vgg-table tbody tr.vgg-activity:nth-child(even) td{background:#f4f6f9}\n.vgg-table tbody tr.vgg-activity:hover td{background:#e6effd!important}\n.vgg-table tbody tr.vgg-activity{cursor:pointer}\n.vgg-table tr.vgg-owner-row td,.vgg-table tr.vgg-group-row td{background:#05070b;color:#d8e4ff;font-weight:700}\n.vgg-table tr.vgg-owner-row td{letter-spacing:.03em}\n.vgg-table tr.vgg-group-row td{color:#bfd0e9}\n.vgg-table .vgg-id{font-weight:800;color:#324c78;text-align:center}\n.vgg-table .vgg-center{text-align:center}\n.vgg-table .vgg-day{padding:0}\n.vgg-table td.vgg-day.weekend{background:#e4e8ef!important}\n.vgg-table .vgg-date th.weekend,.vgg-table .vgg-weekday th.weekend{background:#2b3a55;color:#f7cda7}\n.vgg-table .vgg-bar{width:100%;height:21px;background:#0d121a}\n.vgg-table .vgg-bar.done{background:#176c53}\n.vgg-table .vgg-bar.late{background:#b8742c}\n.vgg-table .vgg-bar.group{background:#334d72;height:12px}\n.vgg-table .vgg-bar.start{border-radius:3px 0 0 3px}\n.vgg-table .vgg-bar.end{border-radius:0 3px 3px 0}\n.vgg-table .vgg-bar.only{border-radius:3px}\n.vgg-table .vgg-bar.today{box-shadow:inset 0 -3px #43a5ff}\n.vgg-table .vgg-title{overflow:hidden;text-overflow:ellipsis}\n.vgg-table .vgg-oriol{opacity:.73}\n.vgg-detail{border-top:1px solid var(--border-base,#334155);padding:8px 14px;font-size:10px;line-height:1.5;min-height:35px;max-height:85px;overflow:auto;color:var(--ink-secondary,#cbd5e1)}\n.vgg-detail b{color:var(--ink-primary,#fff)}\n.vgg-footer{padding:7px 13px;display:flex;gap:13px;flex-wrap:wrap;align-items:center;background:var(--bg-subtle,#1e293b);font-size:9px;color:var(--ink-secondary,#aebed2)}\n.vgg-chip{display:inline-flex;gap:5px;align-items:center}\n.vgg-chip i{width:14px;height:7px;background:#0d121a;border-radius:2px}\n.vgg-chip i.done{background:#176c53}\n.vgg-chip i.late{background:#b8742c}\n.vgg-chip i.group{background:#334d72}\n@media(max-width:780px){#bim-gantt-overlay{padding:0}#bim-gantt-modal{width:100vw;height:100dvh;border-radius:0}.vgg-header{padding:9px}.vgg-controls{padding:7px}.vgg-count{margin-left:0}}\n";

/* Réplica visual de la hoja Gant en Excel. Datos de gantt-visor-data.js. Sólo lectura. */
(function(){
'use strict';
const S=window.BIM_GANTT_VIEW_SOURCE;
if(!S)return;
const st={owner:'',group:'',week:'',status:'',search:'',oriol:true,selected:''};
let overlay=null,bodyOverflow='';
const columns=[['ID',56],['EDT',62],['Actividad / hito',320],['Responsable',152],
 ['Tipo',54],['Dur. (dc)',67],['Inicio',87],['Fin',87],['Predecesor',83],['Dependencia',83],['Desfase (dc)',86]];
const pad=x=>String(x).padStart(2,'0');
function escapeText(x){return String(x==null?'':x).replace(/&/g,'&amp;').replace(/</g,'&lt;')
 .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function dates(from,to){const out=[];const d=new Date(from+'T00:00:00Z');
 const end=new Date(to+'T00:00:00Z');for(;d<=end;d.setUTCDate(d.getUTCDate()+1))
 out.push(d.toISOString().slice(0,10));return out;}
const allDates=dates(S.start,S.end);
function week(date){
 const d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+4-(d.getUTCDay()||7));
 const y=d.getUTCFullYear();const j=new Date(Date.UTC(y,0,4));
 j.setUTCDate(j.getUTCDate()-(j.getUTCDay()||7)+1);
 return 'S'+String(1+Math.floor((d-j)/604800000));
}
const weeks=[...new Set(allDates.map(week))];
function readable(d){return d?d.slice(8,10)+'/'+d.slice(5,7)+'/'+d.slice(2,4):'';}
function isOriol(name){return /oriol/i.test(name||'');}
function ownerOfSection(row){
 if(row.kind!=='owner')return '';
 const text=row.label.toLowerCase();
 return owners().find(o=>text.includes(o.toLowerCase().normalize('NFD')
  .replace(/[\u0300-\u036f]/g,'')))||'';
}
function owners(){return [...new Set(S.rows.filter(r=>r.kind==='activity').map(r=>r.owner))];}
function taskState(row){
 const src=typeof tasks!=='undefined'&&Array.isArray(tasks)?tasks:[];
 const matched=src.filter(t=>typeof catalogs!=='undefined'&&
  catalogs.ganttLinksByTask?.[t.id]?.mode==='select'&&
  catalogs.ganttLinksByTask?.[t.id]?.activityId===row.id);
 const today=typeof todayString==='function'?todayString():new Date().toISOString().slice(0,10);
 const done=matched.filter(t=>t.completedAt&&t.completedAt<=today&&
  (typeof categoryOf==='function'?categoryOf(t.status)==='done':/completad/i.test(t.status||'')))
  .sort((a,b)=>a.completedAt.localeCompare(b.completedAt));
 const first=done[0]||null;
 return {state:first?'completed':matched.length?'pending':'unassigned',
  taskIds:matched.map(x=>x.id),completedAt:first?.completedAt||'',
  late:!!(first&&first.completedAt>row.end)};
}
function visibleActivities(){
 return S.rows.filter(row=>{
  if(row.kind!=='activity')return false;
  if(!st.oriol&&isOriol(row.owner))return false;
  if(st.owner&&row.owner!==st.owner)return false;
  if(st.group&&row.group!==st.group)return false;
  if(st.week&&!allDates.some(d=>week(d)===st.week&&d>=row.start&&d<=row.end))return false;
  if(st.search&&!([row.id,row.edt,row.title,row.owner,row.group].join(' ')
    .toLocaleLowerCase('es').includes(st.search.toLocaleLowerCase('es'))))return false;
  if(st.status&&taskState(row).state!==st.status)return false;
  return true;
 });
}
function keptRows(activities){
 const ids=new Set(activities.map(a=>a.id)),groups=new Set(activities.map(a=>a.owner+'|'+a.group));
 const presentOwners=new Set(activities.map(a=>a.owner));
 const result=[];let owner='';
 for(const row of S.rows){
  if(row.kind==='owner'){owner=ownerOfSection(row);if(presentOwners.has(owner))result.push(row);}
  else if(row.kind==='group'){if(groups.has(owner+'|'+row.title))result.push(row);}
  else if(ids.has(row.id))result.push(row);
 }
 return result;
}
function weekHeaders(days){
 const chunks=[];let last='',size=0;
 days.forEach(d=>{const w=week(d);if(last&&w!==last){chunks.push([last,size]);size=0;}last=w;size++;});
 if(size)chunks.push([last,size]);
 return chunks.map(c=>'<th colspan="'+c[1]+'">'+c[0]+'</th>').join('');
}
function dayBar(row,d,state){
 const day=new Date(d+'T00:00:00Z').getUTCDay(),weekend=day===0||day===6;
 const cls='vgg-day'+(weekend?' weekend':'');
 if(d<row.start||d>row.end)return '<td class="'+cls+'"></td>';
 const first=d===row.start,last=d===row.end;
 const edge=first&&last?' only':first?' start':last?' end':'';
 const status=row.kind==='group'?' group':state.state==='completed'?
  (state.late?' late':' done'):'';
 return '<td class="'+cls+'"><div class="vgg-bar'+edge+status+
  (d===new Date().toISOString().slice(0,10)?' today':'')+'" title="'+
  escapeText(row.title+' | '+readable(row.start)+' - '+readable(row.end))+'"></div></td>';
}
function rowMeta(row){
 const items=[row.id||'',row.edt||'',row.title||'',row.owner||'',row.type||'',
  row.duration||'',readable(row.start),readable(row.end),row.predecessor||'',
  row.dependency||'',row.lag||''];
 return items.map((value,i)=>
  '<td class="'+(i<3?'vgg-fixed-'+i+' ':'')+
  (i===0?'vgg-id ':[1,4,5,6,7,8,9,10].includes(i)?'vgg-center ':'')+
  (i===2?'vgg-title':'')+'" title="'+escapeText(value)+'">'+escapeText(value)+'</td>'
 ).join('');
}
function render(){
 if(!overlay||overlay.hidden)return;
 const values=visibleActivities(),rows=keptRows(values);
 const days=st.week?allDates.filter(d=>week(d)===st.week):allDates;
 const colgroup=columns.map(x=>'<col style="width:'+x[1]+'px">').join('')+
  days.map(()=>'<col style="width:29px">').join('');
 const heads='<tr class="vgg-week">'+columns.map((x,i)=>
  '<th class="vgg-meta'+(i<3?' vgg-fixed-'+i:'')+'" rowspan="3">'+escapeText(x[0])+'</th>'
 ).join('')+weekHeaders(days)+'</tr>';
 const dnames=['D','L','M','X','J','V','S'];
 const dates='<tr class="vgg-date">'+days.map(d=>{
  const wd=new Date(d+'T00:00:00Z').getUTCDay();
  return '<th'+(wd===0||wd===6?' class="weekend"':'')+'>'+Number(d.slice(-2))+'</th>';
 }).join('')+'</tr>';
 const dows='<tr class="vgg-weekday">'+days.map(d=>{
  const wd=new Date(d+'T00:00:00Z').getUTCDay();
  return '<th'+(wd===0||wd===6?' class="weekend"':'')+'>'+dnames[wd]+'</th>';
 }).join('')+'</tr>';
 let body='';
 for(const row of rows){
  if(row.kind==='owner'){
   body+='<tr class="vgg-owner-row"><td colspan="11">'+escapeText(row.label)+'</td>'+
    '<td colspan="'+days.length+'"></td></tr>';continue;
  }
  if(row.kind==='group'){
   const copy={id:'',edt:row.id,title:row.title,owner:'',type:'Resumen',duration:row.duration,
    start:row.start,end:row.end,predecessor:'',dependency:'',lag:''};
   body+='<tr class="vgg-group-row">'+rowMeta(copy)+
    days.map(d=>dayBar(row,d,{state:'group'})).join('')+'</tr>';continue;
  }
  const state=taskState(row);
  body+='<tr class="vgg-activity'+(isOriol(row.owner)?' vgg-oriol':'')+
   '" data-gantt-activity="'+escapeText(row.id)+'" tabindex="0">'+rowMeta({
    ...row,type:row.type||'Act.'
   })+days.map(d=>dayBar(row,d,state)).join('')+'</tr>';
 }
 const node=document.getElementById('vgg-table');if(!node)return;
 node.innerHTML='<colgroup>'+colgroup+'</colgroup><thead>'+heads+dates+dows+
  '</thead><tbody>'+body+'</tbody>';
 document.getElementById('vgg-count').textContent=values.length+' de 54 actividades';
 if(!body)document.getElementById('vgg-detail').textContent='No se encontraron actividades para los filtros seleccionados.';
 else if(!st.selected)document.getElementById('vgg-detail').textContent=
  'Haz clic en una actividad para revisar su vinculación y avance en ÁREA BIM. Visor de solo lectura.';
}
function showDetail(id){
 const row=S.rows.find(r=>r.kind==='activity'&&r.id===id);if(!row)return;
 const status=taskState(row);
 const labels={completed:'Completada',pending:'Pendiente',unassigned:'Sin asignar'};
 const note='<b>'+escapeText(row.id+' — '+row.title)+'</b> · '+escapeText(row.owner)+
  ' · '+readable(row.start)+' al '+readable(row.end)+' · Estado: <b>'+
  labels[status.state]+'</b> · Tarea HTML: '+escapeText(status.taskIds.join(', ')||'Sin vincular')+
  (status.completedAt?' · Fin real: '+readable(status.completedAt):'')+
  (status.late?' · Fuera de plazo':'')+
  (isOriol(row.owner)?' · <b>Excluida del PPC Gantt</b>':'');
 document.getElementById('vgg-detail').innerHTML=note;st.selected=id;
}
function redrawGroups(){
 const select=document.getElementById('vgg-group');
 const groups=[...new Set(S.rows.filter(r=>r.kind==='activity'&&(!st.owner||r.owner===st.owner))
   .map(r=>r.group))];
 if(!groups.includes(st.group))st.group='';
 select.innerHTML='<option value="">Todos los grupos</option>'+groups.map(g=>
  '<option value="'+escapeText(g)+'">'+escapeText(g)+'</option>').join('');
 select.value=st.group;
}
function close(){
 if(!overlay||overlay.hidden)return;
 overlay.hidden=true;document.body.style.overflow=bodyOverflow;
 const button=document.getElementById('weekly-gantt-viewer-launch');if(button)button.focus();
}
function open(){
 if(!overlay){
  overlay=document.createElement('div');
  overlay.id='bim-gantt-overlay';overlay.hidden=true;
  overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');
  overlay.setAttribute('aria-label','Visor Gantt Excel');
  overlay.innerHTML='<section id="bim-gantt-modal"><header class="vgg-header"><div>'+
   '<h2>CRONOGRAMA DEL PROYECTO — DIAGRAMA DE GANTT</h2>'+
   '<p>'+escapeText(S.project)+' · Inicio '+readable(S.start)+' · Fin '+readable(S.end)+
   ' · '+S.calendarDays+' días calendario · '+S.workingDays+' días laborables</p></div>'+
   '<div class="vgg-header-actions"><button type="button" data-vgg-action="expand">Pantalla completa</button>'+
   '<button type="button" data-vgg-action="close">✕ Cerrar</button></div></header>'+
   '<div class="vgg-controls"><label>Responsable <select id="vgg-owner"><option value="">Todos</option>'+
   owners().map(o=>'<option value="'+escapeText(o)+'">'+escapeText(o)+'</option>').join('')+
   '</select></label><label>Grupo <select id="vgg-group"></select></label>'+
   '<label>Semana <select id="vgg-week"><option value="">Noviembre completo</option>'+
   weeks.map(w=>'<option value="'+w+'">'+w+'</option>').join('')+'</select></label>'+
   '<label>Estado <select id="vgg-status"><option value="">Todos</option>'+
   '<option value="unassigned">Sin asignar</option><option value="pending">Pendiente</option>'+
   '<option value="completed">Completada</option></select></label>'+
   '<input id="vgg-search" type="search" placeholder="Buscar actividad / ID" aria-label="Buscar actividad">'+
   '<label title="Oriol no participa en el PPC Gantt"><input id="vgg-oriol" type="checkbox" checked> Ver Oriol</label>'+
   '<span class="vgg-count" id="vgg-count"></span></div>'+
   '<div class="vgg-scroll"><table class="vgg-table" id="vgg-table" aria-label="Cronograma Gantt basado en Excel"></table></div>'+
   '<div class="vgg-detail" id="vgg-detail"></div>'+
   '<footer class="vgg-footer"><span class="vgg-chip"><i></i> Programado</span>'+
   '<span class="vgg-chip"><i class="done"></i> Culminado</span>'+
   '<span class="vgg-chip"><i class="late"></i> Culminado fuera de plazo</span>'+
   '<span class="vgg-chip"><i class="group"></i> Grupo</span>'+
   '<span>Oriol visible, excluido del PPC · Excel de noviembre 2026 · Copia sin sincronización</span>'+
   '</footer></section>';
  document.body.appendChild(overlay);
  overlay.addEventListener('click',ev=>{
   if(ev.target===overlay){close();return;}
   const button=ev.target.closest('[data-vgg-action]');
   if(button){if(button.dataset.vggAction==='close')close();
     if(button.dataset.vggAction==='expand'){
      const panel=document.getElementById('bim-gantt-modal');
      panel.classList.toggle('max');button.textContent=panel.classList.contains('max')?'Restaurar':'Pantalla completa';
     }return;}
   const tr=ev.target.closest('tr[data-gantt-activity]');
   if(tr)showDetail(tr.dataset.ganttActivity);
  });
  ['owner','group','week','status'].forEach(name=>{
   document.getElementById('vgg-'+name).addEventListener('change',ev=>{
    st[name]=ev.target.value;st.selected='';
    if(name==='owner')redrawGroups();
    render();
   });
  });
  document.getElementById('vgg-search').addEventListener('input',ev=>{
   st.search=ev.target.value.trim();st.selected='';render();
  });
  document.getElementById('vgg-oriol').addEventListener('change',ev=>{
   st.oriol=ev.target.checked;st.selected='';render();
  });
  overlay.addEventListener('keydown',ev=>{
   if(ev.key==='Escape'){ev.preventDefault();close();return;}
   if(ev.key==='Enter'&&ev.target.matches('tr[data-gantt-activity]'))
    showDetail(ev.target.dataset.ganttActivity);
  });
 }
 redrawGroups();overlay.hidden=false;
 bodyOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
 render();overlay.querySelector('[data-vgg-action="close"]').focus();
}
document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&overlay&&!overlay.hidden)close();});
const style=document.createElement('style');style.id='bim-gantt-viewer-style';
style.textContent=VGG_CSS;document.head.appendChild(style);
window.openBimGanttViewer=open;
window.closeBimGanttViewer=close;
})();
