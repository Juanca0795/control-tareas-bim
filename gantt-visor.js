const VGG_CSS="\n#bim-gantt-overlay{position:fixed;inset:0;background:rgba(4,9,20,.82);z-index:99990;display:flex;align-items:center;justify-content:center;padding:12px;box-sizing:border-box}\n#bim-gantt-overlay[hidden]{display:none!important}\n#bim-gantt-overlay *{box-sizing:border-box}\n#bim-gantt-modal{display:flex;flex-direction:column;width:min(97vw,1800px);height:min(94dvh,1100px);min-width:0;max-height:100dvh;overflow:hidden;border:1px solid var(--border-strong,#334155);border-radius:12px;background:var(--bg-panel,#10182a);color:var(--ink-primary,#f8fafc);box-shadow:0 20px 80px #0009}\n#bim-gantt-modal.max{width:100vw;height:100dvh;border-radius:0;border:0}\n#bim-gantt-overlay:has(#bim-gantt-modal.max){padding:0}\n.vgg-header{padding:11px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;border-bottom:1px solid var(--border-base,#344052)}\n.vgg-header h2{font-size:13px;font-weight:800;margin:0 0 4px;letter-spacing:.02em}\n.vgg-header p{font-size:10px;color:var(--ink-secondary,#aab6ca);margin:0;line-height:1.5}\n.vgg-header-actions{display:flex;align-items:center;gap:7px;flex-shrink:0}\n.vgg-header-actions button{background:var(--bg-subtle,#1e293b);color:var(--ink-primary,#f8fafc);border:1px solid var(--border-base,#334155);border-radius:6px;padding:7px 10px;cursor:pointer;font-size:10px}\n.vgg-controls{padding:9px 15px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;border-bottom:1px solid var(--border-base,#334155)}\n.vgg-controls label{font-size:10px;color:var(--ink-secondary,#cbd5e1);display:flex;gap:5px;align-items:center}\n.vgg-controls select,.vgg-controls input[type=search]{max-width:170px;height:30px;border:1px solid var(--border-base,#334155);border-radius:6px;padding:4px 7px;background:var(--bg-subtle,#1e293b);font-size:10px;color:var(--ink-primary,#f8fafc)}\n.vgg-controls input[type=search]{width:165px}\n.vgg-controls input[type=checkbox]{accent-color:#25c7e5}\n.vgg-count{margin-left:auto;font-size:10px;color:var(--ink-secondary,#94a3b8)}\n.vgg-scroll{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;background:#f8fafc;scrollbar-width:thin}\n.vgg-table{border-collapse:separate;border-spacing:0;table-layout:fixed;width:max-content;font-family:Arial,Inter,sans-serif;font-size:10px;color:#293850;background:#fff}\n.vgg-table th,.vgg-table td{border-bottom:1px solid #c4ccd6;border-right:1px solid #bbc5d2;padding:5px 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;height:28px}\n.vgg-table thead th{position:sticky;color:#f7fbff;text-align:center;background:#1d2d4d;font-weight:750;z-index:8}\n.vgg-table thead .vgg-week th{top:0;height:25px}\n.vgg-table thead .vgg-date th{top:25px;height:23px}\n.vgg-table thead .vgg-weekday th{top:48px;height:25px}\n.vgg-table thead th.vgg-meta{top:0;z-index:11}\n.vgg-table .vgg-fixed-0{position:sticky;left:0;z-index:5}\n.vgg-table .vgg-fixed-1{position:sticky;left:56px;z-index:5}\n.vgg-table .vgg-fixed-2{\n  position:sticky;left:118px;z-index:6;\n  border-right:2px solid #6785a7!important;\n  box-shadow:5px 0 9px -5px rgba(19,43,76,.55)\n}\n.vgg-table thead .vgg-fixed-0,.vgg-table thead .vgg-fixed-1,.vgg-table thead .vgg-fixed-2{z-index:14}\n.vgg-table tbody tr.vgg-activity td{background:#fff}\n.vgg-table tbody tr.vgg-activity.vgg-row-alt td{background:#f1f5fa}\n.vgg-table tbody tr.vgg-activity:hover td:not(.scheduled):not(.weekend):not(.holiday):not(.day-off),\n.vgg-table tbody tr.vgg-activity.vgg-row-hover td:not(.scheduled):not(.weekend):not(.holiday):not(.day-off){background:#e5eefb!important}\n.vgg-table tbody tr.vgg-activity{cursor:pointer}\n.vgg-table tr.vgg-owner-row td{background:#1d3b5e;color:#f0f5fd;font-weight:800;border-top:2px solid #1b2f4a}\n.vgg-table tr.vgg-group-row td{background:#426a95;color:#f2f6fc;font-weight:750;border-top:1px solid #7397bd}\n.vgg-table tr.vgg-owner-row td{letter-spacing:.03em}\n.vgg-table tr.vgg-group-row td{color:#f1f6fc}\n.vgg-table .vgg-id{font-weight:800;color:#324c78;text-align:center}\n.vgg-table .vgg-center{text-align:center}\n.vgg-table .vgg-day{padding:0}\n.vgg-table tbody td.vgg-day.weekend:not(.scheduled){background:#fbe4e7!important}\n.vgg-table thead tr.vgg-week th.excel-week-dark,\n.vgg-table thead tr.vgg-date th.excel-week-dark,\n.vgg-table thead tr.vgg-weekday th.excel-week-dark{background:#1b2a49;color:#fff}\n.vgg-table thead tr.vgg-week th.excel-week-light,\n.vgg-table thead tr.vgg-date th.excel-week-light,\n.vgg-table thead tr.vgg-weekday th.excel-week-light{background:#dce3ee;color:#1b2a49}\n.vgg-table thead tr.vgg-date th.nonwork,\n.vgg-table thead tr.vgg-weekday th.nonwork{color:#f04e64!important;font-weight:900}\n.vgg-table thead tr.vgg-date th.excel-week-light.nonwork,\n.vgg-table thead tr.vgg-weekday th.excel-week-light.nonwork{color:#c52442!important}\n/* Fines de semana: mismo rojo en S45 (7-8) y S47 (21-22). */\n.vgg-table thead tr.vgg-date th.weekend-header,\n.vgg-table thead tr.vgg-weekday th.weekend-header{\n  background:#fbdce2!important;color:#b91c39!important;font-weight:900\n}\n.vgg-table thead tr.vgg-date th.holiday-header,\n.vgg-table thead tr.vgg-weekday th.holiday-header{\n  background:#f7c7d1!important;color:#aa1230!important\n}\n.vgg-table thead tr.vgg-date th.weekend-header,\n.vgg-table thead tr.vgg-weekday th.weekend-header{\n  background:#fbe4e7!important;color:#b91c39!important\n}\n.vgg-table tbody td.vgg-day.weekend.holiday:not(.scheduled){\n  background:#fbe4e7!important\n}\n/* Día actual: remarcar juntos número y letra (6/V, 9/L, etc.). */\n.vgg-table thead tr.vgg-date th.today-header,\n.vgg-table thead tr.vgg-weekday th.today-header{\n  background:#246fac!important;color:#fff!important;\n  box-shadow:inset 2px 0 #50beff,inset -2px 0 #50beff;\n}\n\n/* Feriados nacionales = rojo; días libres de Prada (9-10) = violeta. */\n.vgg-table tbody td.vgg-day.holiday:not(.scheduled){background:#f7c7d1!important}\n.vgg-table tbody tr.vgg-activity td.vgg-day.day-off:not(.scheduled),\n.vgg-table tbody tr.vgg-activity:hover td.vgg-day.day-off:not(.scheduled){\n  background:#e7dbff!important;box-shadow:inset 0 0 0 1px #a58bcf\n}\n.vgg-table td.vgg-day.scheduled .vgg-cell-percent{display:flex;align-items:center;justify-content:center;\n  width:100%;height:100%;font:750 7.8px/1 Arial,sans-serif;color:#fff;\n  letter-spacing:-.25px;font-variant-numeric:tabular-nums}\n/* Relleno completo de celda para cada día de programación. */\n.vgg-table tbody tr.vgg-activity td.vgg-day.scheduled{background:#5682bd!important}\n.vgg-table tbody tr.vgg-activity td.vgg-day.scheduled.done{background:#2d9c89!important}\n.vgg-table tbody tr.vgg-activity td.vgg-day.scheduled.late{background:#d39843!important}\n/* Resúmenes: blanco FUERA del rango; azul más oscuro DENTRO del rango. */\n.vgg-table tbody tr.vgg-group-row td.vgg-day:not(.scheduled),\n.vgg-table tbody tr.vgg-group-row td.vgg-day.weekend:not(.scheduled),\n.vgg-table tbody tr.vgg-group-row td.vgg-day.holiday:not(.scheduled),\n.vgg-table tbody tr.vgg-group-row td.vgg-day.day-off:not(.scheduled){\n  background:#ffffff!important;box-shadow:none!important\n}\n.vgg-table tbody tr.vgg-group-row td.vgg-day.scheduled{\n  background:#1b4269!important;\n  box-shadow:inset 0 0 0 1px #143450\n}\n.vgg-table tbody tr.vgg-activity:hover td.vgg-day.scheduled{filter:brightness(1.09)}\n.vgg-table tbody td.vgg-day.today{box-shadow:inset 2px 0 #2c8fc9,inset -2px 0 #2c8fc9}\n.vgg-table .vgg-title{overflow:hidden;text-overflow:ellipsis}\n.vgg-table .vgg-oriol{opacity:.73}\n.vgg-detail{border-top:1px solid var(--border-base,#334155);padding:8px 14px;font-size:10px;line-height:1.5;min-height:35px;max-height:85px;overflow:auto;color:var(--ink-secondary,#cbd5e1)}\n.vgg-detail b{color:var(--ink-primary,#fff)}\n.vgg-footer{padding:7px 13px;display:flex;gap:13px;flex-wrap:wrap;align-items:center;background:var(--bg-subtle,#1e293b);font-size:9px;color:var(--ink-secondary,#aebed2)}\n.vgg-chip{display:inline-flex;gap:5px;align-items:center}\n.vgg-chip i{width:14px;height:10px;background:#5682bd}\n.vgg-chip i.done{background:#2d9c89}\n.vgg-chip i.late{background:#d39843}\n.vgg-chip i.group{background:#7698c4}\n.vgg-chip i.weekend{background:#fbdce2;border:1px solid #d74e67}\n.vgg-chip i.day-off{background:#e7dbff;border:1px solid #a58bcf}\n@media(max-width:780px){#bim-gantt-overlay{padding:0}#bim-gantt-modal{width:100vw;height:100dvh;border-radius:0}.vgg-header{padding:9px}.vgg-controls{padding:7px}.vgg-count{margin-left:0}}\n\n/* Visor: fronteras ISO, columna actual y foco/hover; la programación original conserva sus colores. */\n.vgg-table thead .vgg-week th.vgg-week-start,\n.vgg-table thead .vgg-date th.vgg-week-start,\n.vgg-table thead .vgg-weekday th.vgg-week-start,\n.vgg-table tbody td.vgg-day.vgg-week-start{\n  border-left:2px solid #617f9f!important\n}\n.vgg-table tbody tr.vgg-activity td.vgg-day.today:not(.scheduled):not(.weekend):not(.holiday):not(.day-off){\n  background:#e3f1ff!important\n}\n.vgg-table tbody td.vgg-day.today{\n  box-shadow:inset 2px 0 #1685d2,inset -2px 0 #1685d2!important\n}\n.vgg-table tbody tr.vgg-activity:focus-visible{\n  outline:2px solid #208ee1;outline-offset:-2px\n}\n.vgg-table tbody td.vgg-day.vgg-col-hover{\n  outline:1px solid rgba(35,120,202,.65);outline-offset:-1px\n}\n.vgg-table tbody tr.vgg-activity td.vgg-day.vgg-col-hover:not(.scheduled):not(.today):not(.weekend):not(.holiday):not(.day-off){\n  background:#d9eaff!important\n}\n.vgg-table thead tr.vgg-date th.vgg-col-hover:not(.today-header):not(.weekend-header):not(.holiday-header),\n.vgg-table thead tr.vgg-weekday th.vgg-col-hover:not(.today-header):not(.weekend-header):not(.holiday-header){\n  box-shadow:inset 0 -3px #3695d7!important\n}\n\n/* Encabezados y datos comparten desplazamiento: nada queda anclado. */\n.vgg-table thead th,\n.vgg-table .vgg-fixed-0,\n.vgg-table .vgg-fixed-1,\n.vgg-table .vgg-fixed-2{\n  position:static!important;top:auto!important;left:auto!important;\n  box-shadow:none!important\n}\n.vgg-controls{position:relative;z-index:3;overflow:visible}\n.vgg-colchooser{position:relative;flex:none}\n.vgg-colchooser>summary{\n  list-style:none;display:inline-flex;align-items:center;gap:6px;\n  min-height:30px;padding:6px 10px;cursor:pointer;\n  border:1px solid var(--border-base,#334155);border-radius:6px;\n  background:var(--bg-subtle,#1e293b);color:var(--ink-primary,#f8fafc);\n  font-size:10.5px;font-weight:700\n}\n.vgg-colchooser>summary::-webkit-details-marker{display:none}\n.vgg-colchooser>summary:focus-visible,\n.vgg-colchooser-popover button:focus-visible{outline:2px solid #5ba3ef;outline-offset:2px}\n.vgg-colchooser[open]>summary{border-color:var(--accent-blue,#60a5fa)}\n.vgg-colchooser-popover{\n  position:absolute;right:0;top:calc(100% + 5px);z-index:50;\n  width:235px;max-width:calc(100vw - 36px);\n  max-height:min(65vh,390px);overflow-y:auto;\n  background:var(--bg-panel,#111d30);color:var(--ink-primary,#fff);\n  border:1px solid var(--border-strong,#4a607c);border-radius:9px;\n  box-shadow:0 13px 36px rgba(0,0,0,.4);padding:10px;\n}\n.vgg-colchooser-popover .vgg-col-item{\n  display:flex;align-items:center;gap:8px;padding:5px 3px;\n  color:var(--ink-primary,#f8fafc);font-size:10.5px\n}\n.vgg-colchooser-popover input{accent-color:#42a5ee}\n.vgg-colchooser-popover button{\n  display:block;width:100%;margin-top:8px;padding:8px;\n  border:1px solid var(--border-base,#334155);border-radius:6px;\n  cursor:pointer;background:var(--bg-subtle,#1e293b);\n  color:var(--accent-blue,#60a5fa);font-size:10.5px;font-weight:700\n}\n";

