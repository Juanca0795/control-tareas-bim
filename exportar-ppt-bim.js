/* Reporte BIM semanal: exportación PPTX de fotografías desde Supabase Storage.
 * Reconstruye en elementos editables el formato 16:9 de tres columnas de
 * PPT_Reunion_Semanal_020626.pptx (sin fotografías, textos ni etiquetas antiguas).
 * No usa IA ni inventa nombres de sectores, elementos o estados.
 */
// Versión probada para exportar PPTX OOXML válido (no usar el bundle 3.x anterior).
const PPT_BIM_VERSION='4.0.0';
const PPT_BIM_ZIP_VERSION='3.10.1';
let pptBimScriptPromise=null;
const PPT_BIM_MEETING_DAY_KEY='bim-ppt-meeting-day';
const PPT_BIM_MEETING_DAYS=['','lunes','martes','miércoles','jueves','viernes','sábado','domingo'];
function pptBimSavedMeetingDay(){
  try{
    const day=Number(localStorage.getItem(PPT_BIM_MEETING_DAY_KEY));
    return Number.isInteger(day)&&day>=1&&day<=7?day:3;
  }catch(e){return 3}
}
// Listas de personal según clasificación marcada en la referencia del área BIM.
// Los nombres con X nunca participan en las exportaciones AREA_BIM2.
const PPT_BIM_CIVIL_OWNERS=new Set([
  'arnold alejandro verastegui cova',
  'juan carlos saldana cova',
  'naysha norma hualpa aguirre',
  'pedro luis lopez flores',
  'veronica ivana bocanegra infante'
]);
const PPT_BIM_EXCLUDED_OWNERS=new Set([
  'claudio villano meza',
  'jenri tantanta tejeda',
  'maria pia moyano de la cruz',
  'oriol huerta diaz'
]);
function pptBimNormalizeOwner(name){
  return String(name||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .toLocaleLowerCase('es').trim().replace(/\s+/g,' ');
}
function pptBimSpecialtyForOwner(name){
  const key=pptBimNormalizeOwner(name);
  if(PPT_BIM_EXCLUDED_OWNERS.has(key))return 'excluded';
  return PPT_BIM_CIVIL_OWNERS.has(key)?'civil':'revit';
}
function pptBimGroupName(item){
  return pptBimState.profile==='by-person'
    ?item.owner||'Sin responsable'
    :item.package||'Sin paquete';
}
let pptBimState={items:[],week:'',mode:'reunion',meetingDay:pptBimSavedMeetingDay(),
  profile:'standard',specialty:'revit',weekFilters:{ingreso:true,culminacion:true},
  availableWeeks:[],busy:false,token:0,drafts:new Map()};

function pptBimLib(){
  const ctor=window.pptxgen||window.PptxGenJS;
  return typeof ctor==='function'?ctor:null;
}
async function pptBimEnsureLib(){
  if(pptBimLib())return pptBimLib();
  if(!pptBimScriptPromise){
    pptBimScriptPromise=new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src='https://cdn.jsdelivr.net/npm/pptxgenjs@'+PPT_BIM_VERSION+'/dist/pptxgen.bundle.js';
      script.onload=()=>pptBimLib()?resolve(pptBimLib()):reject(new Error('No se inicializó PptxGenJS'));
      script.onerror=()=>reject(new Error('No se pudo cargar la biblioteca de PowerPoint'));
      document.head.appendChild(script);
    }).catch(err=>{pptBimScriptPromise=null;throw err});
  }
  return pptBimScriptPromise;
}

// Comprobación del ZIP/OOXML real antes de ofrecer el archivo al usuario.
// No basta con que la biblioteca informe éxito: PowerPoint debe poder leerlo.
let pptBimZipPromise=null;
async function pptBimEnsureZip(){
  if(window.JSZip)return window.JSZip;
  if(!pptBimZipPromise){
    pptBimZipPromise=new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src='https://cdn.jsdelivr.net/npm/jszip@'+PPT_BIM_ZIP_VERSION+'/dist/jszip.min.js';
      script.onload=()=>window.JSZip?resolve(window.JSZip):reject(new Error('JSZip no se inicializó'));
      script.onerror=()=>reject(new Error('No se pudo cargar el verificador del archivo PPTX'));
      document.head.appendChild(script);
    }).catch(e=>{pptBimZipPromise=null;throw e});
  }
  return pptBimZipPromise;
}
async function pptBimValidateBlob(blob,slideCount,imageCount){
  if(!(blob instanceof Blob)||blob.size<1000)throw new Error('La presentación está vacía');
  const magic=new Uint8Array(await blob.slice(0,4).arrayBuffer());
  if(magic[0]!==0x50||magic[1]!==0x4b)
    throw new Error('La exportación no produjo un archivo ZIP de PowerPoint');
  const JSZip=await pptBimEnsureZip();
  // Los CRC ayudan a detectar bytes corruptos aun si el PPTX empieza por PK.
  const zip=await JSZip.loadAsync(blob,{checkCRC32:true});
  const mustHave=['[Content_Types].xml','_rels/.rels','ppt/presentation.xml',
    'ppt/_rels/presentation.xml.rels'];
  for(const path of mustHave)if(!zip.file(path))
    throw new Error('PPTX incompleto: falta '+path);
  const slides=Object.keys(zip.files).filter(p=>/^ppt\/slides\/slide\d+\.xml$/.test(p));
  if(slides.length!==slideCount)
    throw new Error('PPTX incompleto: '+slides.length+' de '+slideCount+' diapositivas');
  const media=Object.keys(zip.files).filter(p=>/^ppt\/media\/.+\.(png|jpe?g)$/i.test(p));
  if(media.length<imageCount)
    throw new Error('PPTX incompleto: faltan fotografías incrustadas');
  const parser=new DOMParser();
  // Verificar que cada parte XML y las relaciones sean parseables.
  for(const [path,file] of Object.entries(zip.files)){
    if(file.dir||!(/\.xml$/.test(path)||/\.rels$/.test(path)||path==='[Content_Types].xml'))continue;
    const xml=await file.async('string');
    const root=parser.parseFromString(xml,'application/xml');
    if(root.getElementsByTagName('parsererror').length)
      throw new Error('XML inválido dentro de la presentación: '+path);
  }
  return {slideCount:slides.length,imageCount:media.length};
}
function pptBimDownloadBlob(blob,fileName){
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=fileName;a.hidden=true;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Evitar liberar la URL antes de que el navegador termine de descargar.
  setTimeout(()=>URL.revokeObjectURL(url),60000);
}

// Convertir las marcas de tiempo UTC a día local de Perú.
function pptBimIngresoDate(photo){
  const date=new Date(String(photo.addedAt||''));
  if(!photo.addedAt||Number.isNaN(date.getTime()))return '';
  const parts=Intl.DateTimeFormat('es-PE',{
    timeZone:'America/Lima',year:'numeric',month:'2-digit',day:'2-digit'
  }).formatToParts(date);
  const fields=Object.fromEntries(parts.map(part=>[part.type,part.value]));
  return fields.year+'-'+fields.month+'-'+fields.day;
}
function pptBimIngresoWeek(photo){
  const day=pptBimIngresoDate(photo);
  return day?isoWeekKey(new Date(day+'T12:00:00')):'';
}
// Semana de la reunión: 7 días previos, hasta el día anterior (ambos inclusive).
function pptBimMeetingPeriod(week,meetingDay=3){
  const monday=weekStart(week);
  if(!monday||!Number.isInteger(meetingDay)||meetingDay<1||meetingDay>7)return null;
  const meeting=new Date(monday.getTime());
  meeting.setUTCDate(meeting.getUTCDate()+meetingDay-1);
  const start=new Date(meeting.getTime());
  start.setUTCDate(start.getUTCDate()-7);
  const end=new Date(meeting.getTime());
  end.setUTCDate(end.getUTCDate()-1);
  return {meeting:localISO(meeting),start:localISO(start),end:localISO(end)};
}
// La culminación corresponde a la FECHA REAL de término, no a la fecha límite.
function pptBimCompletionWeek(task){
  const date=String(task.completedAt||'');
  if(categoryOf(task.status)!=='done'||!/^\d{4}-\d{2}-\d{2}$/.test(date))return '';
  const parsed=new Date(date+'T12:00:00');
  return Number.isNaN(parsed.getTime())?'':isoWeekKey(parsed);
}
// Disponibilidad: ventana de nueve semanas más períodos con evidencia real.
function pptBimAvailableWeeks(anchor){
  const available=new Set([anchor]);
  for(let offset=-4;offset<=4;offset++)available.add(neighborWeek(anchor,offset));
  for(const task of tasks){
    const completed=pptBimCompletionWeek(task);
    if(completed)available.add(completed);
    for(const photo of taskEvidenceRecords(task.id)){
      const ingreso=pptBimIngresoWeek(photo);
      if(ingreso)available.add(ingreso);
    }
  }
  return [...available].filter(week=>weekStart(week)).sort().reverse();
}
function pptBimSetupWeekSelector(){
  const select=$('#bim-ppt-report-week');
  if(!select)return;
  select.innerHTML=pptBimState.availableWeeks.map(week=>
    '<option value="'+week+'">SEM'+Number(week.slice(-2))+' · '+week.slice(0,4)+'</option>').join('');
  select.value=pptBimState.week;
}
function pptBimItemsForWeek(week,mode='ingreso',meetingDay=3,specialty=null,weekFilters=null){
  const meetingPeriod=mode==='reunion'?pptBimMeetingPeriod(week,meetingDay):null;
  if(mode==='reunion'&&!meetingPeriod)return [];
  const packageFilter=$('#weekly-package')?.value||'';
  const teamFilter=$('#weekly-team')?.value||'';
  const ownerFilter=$('#weekly-owner')?.value||'';
  const out=[];
  for(const task of tasks){
    // El perfil original nunca entra en esta condición ni cambia su selección.
    if(specialty&&pptBimSpecialtyForOwner(task.owner)!==specialty)continue;
    if((packageFilter&&task.package!==packageFilter)||
       (teamFilter&&task.team!==teamFilter)||
       (ownerFilter&&task.owner!==ownerFilter))continue;
    if(mode==='culminacion'&&pptBimCompletionWeek(task)!==week)continue;
    for(const photo of taskEvidenceRecords(task.id)){
      if(mode==='ingreso'&&pptBimIngresoWeek(photo)!==week)continue;
      if(mode==='semana'){
        // OR inclusivo de los criterios; cada fotografía se emite una sola vez.
        const ingreso=weekFilters?.ingreso!==false&&pptBimIngresoWeek(photo)===week;
        const culminacion=weekFilters?.culminacion!==false&&pptBimCompletionWeek(task)===week;
        if(!ingreso&&!culminacion)continue;
      }
      if(mode==='reunion'){
        const ingreso=pptBimIngresoDate(photo);
        if(!ingreso||ingreso<meetingPeriod.start||ingreso>meetingPeriod.end)continue;
      }
      out.push({
        id:photo.id,path:photo.path,taskId:task.id,
        package:task.package||'Sin paquete',
        team:task.team||'',owner:task.owner||'',
        title:task.title||task.id,caption:task.title||task.id,
        name:photo.name||'Fotografía'
      });
    }
  }
  out.sort((a,b)=>
    (specialty?a.owner.localeCompare(b.owner,'es',{numeric:true}):a.package.localeCompare(b.package,'es',{numeric:true}))||
    (specialty?a.package.localeCompare(b.package,'es',{numeric:true}):0)||
    a.taskId.localeCompare(b.taskId,'es',{numeric:true})||
    a.id.localeCompare(b.id));
  // Numeración de fotografías dentro de cada actividad en la selección actual.
  const totals=new Map(),positions=new Map();
  for(const item of out)totals.set(item.taskId,(totals.get(item.taskId)||0)+1);
  for(const item of out){
    item.photoIndex=(positions.get(item.taskId)||0)+1;
    item.photoCount=totals.get(item.taskId);
    positions.set(item.taskId,item.photoIndex);
  }
  return out;
}
function pptBimPhotoKey(item){return item.taskId+'|'+item.id}
function pptBimRefreshModeInfo(){
  const special=pptBimState.profile==='by-person';
  document.querySelectorAll('[data-bim-ppt-mode]').forEach(button=>{
    button.hidden=!special&&button.dataset.bimPptMode==='semana';
    button.setAttribute('aria-pressed',String(button.dataset.bimPptMode===pptBimState.mode));
    button.disabled=pptBimState.busy;
  });
  const weekTools=$('#bim-ppt-week-tools'),weekSelector=$('#bim-ppt-report-week');
  const crossFilter=$('#bim-ppt-week-cross');
  if(weekTools)weekTools.hidden=!special;
  if(weekSelector){
    weekSelector.disabled=pptBimState.busy;
    weekSelector.value=pptBimState.week;
  }
  if(crossFilter)crossFilter.hidden=!special||pptBimState.mode!=='semana';
  for(const criterion of ['ingreso','culminacion']){
    const checkbox=$('#bim-ppt-cross-'+criterion);
    if(checkbox){
      checkbox.checked=!!pptBimState.weekFilters[criterion];
      checkbox.disabled=pptBimState.busy;
    }
  }
  const specialtyPicker=$('#bim-ppt-specialty-picker');
  const specialtyTrigger=$('#bim-ppt-specialty-trigger');
  if(specialtyPicker)specialtyPicker.hidden=!special;
  if(specialtyTrigger)specialtyTrigger.disabled=pptBimState.busy;
  if(special){
    const specialtyLabel=$('#bim-ppt-specialty-label');
    if(specialtyLabel)specialtyLabel.textContent=pptBimState.specialty==='civil'?'Civil 3D':'Revit';
    document.querySelectorAll('[data-bim-specialty]').forEach(option=>{
      option.setAttribute('aria-selected',String(option.dataset.bimSpecialty===pptBimState.specialty));
      option.disabled=pptBimState.busy;
    });
  }else closeBimPptSpecialtyMenu();
  const note=$('#bim-ppt-design-note');
  if(note)note.innerHTML=special
    ?'Perfil AREA_BIM2: fotografías agrupadas por <strong>responsable</strong> y filtradas por Civil 3D o Revit. El modo Por semana permite combinar Ingreso y Culminación sin duplicar fotos. No se incluyen los cuatro colaboradores excluidos. Se conservan los filtros de paquete, disciplina y colaborador.'
    :'Diseño basado en la plantilla de reunión semanal: cabeceras rojas, tres columnas y descripciones inferiores. Los títulos se obtienen del <strong>paquete de trabajo</strong>. Puedes corregir la descripción de cada fotografía antes de exportar. Se respetan los filtros de paquete, disciplina y colaborador.';
  const dayPicker=$('#bim-ppt-day-picker');
  const dayTrigger=$('#bim-ppt-meeting-trigger');
  if(dayPicker)dayPicker.hidden=pptBimState.mode!=='reunion';
  if(dayTrigger){
    dayTrigger.disabled=pptBimState.busy;
    $('#bim-ppt-meeting-label').textContent=
      PPT_BIM_MEETING_DAYS[pptBimState.meetingDay].replace(/^./,c=>c.toUpperCase());
  }
  document.querySelectorAll('[data-bim-meeting-day]').forEach(option=>{
    option.setAttribute('aria-selected',
      String(Number(option.dataset.bimMeetingDay)===pptBimState.meetingDay));
    option.disabled=pptBimState.busy;
  });
  if(pptBimState.mode!=='reunion'||pptBimState.busy)closeBimPptMeetingMenu();
  const label=$('#bim-ppt-week-label'),items=pptBimState.items;
  if(label)label.textContent='Semana '+pptBimState.week.replace('-W',' · ')+
    ' · '+items.length+' fotografía'+(items.length!==1?'s':'')+
    ' · '+new Set(items.map(pptBimGroupName)).size+(special?' responsable(s)':' paquete(s)');
  const description=$('#bim-ppt-mode-note');
  if(!description)return;
  if(pptBimState.mode==='reunion'){
    const period=pptBimMeetingPeriod(pptBimState.week,pptBimState.meetingDay);
    description.textContent=period
      ?'Reunión '+PPT_BIM_MEETING_DAYS[pptBimState.meetingDay]+' '+dateDisplay(period.meeting)+
       ' · Fotografías ingresadas del '+dateDisplay(period.start)+' al '+dateDisplay(period.end)+
       ' (hora de Perú).'
      :'No se pudo calcular el periodo de reunión.';
  }else if(pptBimState.mode==='ingreso'){
    description.textContent='Ingreso: fotografías cargadas durante la semana ISO seleccionada (hora de Perú).';
  }else if(pptBimState.mode==='semana'){
    const ingreso=pptBimState.weekFilters.ingreso,culminacion=pptBimState.weekFilters.culminacion;
    description.textContent='SEM'+Number(pptBimState.week.slice(-2))+' · '+
      (ingreso&&culminacion?
        'Ingreso O Culminación: fotos cargadas o tareas completadas durante esta semana; sin duplicar fotografías.':
        ingreso?'Solo ingreso: fotos cargadas durante esta semana.':
        'Solo culminación: fotos de tareas completadas durante esta semana.');
  }else{
    description.textContent='Culminación: fotografías de actividades completadas durante esta semana; no implica que la foto se haya tomado ese día.';
  }
}
function pptBimRefreshItems(mode=pptBimState.mode){
  // Conservar descripciones y casillas por fotografía al cambiar día o criterio.
  for(const item of pptBimState.items)
    pptBimState.drafts.set(pptBimPhotoKey(item),{caption:item.caption,enabled:item.enabled});
  const items=pptBimItemsForWeek(pptBimState.week,mode,pptBimState.meetingDay,
    pptBimState.profile==='by-person'?pptBimState.specialty:null,
    pptBimState.weekFilters);
  pptBimState.items=items.map(item=>({
    ...item,...(pptBimState.drafts.get(pptBimPhotoKey(item))||{}),enabled:
    pptBimState.drafts.get(pptBimPhotoKey(item))?.enabled??true
  }));
  pptBimState.mode=mode;
  pptBimState.token++;
  const progress=$('#bim-ppt-progress');
  if(progress)progress.textContent='';
  renderBimPptExport();
  loadBimPptThumbnails(pptBimState.token);
}
function setBimPptMode(mode){
  if(pptBimState.busy||!['ingreso','culminacion','reunion','semana'].includes(mode)||
    (mode==='semana'&&pptBimState.profile!=='by-person')||
    !$('#bim-ppt-back')?.classList.contains('open')||mode===pptBimState.mode)return;
  closeBimPptMeetingMenu();
  closeBimPptSpecialtyMenu();
  pptBimRefreshItems(mode);
}
function setBimPptReportWeek(week){
  if(pptBimState.profile!=='by-person'||pptBimState.busy||
    !$('#bim-ppt-back')?.classList.contains('open')||
    !pptBimState.availableWeeks.includes(week)||pptBimState.week===week)return;
  closeBimPptMeetingMenu();
  pptBimState.week=week;
  pptBimRefreshItems();
}
function setBimPptWeekCriterion(criterion,checked){
  if(pptBimState.profile!=='by-person'||pptBimState.mode!=='semana'||
    pptBimState.busy||!$('#bim-ppt-back')?.classList.contains('open')||
    !['ingreso','culminacion'].includes(criterion))return;
  const next={...pptBimState.weekFilters,[criterion]:Boolean(checked)};
  if(!next.ingreso&&!next.culminacion){
    toast('Selecciona Ingreso o Culminación como mínimo.');
    pptBimRefreshModeInfo();
    return;
  }
  pptBimState.weekFilters=next;
  pptBimRefreshItems();
}
// Menú propio: sin los márgenes adicionales del desplegable nativo del navegador.
function closeBimPptMeetingMenu(restoreFocus=false){
  const menu=$('#bim-ppt-meeting-menu'),trigger=$('#bim-ppt-meeting-trigger');
  if(!menu||!trigger)return;
  menu.hidden=true;
  trigger.setAttribute('aria-expanded','false');
  if(restoreFocus)trigger.focus();
}
function toggleBimPptMeetingMenu(){
  const menu=$('#bim-ppt-meeting-menu'),trigger=$('#bim-ppt-meeting-trigger');
  if(!menu||!trigger||trigger.disabled)return;
  const opening=menu.hidden;
  if(!opening){closeBimPptMeetingMenu();return}
  menu.hidden=false;
  trigger.setAttribute('aria-expanded','true');
  const active=menu.querySelector('[aria-selected="true"]')||
    menu.querySelector('[data-bim-meeting-day]');
  active?.focus();
}
function handleBimPptMeetingKey(event){
  const menu=$('#bim-ppt-meeting-menu');
  if(event.key==='Escape'&&!menu?.hidden){
    event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
    closeBimPptMeetingMenu(true);
    return;
  }
  if(event.key==='ArrowDown'||event.key==='ArrowUp'){
    event.preventDefault();
    if(menu?.hidden){toggleBimPptMeetingMenu();return}
    const options=[...menu.querySelectorAll('[data-bim-meeting-day]')];
    if(!options.length)return;
    const index=options.indexOf(document.activeElement);
    const shift=event.key==='ArrowDown'?1:-1;
    options[(index+shift+options.length)%options.length].focus();
  }
}
function closeBimPptSpecialtyMenu(restoreFocus=false){
  const menu=$('#bim-ppt-specialty-menu'),trigger=$('#bim-ppt-specialty-trigger');
  if(!menu||!trigger)return;
  menu.hidden=true;
  trigger.setAttribute('aria-expanded','false');
  if(restoreFocus)trigger.focus();
}
function toggleBimPptSpecialtyMenu(){
  const menu=$('#bim-ppt-specialty-menu'),trigger=$('#bim-ppt-specialty-trigger');
  if(!menu||!trigger||trigger.disabled||pptBimState.profile!=='by-person')return;
  const opening=menu.hidden;
  if(!opening){closeBimPptSpecialtyMenu();return}
  closeBimPptMeetingMenu();
  menu.hidden=false;
  trigger.setAttribute('aria-expanded','true');
  menu.querySelector('[aria-selected="true"]')?.focus();
}
function handleBimPptSpecialtyKey(event){
  const menu=$('#bim-ppt-specialty-menu');
  if(event.key==='Escape'&&!menu?.hidden){
    event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
    closeBimPptSpecialtyMenu(true);
    return;
  }
  if(event.key==='ArrowDown'||event.key==='ArrowUp'){
    event.preventDefault();
    if(menu?.hidden){toggleBimPptSpecialtyMenu();return}
    const options=[...menu.querySelectorAll('[data-bim-specialty]')];
    const index=options.indexOf(document.activeElement);
    const shift=event.key==='ArrowDown'?1:-1;
    options[(index+shift+options.length)%options.length].focus();
  }
}
function setBimPptSpecialty(value){
  if(pptBimState.profile!=='by-person'||pptBimState.busy||
    !$('#bim-ppt-back')?.classList.contains('open')||!['revit','civil'].includes(value))return;
  if(value!==pptBimState.specialty){
    pptBimState.specialty=value;
    pptBimRefreshItems();
  }
  closeBimPptSpecialtyMenu(true);
}
document.addEventListener('click',event=>{
  if(!event.target.closest('#bim-ppt-day-picker'))closeBimPptMeetingMenu();
  if(!event.target.closest('#bim-ppt-specialty-picker'))closeBimPptSpecialtyMenu();
});
function setBimPptMeetingDay(value){
  if(pptBimState.busy||!$('#bim-ppt-back')?.classList.contains('open'))return;
  const day=Number(value);
  if(!Number.isInteger(day)||day<1||day>7)return;
  if(day===pptBimState.meetingDay){closeBimPptMeetingMenu(true);return}
  pptBimState.meetingDay=day;
  try{localStorage.setItem(PPT_BIM_MEETING_DAY_KEY,String(day))}catch(e){}
  pptBimRefreshItems();
  closeBimPptMeetingMenu(true);
}
function openBimPptExport(){
  if(currentView!=='weekly'){toast('Ingresa a Control Semanal para exportar el informe.');return}
  if(!window.bimEvidenceCloud||!window.bimEvidenceCloud.ready()){
    toast('Supabase Storage no está disponible. Comprueba la conexión.');return;
  }
  const meetingDay=pptBimSavedMeetingDay();
  // AREA_BIM usa el flujo original. AREA_BIM2 activa únicamente el nuevo perfil.
  const profile=typeof bimExportProfile!=='undefined'&&bimExportProfile==='by-person'
    ?'by-person':'standard';
  const specialty='revit';
  const items=pptBimItemsForWeek(selectedWeek,'reunion',meetingDay,
    profile==='by-person'?specialty:null);
  pptBimState={items:items.map(x=>({...x,enabled:true})),
    week:selectedWeek,mode:'reunion',meetingDay,profile,specialty,
    weekFilters:{ingreso:true,culminacion:true},
    availableWeeks:profile==='by-person'?pptBimAvailableWeeks(selectedWeek):[],
    busy:false,token:pptBimState.token+1,drafts:new Map()};
  pptBimSetupWeekSelector();
  const dialog=$('#bim-ppt-back .bim-ppt-dialog');
  dialog?.classList.toggle('bim-ppt-person-export',profile==='by-person');
  renderBimPptExport();
  $('#bim-ppt-back').classList.add('open');
  document.body.style.overflow='hidden';
  loadBimPptThumbnails(pptBimState.token);
}
function closeBimPptExport(){
  if(pptBimState.busy)return;
  closeBimPptMeetingMenu();
  closeBimPptSpecialtyMenu();
  $('#bim-ppt-back').classList.remove('open');
  document.body.style.overflow='';
  pptBimState.token++;
  pptBimState.items=[];
}
function renderBimPptExport(){
  const area=$('#bim-ppt-list');
  if(!area)return;
  const groups=new Map();
  pptBimState.items.forEach((x,index)=>{
    const name=pptBimGroupName(x);
    if(!groups.has(name))groups.set(name,[]);
    groups.get(name).push({x,index});
  });
  area.innerHTML=pptBimState.items.length?[...groups].map(([name,group])=>
    '<section class="bim-ppt-group"><h3>'+esc(name)+
    ' <span>'+group.length+' fotografía(s)</span></h3><div class="bim-ppt-items">'+
    group.map(({x,index})=>
      '<article class="bim-ppt-item">'+
      '<div class="bim-ppt-item-title"><label><input type="checkbox" data-bim-ppt-check="'+index+'"'+
      (x.enabled?' checked':'')+'> Incluir</label>'+
      '<label class="bim-ppt-caption-label" for="bim-ppt-caption-'+index+'">Descripción para el PPT</label>'+
      '<span>'+esc(x.taskId)+' · '+esc(x.team||'Disciplina sin especificar')+
      ' · Foto '+x.photoIndex+' de '+x.photoCount+'</span></div>'+
      '<div class="bim-ppt-thumb" data-bim-ppt-thumb="'+index+'">Vista previa</div>'+
      '<div class="bim-ppt-fields">'+
      '<textarea id="bim-ppt-caption-'+index+'" data-bim-ppt-caption="'+index+'" maxlength="240" rows="2">'+
      esc(x.caption)+'</textarea></div></article>').join('')+
    '</div></section>').join(''):
    '<p class="bim-ppt-empty">No hay fotografías para la semana y el criterio seleccionados. Puedes cambiar el criterio arriba.</p>';
  updateBimPptSelectedCounter();
}
function updateBimPptSelectedCounter(){
  pptBimRefreshModeInfo();
  const included=pptBimState.items.filter(x=>x.enabled);
  const target=$('#bim-ppt-selection');
  if(target){
    const labels=included.map(pptBimGroupName);
    const isPerson=pptBimState.profile==='by-person';
    target.textContent=included.length+' imágenes · '+new Set(labels).size+
      (isPerson?' responsables':' paquetes')+' · '+
      included.reduce((n,x,i)=>n+(i===0||labels[i-1]!==labels[i]?1:0),0)+' grupos';
  }
  const btn=$('#bim-ppt-download');
  if(btn)btn.disabled=pptBimState.busy||!included.length;
}
document.addEventListener('input',event=>{
  const input=event.target.closest('[data-bim-ppt-caption]');
  if(!input)return;
  const idx=Number(input.dataset.bimPptCaption);
  if(pptBimState.items[idx])pptBimState.items[idx].caption=input.value;
});
document.addEventListener('change',event=>{
  const input=event.target.closest('[data-bim-ppt-check]');
  if(!input)return;
  const idx=Number(input.dataset.bimPptCheck);
  if(pptBimState.items[idx])pptBimState.items[idx].enabled=input.checked;
  updateBimPptSelectedCounter();
});
async function loadBimPptThumbnails(token){
  for(let idx=0;idx<pptBimState.items.length;idx++){
    if(token!==pptBimState.token)return;
    const item=pptBimState.items[idx],el=document.querySelector('[data-bim-ppt-thumb="'+idx+'"]');
    if(!el)continue;
    try{
      const url=await window.bimEvidenceCloud.url(item.path);
      if(token!==pptBimState.token)return;
      const img=document.createElement('img');
      img.alt='Fotografía de '+item.taskId;img.loading='lazy';img.src=url;
      el.replaceChildren(img);
    }catch(err){
      el.textContent='Vista previa no disponible';
    }
  }
}
function pptBimAddText(slide,text,opts={}){
  slide.addText(String(text||''),{fontFace:'Arial',color:'172B49',breakLine:false,margin:0,...opts});
}
/* Imágenes oficiales proporcionadas por el usuario, servidas como recurso estático
   del mismo sitio de Vercel. La exportación se cancela si faltan los logos. */