/* Réplica visual de la hoja Gant en Excel. Datos de gantt-visor-data.js. Sólo lectura. */
(function(){
'use strict';
const S=window.BIM_GANTT_VIEW_SOURCE;
if(!S)return;
const st={owner:'',group:'',week:'',status:'',search:'',selected:''};
let overlay=null,bodyOverflow='',lastTrigger=null;
const hiddenColumns=new Set();
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
function weekTone(d){
 return Number(week(d).slice(1))%2===0?'excel-week-dark':'excel-week-light';
}
function nonWorkingDate(d){
 return S.holidays?.[d]||'';
}
function dayInfo(d){
 const dow=new Date(d+'T12:00:00Z').getUTCDay();
 const weekend=dow===0||dow===6;
 const holiday=Boolean(nonWorkingDate(d));
 return {dow,weekend,holiday,mark:weekend||holiday,
   note:nonWorkingDate(d)||(weekend?(dow===6?'Sábado':'Domingo'):'')};
}
function excelPercent(value){
 const n=Number(value);
 if(!Number.isFinite(n)||n<=0)return '';
 const percent=n*100;
 // Formato de Excel: [=0]"";[<0.1]0.0%;0%
 return (n<0.1?percent.toFixed(1):Math.round(percent).toString())+'%';
}
function weekHeaders(days){
 const chunks=[];let last='',size=0,tone='';
 days.forEach(d=>{
  const w=week(d);
  if(last&&w!==last){chunks.push([last,size,tone]);size=0;}
  last=w;size++;tone=weekTone(d);
 });
 if(size)chunks.push([last,size,tone]);
 return chunks.map((c,i)=>'<th class="'+c[2]+(i?' vgg-week-start':'')+
  '" colspan="'+c[1]+'">'+c[0]+'</th>').join('');
}
function dayBar(row,d,state){
 const info=dayInfo(d);
 const today=d===(typeof todayString==='function'?todayString():new Date().toISOString().slice(0,10));
 const personalLeave=S.nonWorkingByOwner?.[row.owner||'']?.[d]||'';
 const boundary=info.dow===1?' vgg-week-start':'';
 const dateAttr=' data-vgg-date="'+d+'"';
 const cls='vgg-day'+(info.weekend?' weekend':'')+(info.holiday?' holiday':'')+
  (personalLeave?' day-off':'')+(today?' today':'')+boundary;
 const label=personalLeave||info.note||'';
 // Los grupos Resumen conservan su franja continua, como en Excel.
 if(row.kind==='group'){
  if(d<row.start||d>row.end)return '<td class="'+cls+'"'+dateAttr+'></td>';
  return '<td class="'+cls+' scheduled group"'+dateAttr+'></td>';
 }
 // Los porcentajes del calendario provienen de las celdas M:AP del Excel:
 // evitan colorear como trabajo sábados, domingos o días libres sin carga.
 const value=row.percentByDay?.[String(Number(d.slice(8,10)))]||0;
 if(!value)return '<td class="'+cls+'"'+dateAttr+'></td>';
 const status=state.state==='completed'?(state.late?' late':' done'):'';
 const pct=excelPercent(value);
 return '<td class="'+cls+' scheduled'+status+'"'+dateAttr+'>'+
  '<span class="vgg-cell-percent">'+pct+'</span></td>';
}
function visibleColumns(){
 return columns.map((col,i)=>({label:col[0],width:col[1],index:i}))
   .filter(col=>!hiddenColumns.has(col.index));
}
function rowMeta(row){
 const items=[row.id||'',row.edt||'',row.title||'',row.owner||'',row.type||'',
  row.duration||'',readable(row.start),readable(row.end),row.predecessor||'',
  row.dependency||'',row.lag||''];
 return visibleColumns().map(({index:i})=>{
  const value=items[i];
  return '<td class="'+(i===0?'vgg-id ':[1,4,5,6,7,8,9,10].includes(i)?'vgg-center ':'')+
    (i===2?'vgg-title':'')+'">'+escapeText(value)+'</td>';
 }).join('');
}
function render(){
 if(!overlay||overlay.hidden)return;
 const values=visibleActivities(),rows=keptRows(values);
 const days=st.week?allDates.filter(d=>week(d)===st.week):allDates;
 const displayed=visibleColumns();
 const colgroup=displayed.map(x=>'<col style="width:'+x.width+'px">').join('')+
  days.map(()=>'<col style="width:29px">').join('');
 const heads='<tr class="vgg-week">'+displayed.map(x=>
  '<th class="vgg-meta" rowspan="3">'+escapeText(x.label)+'</th>'
 ).join('')+weekHeaders(days)+'</tr>';
 const dnames=['D','L','M','X','J','V','S'];
 const dates='<tr class="vgg-date">'+days.map(d=>{
  const info=dayInfo(d);
  return '<th data-vgg-date="'+d+'" class="'+weekTone(d)+
   (info.dow===1?' vgg-week-start':'')+(info.mark?' nonwork':'')+
   (info.weekend?' weekend-header':'')+(info.holiday?' holiday-header':'')+
   (d===(typeof todayString==='function'?todayString():
    new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,'0')+'-'+
    String(new Date().getDate()).padStart(2,'0'))?' today-header':'')+
   '" title="'+escapeText(info.note||d)+'">'+Number(d.slice(-2))+'</th>';
 }).join('')+'</tr>';
 const dows='<tr class="vgg-weekday">'+days.map(d=>{
  const info=dayInfo(d);
  return '<th data-vgg-date="'+d+'" class="'+weekTone(d)+
   (info.dow===1?' vgg-week-start':'')+(info.mark?' nonwork':'')+
   (info.weekend?' weekend-header':'')+(info.holiday?' holiday-header':'')+
   (d===(typeof todayString==='function'?todayString():
    new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,'0')+'-'+
    String(new Date().getDate()).padStart(2,'0'))?' today-header':'')+
   '" title="'+escapeText(info.note||d)+'">'+dnames[info.dow]+'</th>';
 }).join('')+'</tr>';
 let body='',activityIndex=0;
 for(const row of rows){
  if(row.kind==='owner'){
   body+='<tr class="vgg-owner-row"><td colspan="'+displayed.length+'">'+escapeText(row.label)+'</td>'+
    '<td colspan="'+days.length+'"></td></tr>';continue;
  }
  if(row.kind==='group'){
   const copy={id:'',edt:row.id,title:row.title,owner:'',type:'Resumen',duration:row.duration,
    start:row.start,end:row.end,predecessor:'',dependency:'',lag:''};
   body+='<tr class="vgg-group-row">'+rowMeta(copy)+
    days.map(d=>dayBar(row,d,{state:'group'})).join('')+'</tr>';continue;
  }
  const state=taskState(row);
  body+='<tr class="vgg-activity'+((activityIndex++%2)?' vgg-row-alt':'')+
   (isOriol(row.owner)?' vgg-oriol':'')+
   '" data-gantt-activity="'+escapeText(row.id)+'" tabindex="0">'+rowMeta({
    ...row,type:row.type||'Act.'
   })+days.map(d=>dayBar(row,d,state)).join('')+'</tr>';
 }
 const node=document.getElementById('vgg-table');if(!node)return;
 clearGanttHover();
 node.innerHTML='<colgroup>'+colgroup+'</colgroup><thead>'+heads+dates+dows+
  '</thead><tbody>'+body+'</tbody>';
 document.getElementById('vgg-count').textContent=values.length+' de 54 actividades';
 if(!body)document.getElementById('vgg-detail').textContent='No se encontraron actividades para los filtros seleccionados.';
 else if(!st.selected)document.getElementById('vgg-detail').textContent=
  'Haz clic en una actividad para revisar su vinculación y avance en ÁREA BIM. Visor de solo lectura.';
}