let pptBimOfficialLogosPromise=null;
async function pptBimLoadOfficialLogos(){
  if(!pptBimOfficialLogosPromise){
    const url=new URL('assets/logos-oficiales-bim.b64.txt',document.baseURI).href;
    pptBimOfficialLogosPromise=fetch(url,{cache:'force-cache'}).then(async response=>{
      if(!response.ok)throw new Error('No se encontraron los logos oficiales ANIN / S&P en Vercel');
      const data=(await response.text()).replace(/\s+/g,'');
      if(!/^\/9j\/[a-zA-Z0-9+/]+={0,2}$/.test(data)||data.length<10000)
        throw new Error('El recurso con logos oficiales está dañado');
      return 'data:image/jpeg;base64,'+data;
    }).catch(err=>{pptBimOfficialLogosPromise=null;throw err});
  }
  return pptBimOfficialLogosPromise;
}

function pptBimMaster(slide,pptx){
  const S=pptx.ShapeType;
  slide.background={color:'FFFFFF'};
  // Sustituye las imitaciones de ANIN y S&P por los dos logos oficiales,
  // montados sobre una franja blanca. Se aplica a portada y hojas de evidencias.
  if(!pptx._bimOfficialLogos)throw new Error('Los logos oficiales aún no están disponibles');
  slide.addImage({data:pptx._bimOfficialLogos,x:0,y:.02,w:13.33,h:.667});
  slide.addShape(S.line,{x:0,y:.72,w:13.33,h:0,line:{color:'C8C8C8',width:.75}});
  // Pie gris con banda roja heredados visualmente del archivo de referencia.
  slide.addShape(S.rect,{x:0,y:7.05,w:9.05,h:.39,fill:{color:'858585'},line:{color:'858585'}});
  slide.addShape(S.rect,{x:9.06,y:7.02,w:4.27,h:.29,fill:{color:'FF0000'},line:{color:'FF0000'}});
}
function pptBimFit(innerW,innerH,iw,ih){
  const ratio=Math.min(innerW/iw,innerH/ih);
  return {w:iw*ratio,h:ih*ratio};
}
function pptBimCover(pptx,week,groups,imageCount,meetingPeriod=null,byPerson=false){
  const slide=pptx.addSlide();
  pptBimMaster(slide,pptx);
  const S=pptx.ShapeType;
  pptBimAddText(slide,'REPORTE FOTOGRÁFICO BIM',
    {x:.55,y:1.04,w:12.15,h:.65,fontSize:30,bold:true,color:'172B49'});
  slide.addShape(S.rect,{x:.55,y:1.89,w:12.18,h:.12,fill:{color:'C00000'},line:{color:'C00000'}});
  pptBimAddText(slide,'CONTROL SEMANAL · '+week.replace('-W',' / SEMANA '),
    {x:.55,y:2.37,w:12,h:.55,fontSize:22,bold:true});
  const detail=meetingPeriod
    ?'REUNIÓN '+dateDisplay(meetingPeriod.meeting)+' · INGRESO '+dateDisplay(meetingPeriod.start)+
     ' AL '+dateDisplay(meetingPeriod.end)
    :'Evidencias vinculadas a entregables registrados en Control de Tareas';
  pptBimAddText(slide,detail,
    {x:.55,y:3.1,w:12,h:.43,fontSize:14,color:'525D6C'});
  pptBimAddText(slide,(byPerson?'RESPONSABLES: ':'PAQUETES: ')+groups+'     FOTOGRAFÍAS: '+imageCount,
    {x:.55,y:4.11,w:12,h:.55,fontSize:18,color:'172B49',bold:true});
  pptBimAddText(slide,'Descripciones basadas en las tareas registradas y revisadas antes de exportar.',
    {x:.55,y:5.43,w:12.15,h:.44,fontSize:12,color:'626B78'});
  slide.addShape(S.rect,{x:0,y:6.79,w:4.12,h:.35,fill:{color:'FF0000'},line:{color:'FF0000'}});
  pptBimAddText(slide,'ÁREA BIM · S&P',{x:.45,y:6.87,w:3.4,h:.16,
    fontSize:10,color:'FFFFFF',bold:true,align:'center'});
}
/* AREA_BIM mantiene intacto el empaquetado consecutivo por paquete.
 * AREA_BIM2 optimiza por responsable: páginas de 3 fotografías de una persona
 * primero, luego combina remanentes de 2+1 o de distintas personas.
 * Solo queda una fotografía sola cuando no hay otra disponible en el informe.
 */
function pptBimPackSlides(items,byPerson=false){
  const groups=new Map();
  for(const item of items){
    const key=String(byPerson?(item.owner||'Sin responsable'):(item.package||'Sin paquete'));
    if(!groups.has(key))groups.set(key,[]);
    groups.get(key).push(item);
  }
  const pages=[];
  if(!byPerson){
    // Ruta existente de AREA_BIM: no modificar la distribución por paquetes.
    let page=[];
    for(const photos of groups.values()){
      for(const photo of photos){
        if(page.length===3){pages.push(page);page=[]}
        page.push(photo);
      }
    }
    if(page.length)pages.push(page);
    return pages;
  }
  // Dar prioridad a responsables con más evidencias; desempatar alfabéticamente.
  const ordered=[...groups.entries()].sort((a,b)=>
    b[1].length-a[1].length||a[0].localeCompare(b[0],'es',{numeric:true}));
  const pairs=[],singles=[];
  for(const [,photos] of ordered){
    let index=0;
    while(index+3<=photos.length){
      pages.push(photos.slice(index,index+3));
      index+=3;
    }
    const rest=photos.slice(index);
    if(rest.length===2)pairs.push(rest);
    else if(rest.length===1)singles.push(rest[0]);
  }
  // Completar primero las parejas con fotografías individuales.
  while(pairs.length&&singles.length){
    pages.push([...pairs.shift(),singles.shift()]);
  }
  // Si quedan solo parejas, se permite mezclar responsables para aprovechar
  // las tres columnas; si quedan singles, comparten diapositiva.
  const remaining=[...pairs.flat(),...singles];
  for(let index=0;index<remaining.length;index+=3)
    pages.push(remaining.slice(index,index+3));
  // Evitar que la última página tenga una sola imagen cuando una página
  // anterior dispone de tres: redistribuir 3+1 como 2+2.
  if(pages.length>1&&pages[pages.length-1].length===1){
    const prior=pages[pages.length-2];
    if(prior.length===3)pages[pages.length-1].unshift(prior.pop());
    else if(prior.length===2){
      pages[pages.length-1].unshift(...prior);
      pages.splice(pages.length-2,1);
    }
  }
  return pages;
}
function pptBimEvidenceSlide(pptx,week,entries,byPerson=false){
  if(!Array.isArray(entries)||entries.length<1||entries.length>3)
    throw new Error('Cada diapositiva requiere entre 1 y 3 fotografías.');
  const S=pptx.ShapeType,slide=pptx.addSlide();
  pptBimMaster(slide,pptx);
  pptBimAddText(slide,'EVIDENCIAS BIM · SEMANA '+week.split('-W')[1],
    {x:.37,y:.80,w:11.9,h:.29,fontSize:18,bold:true});
  const start=.28,totalWidth=12.801,top=1.13,redH=.673,picH=3.746,captionH=.961;
  const gap=.015,slotWidth=(totalWidth-gap*(entries.length-1))/entries.length;
  for(let k=0;k<entries.length;k++){
    const e=entries[k],x=start+k*(slotWidth+gap),w=slotWidth;
    slide.addShape(S.rect,{x,y:top,w,h:redH,
      fill:{color:'C00000'},line:{color:'000000',width:.8}});
    // El perfil original usa paquete; AREA_BIM2 usa responsable como título.
    pptBimAddText(slide,String(byPerson?(e.owner||'Sin responsable'):(e.package||'Sin paquete')).toUpperCase(),
      {x:x+.10,y:top+.13,w:w-.2,h:.37,fontSize:16,bold:true,color:'FFFFFF',align:'center',
        fit:'shrink'});
    slide.addShape(S.rect,{x,y:top+redH,w,h:picH,
      fill:{color:'FFFFFF'},line:{color:'000000',width:.8}});
    slide.addShape(S.rect,{x,y:top+redH+picH,w,h:captionH,
      fill:{color:'FFFFFF'},line:{color:'000000',width:.8}});
    const frame={x:x+.16,y:top+redH+.13,w:w-.32,h:picH-.26};
    const sz=pptBimFit(frame.w,frame.h,e.width,e.height);
    slide.addImage({data:e.data,x:frame.x+(frame.w-sz.w)/2,
      y:frame.y+(frame.h-sz.h)/2,w:sz.w,h:sz.h});
    const caption=String(e.caption||e.title||'').replace(/\s+/g,' ').trim();
    pptBimAddText(slide,caption,
      {x:x+.13,y:top+redH+picH+.09,w:w-.26,h:.59,
        fontSize:caption.length>180?8:caption.length>95?10:13,
        bold:true,align:'center',valign:'mid',fit:'shrink'});
    pptBimAddText(slide,(byPerson?e.package+' · ':'')+e.taskId+
      (e.team?' · '+e.team:'')+' · Foto '+e.photoIndex+' de '+e.photoCount,
      {x:x+.13,y:top+redH+picH+.73,w:w-.26,h:.14,fontSize:8,
        color:'5A5A5A',align:'center'});
  }
  const groups=[...new Set(entries.map(e=>byPerson?
    (e.owner||'Sin responsable'):(e.package||'Sin paquete')))];
  const label=groups.length===1?groups[0]:groups.join(' / ');
  slide.addShape(S.rect,{x:0,y:6.8,w:4.1,h:.34,fill:{color:'FF0000'},line:{color:'FF0000'}});
  pptBimAddText(slide,label+' · '+week.replace('-W',' / S'),
    {x:.17,y:6.88,w:3.83,h:.16,fontSize:10,color:'FFFFFF',bold:true,align:'center',fit:'shrink'});
}
async function pptBimDecodeImage(blob){
  // PPTX no admite WebP de manera fiable: normalizamos a JPG dentro del navegador.
  const bmp=await createImageBitmap(blob);
  const scale=Math.min(1,1900/Math.max(bmp.width,bmp.height));
  const canvas=document.createElement('canvas');
  canvas.width=Math.max(1,Math.round(bmp.width*scale));
  canvas.height=Math.max(1,Math.round(bmp.height*scale));
  const ctx=canvas.getContext('2d');
  if(!ctx){bmp.close?.();throw new Error('No se pudo procesar la imagen')}
  ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(bmp,0,0,canvas.width,canvas.height);
  bmp.close?.();
  return {data:canvas.toDataURL('image/jpeg',.86),width:canvas.width,height:canvas.height};
}
async function exportBimPpt(){
  if(pptBimState.busy)return;
  const included=pptBimState.items.filter(x=>x.enabled);
  if(!included.length){toast('Selecciona al menos una fotografía.');return}
  if(!window.bimEvidenceCloud?.ready()){toast('No hay conexión con Supabase Storage.');return}
  const runToken=pptBimState.token,btn=$('#bim-ppt-download'),status=$('#bim-ppt-progress');
  pptBimState.busy=true;
  pptBimRefreshModeInfo();
  if(btn)btn.disabled=true;
  if(status)status.textContent='Preparando PowerPoint…';
  try{
    const Factory=await pptBimEnsureLib();
    const pptx=new Factory();
    pptx.layout='LAYOUT_WIDE';
    pptx._bimOfficialLogos=await pptBimLoadOfficialLogos();
    pptx.author='ÁREA BIM | S&P';
    pptx.subject='Reporte de evidencias BIM, '+pptBimState.week;
    pptx.title='Reporte fotográfico BIM '+pptBimState.week;
    pptx.lang='es-PE';
    // PptxGenJS inserta company directamente en docProps/app.xml.
    // El ampersand debe escaparse para no invalidar todo el PowerPoint.
    pptx.company='ÁREA BIM | S&amp;P';
    const byPerson=pptBimState.profile==='by-person';
    const groups=new Set(included.map(item=>
      byPerson?(item.owner||'Sin responsable'):(item.package||'Sin paquete')));
    pptBimCover(pptx,pptBimState.week,groups.size,included.length,
      pptBimState.mode==='reunion'?pptBimMeetingPeriod(pptBimState.week,pptBimState.meetingDay):null,
      byPerson);
    const decoded=[];
    for(const photo of included){
      if(runToken!==pptBimState.token)throw new Error('La exportación fue interrumpida');
      const blob=await window.bimEvidenceCloud.download(photo.path);
      const loaded=await pptBimDecodeImage(blob);
      decoded.push({...photo,...loaded});
      if(status)status.textContent='Preparando imágenes '+decoded.length+' de '+included.length+'…';
    }
    // AREA_BIM2: agrupar por persona; AREA_BIM conserva las páginas por paquete.
    const pages=pptBimPackSlides(decoded,byPerson);
    for(const entries of pages)pptBimEvidenceSlide(pptx,pptBimState.week,entries,byPerson);
    if(status)status.textContent='Generando PPTX editable…';
    const totalSlides=1+pages.length;
    const generated=await pptx.write({outputType:'blob',compression:true});
    const blob=generated instanceof Blob?generated:new Blob([generated],
      {type:'application/vnd.openxmlformats-officedocument.presentationml.presentation'});
    if(status)status.textContent='Validando integridad del archivo PowerPoint…';
    await pptBimValidateBlob(blob,totalSlides,included.length);
    const suffix=byPerson?'_'+(pptBimState.specialty==='civil'?'Civil3D':'Revit'):'';
    pptBimDownloadBlob(blob,'Reporte_BIM'+suffix+'_'+pptBimState.week.replace('-','_')+'.pptx');
    if(status)status.textContent='Presentación generada: '+totalSlides+' diapositivas.';
    toast('Presentación PPTX generada correctamente.');
  }catch(err){
    console.error('Exportación PPT:',err);
    if(status)status.textContent='No se pudo generar: '+(err?.message||String(err));
    toast('Error al generar la presentación: '+(err?.message||'Revisa el navegador.'));
  }finally{
    pptBimState.busy=false;
    updateBimPptSelectedCounter();
  }
}