let activeGanttRow='',activeGanttDate='';
function clearGanttHover(){
 const table=document.getElementById('vgg-table');
 if(table){
  table.querySelectorAll('.vgg-col-hover').forEach(el=>el.classList.remove('vgg-col-hover'));
  table.querySelectorAll('.vgg-row-hover').forEach(el=>el.classList.remove('vgg-row-hover'));
 }
 activeGanttRow='';activeGanttDate='';
}
function updateGanttHover(ev){
 const table=document.getElementById('vgg-table');
 if(!table||!table.contains(ev.target))return;
 const cell=ev.target.closest('[data-vgg-date]');
 const activityRow=ev.target.closest('tr[data-gantt-activity]');
 const date=cell?.dataset.vggDate||'';
 const id=activityRow?.dataset.ganttActivity||'';
 if(activeGanttDate!==date||activeGanttRow!==id){
  clearGanttHover();
  activeGanttDate=date;activeGanttRow=id;
  if(date)table.querySelectorAll('[data-vgg-date="'+date+'"]').forEach(el=>el.classList.add('vgg-col-hover'));
  if(activityRow)activityRow.classList.add('vgg-row-hover');
 }
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
 clearGanttHover();
 overlay.hidden=true;document.body.style.overflow=bodyOverflow;
 if(lastTrigger&&lastTrigger.isConnected&&typeof lastTrigger.focus==='function')lastTrigger.focus();
 lastTrigger=null;
}
function open(){
 // Recordar el botón que abrió el visor en cualquiera de las tres pestañas.
 lastTrigger=document.activeElement;
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
   '<details id="vgg-colchooser" class="vgg-colchooser"><summary>Columnas</summary>'+
   '<div class="vgg-colchooser-popover" aria-label="Columnas visibles">'+
   columns.map((col,i)=>'<label class="vgg-col-item"><input type="checkbox"'+
     (hiddenColumns.has(i)?'':' checked')+' data-vgg-col="'+i+'"> '+escapeText(col[0])+'</label>').join('')+
   '<button type="button" data-vgg-action="all-columns">Mostrar todas</button></div></details>'+
   '<span class="vgg-count" id="vgg-count"></span></div>'+
   '<div class="vgg-scroll"><table class="vgg-table" id="vgg-table" aria-label="Cronograma Gantt basado en Excel"></table></div>'+
   '<div class="vgg-detail" id="vgg-detail"></div>'+
   '<footer class="vgg-footer"><span class="vgg-chip"><i></i> Programado</span>'+
   '<span class="vgg-chip"><i class="done"></i> Culminado</span>'+
   '<span class="vgg-chip"><i class="late"></i> Culminado fuera de plazo</span>'+
   '<span class="vgg-chip"><i class="group"></i> Grupo</span>'+
   '<span class="vgg-chip"><i class="weekend"></i> Fin de semana / feriado</span>'+
   '<span class="vgg-chip"><i class="day-off"></i> Día libre Juan Carlos Prada (9-10)</span>'+
   '<span>Porcentajes = carga diaria programada en Excel · Oriol fuera del PPC · Copia sin sincronización</span>'+
   '</footer></section>';
  document.body.appendChild(overlay);
  const ganttSheet=document.getElementById('vgg-table');
  ganttSheet.addEventListener('pointerover',updateGanttHover);
  ganttSheet.addEventListener('pointerleave',clearGanttHover);
  overlay.querySelector('.vgg-scroll').addEventListener('scroll',clearGanttHover,{passive:true});
  overlay.addEventListener('click',ev=>{
   if(ev.target===overlay){close();return;}
   const columnPicker=document.getElementById('vgg-colchooser');
   if(columnPicker?.open&&!columnPicker.contains(ev.target))columnPicker.open=false;
   const button=ev.target.closest('[data-vgg-action]');
   if(button){
     if(button.dataset.vggAction==='all-columns'){
       hiddenColumns.clear();
       columnPicker.querySelectorAll('input[data-vgg-col]').forEach(input=>input.checked=true);
       render();return;
     }
     if(button.dataset.vggAction==='close')close();
     if(button.dataset.vggAction==='expand'){
      const panel=document.getElementById('bim-gantt-modal');
      panel.classList.toggle('max');button.textContent=panel.classList.contains('max')?'Restaurar':'Pantalla completa';
     }return;}
   const tr=ev.target.closest('tr[data-gantt-activity]');
   if(tr)showDetail(tr.dataset.ganttActivity);
  });
  overlay.addEventListener('change',ev=>{
   const input=ev.target.closest('input[data-vgg-col]');
   if(!input)return;
   const column=Number(input.dataset.vggCol);
   if(!Number.isInteger(column)||column<0||column>=columns.length)return;
   if(!input.checked && visibleColumns().length<=1){input.checked=true;return;}
   if(input.checked)hiddenColumns.delete(column);
   else hiddenColumns.add(column);
   render();
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
  overlay.addEventListener('keydown',ev=>{
   if(ev.key==='Escape'){
    ev.preventDefault();
    const picker=document.getElementById('vgg-colchooser');
    if(picker?.open){picker.open=false;return;}
    close();return;
   }
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
