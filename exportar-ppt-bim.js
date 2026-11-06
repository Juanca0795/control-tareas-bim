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
// Misma clasificación utilizada por la columna Sector de Control de Tareas.
function pptBimSector(item){
  return taskSector(item.package)||'Sin sector';
}
let pptBimState={items:[],week:'',mode:'reunion',meetingDay:pptBimSavedMeetingDay(),
  profile:'standard',specialty:'revit',includeTables:false,exportContent:'fotos',sectorFilter:'',manualMeetingRange:null,
  weekFilters:{ingreso:true,culminacion:true},
  // AREA_BIM2: null = todas las personas disponibles de la especialidad.
  selectedOwners:{revit:null,civil:null},ownerCandidates:[],
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
/* PptxGenJS 4.0.0 puede dar el mismo p:cNvPr/@id a una tabla y un
 * cuadro de texto de una diapositiva. PowerPoint interpreta esos IDs
 * repetidos como contenido no válido y solicita reparar el PPTX.
 * Renumeramos únicamente los identificadores duplicados antes de descargar. */
async function pptBimRepairShapeIdentifiers(blob){
  const JSZip=await pptBimEnsureZip();
  const zip=await JSZip.loadAsync(blob,{checkCRC32:true});
  const ns='http://schemas.openxmlformats.org/presentationml/2006/main';
  const parser=new DOMParser(),serializer=new XMLSerializer();
  const slidePaths=Object.keys(zip.files).filter(path=>/^ppt\/slides\/slide\d+\.xml$/.test(path));
  let repaired=0;
  for(const path of slidePaths){
    const xml=await zip.file(path).async('string');
    const doc=parser.parseFromString(xml,'application/xml');
    if(doc.getElementsByTagName('parsererror').length)
      throw new Error('La diapositiva contiene XML inválido: '+path);
    const nodes=Array.from(doc.getElementsByTagNameNS(ns,'cNvPr'));
    const ids=nodes.map(node=>Number(node.getAttribute('id')));
    const taken=new Set(ids.filter(id=>Number.isSafeInteger(id)&&id>0));
    const seen=new Set();
    let next=ids.reduce((max,id)=>Number.isSafeInteger(id)&&id>max?id:max,1)+1;
    let changed=false;
    for(const node of nodes){
      const id=Number(node.getAttribute('id'));
      if(!Number.isSafeInteger(id)||id<1||seen.has(id)){
        while(taken.has(next)||seen.has(next))next++;
        node.setAttribute('id',String(next));
        seen.add(next);taken.add(next);next++;changed=true;
      }else seen.add(id);
    }
    if(changed){
      zip.file(path,serializer.serializeToString(doc));
      repaired++;
    }
  }
  if(!repaired)return blob;
  console.info('PPTX: corregidos IDs repetidos de figuras/tablas en '+repaired+' diapositiva(s).');
  return zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:6}});
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
    if(/^ppt\/slides\/slide\d+\.xml$/.test(path)){
      const pns='http://schemas.openxmlformats.org/presentationml/2006/main';
      const ans='http://schemas.openxmlformats.org/drawingml/2006/main';
      const nodes=root.getElementsByTagNameNS(pns,'cNvPr');
      const ids=new Set();
      for(const node of nodes){
        const id=Number(node.getAttribute('id'));
        if(!Number.isSafeInteger(id)||id<1||ids.has(id))
          throw new Error('PPTX con identificadores duplicados o inválidos: '+path);
        ids.add(id);
      }
      // La caja gráfica de una tabla debe cubrir la suma de alturas de sus filas.
      // Un h implícito de 1" con filas mayores es incompatible con PowerPoint.
      for(const frame of root.getElementsByTagNameNS(pns,'graphicFrame')){
        const table=frame.getElementsByTagNameNS(ans,'tbl')[0];
        const extent=frame.getElementsByTagNameNS(ans,'ext')[0];
        if(!table||!extent)continue;
        const height=Number(extent.getAttribute('cy'));
        const rows=[...table.getElementsByTagNameNS(ans,'tr')];
        const total=rows.reduce((sum,row)=>sum+Number(row.getAttribute('h')||0),0);
        if(!Number.isFinite(height)||!Number.isFinite(total)||total<=0||
          Math.abs(height-total)>9144)
          throw new Error('Tabla con altura de contenedor incorrecta en '+path);
      }
    }
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
// El rango manual solo aplica a esta exportación; nunca altera las fechas de tareas.
function pptBimMeetingReportPeriod(week,day,manualRange=null){
  const automatic=pptBimMeetingPeriod(week,day);
  if(!automatic)return null;
  return manualRange?.start&&manualRange?.end
    ?{...automatic,start:manualRange.start,end:manualRange.end}:automatic;
}
function pptBimValidRangeDate(value){
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
  const parsed=new Date(value+'T00:00:00Z');
  return !Number.isNaN(parsed.getTime())&&parsed.toISOString().slice(0,10)===value;
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
    const entered=taskCreationDate(task);
    if(/^\d{4}-\d{2}-\d{2}$/.test(entered))
      available.add(isoWeekKey(new Date(entered+'T12:00:00')));
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
function pptBimItemsForWeek(week,mode='ingreso',meetingDay=3,specialty=null,weekFilters=null,sectorFilter='',manualMeetingRange=null,includeEmpty=false){
  const meetingPeriod=mode==='reunion'?pptBimMeetingReportPeriod(week,meetingDay,manualMeetingRange):null;
  if(mode==='reunion'&&!meetingPeriod)return [];
  const packageFilter=$('#weekly-package')?.value||'';
  // Para una especialidad explícita del selector, ignorar el filtro global
  // de disciplina de Control Semanal; el selector debe poder cambiar a GIS.
  const teamFilter=specialty?.startsWith('team:')?'':($('#weekly-team')?.value||'');
  const ownerFilter=$('#weekly-owner')?.value||'';
  const out=[];
  for(const task of tasks){
    // El perfil original nunca entra en esta condición ni cambia su selección.
    if(specialty){
      if(specialty.startsWith('team:')){
        // Las especialidades adicionales (ej. GIS) se basan en la disciplina registrada.
        // La exclusión por responsable pertenece solo a los perfiles de
        // Revit/Civil 3D. Al escoger GIS u otra disciplina explícita,
        // incluir sus actividades aunque el responsable esté excluido allí.
        if(pptBimNormalizeOwner(task.team)!==specialty.slice(5))continue;
      }else if(pptBimSpecialtyForOwner(task.owner)!==specialty)continue;
    }
    if(sectorFilter&&pptBimSector(task)!==sectorFilter)continue;
    if((packageFilter&&task.package!==packageFilter)||
       (teamFilter&&task.team!==teamFilter)||
       (ownerFilter&&task.owner!==ownerFilter))continue;
    // AREA_BIM conserva su exclusión por fecha de culminación.
    // AREA_BIM2 debe mostrar también tareas que no tienen fotografías para el período.
    const matchesCompletion=mode!=='culminacion'||pptBimCompletionWeek(task)===week;
    if(!matchesCompletion&&!includeEmpty)continue;
    let matchedPhotos=0;
    for(const photo of taskEvidenceRecords(task.id)){
      if(!matchesCompletion)continue;
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
      matchedPhotos++;
      out.push({
        id:photo.id,path:photo.path,taskId:task.id,
        package:task.package||'Sin paquete',
        team:task.team||'',owner:task.owner||'',
        title:task.title||task.id,caption:task.title||task.id,
        name:photo.name||'Fotografía'
      });
    }
    if(includeEmpty&&!matchedPhotos){
      // Una única caja vacía por actividad, aun cuando existan fotos de otras semanas.
      out.push({
        id:'sin-captura-'+task.id,path:'',empty:true,taskId:task.id,
        package:task.package||'Sin paquete',
        team:task.team||'',owner:task.owner||'',
        status:task.status||'',deadline:task.deadline||'',
        title:task.title||task.id,caption:task.title||task.id,
        name:'Sin captura',photoIndex:0,photoCount:0
      });
    }
  }
  out.sort((a,b)=>
    Number(!!a.empty)-Number(!!b.empty)||
    (specialty?a.owner.localeCompare(b.owner,'es',{numeric:true}):a.package.localeCompare(b.package,'es',{numeric:true}))||
    (specialty?pptBimSector(a).localeCompare(pptBimSector(b),'es',{numeric:true}):0)||
    (specialty?a.package.localeCompare(b.package,'es',{numeric:true}):0)||
    a.taskId.localeCompare(b.taskId,'es',{numeric:true})||
    a.id.localeCompare(b.id));
  // Numeración de fotografías dentro de cada actividad en la selección actual.
  const totals=new Map(),positions=new Map();
  for(const item of out)if(!item.empty)totals.set(item.taskId,(totals.get(item.taskId)||0)+1);
  for(const item of out){
    if(item.empty)continue;
    item.photoIndex=(positions.get(item.taskId)||0)+1;
    item.photoCount=totals.get(item.taskId);
    positions.set(item.taskId,item.photoIndex);
  }
  return out;
}
function pptBimPhotoKey(item){return item.taskId+'|'+item.id}

/* AREA_BIM2 — selector por persona sobre la especialidad existente.
 * La elección se aplica antes de mostrar fotos y antes de generar el PPTX.
 * Revit y Civil 3D mantienen casillas independientes en la misma sesión. */
function pptBimAvailablePeople(){
  const people=new Map();
  for(const item of pptBimState.ownerCandidates||[]){
    const key=pptBimNormalizeOwner(item.owner);
    // ownerCandidates ya está filtrado por especialidad (nombre o disciplina).
    if(!key)continue;
    if(!people.has(key))people.set(key,{key,name:item.owner,taskIds:new Set()});
    people.get(key).taskIds.add(item.taskId);
  }
  return [...people.values()].map(({taskIds,...person})=>({
    ...person,count:taskIds.size
  })).sort((a,b)=>a.name.localeCompare(b.name,'es',{numeric:true,sensitivity:'base'}));
}
function pptBimSelectedPeople(){
  const chosen=pptBimState.selectedOwners?.[pptBimState.specialty];
  return Array.isArray(chosen)?new Set(chosen):null;
}
function pptBimRenderPeoplePicker(){
  const special=pptBimState.profile==='by-person';
  const picker=$('#bim-ppt-people-picker');
  if(!picker)return;
  picker.hidden=!special;
  if(!special){closeBimPptPeopleMenu();return;}
  const people=pptBimAvailablePeople();
  const selected=pptBimSelectedPeople();
  const chosen=selected===null?people.length:
    people.filter(x=>selected.has(x.key)).length;
  const label=$('#bim-ppt-people-label');
  if(label)label.textContent='Personal '+chosen+'/'+people.length;
  const trigger=$('#bim-ppt-people-trigger');
  if(trigger){
    trigger.disabled=pptBimState.busy||!people.length;
    trigger.setAttribute('aria-label','Seleccionar colaboradores de '+
      (pptBimState.specialty==='civil'?'Civil 3D':'Revit')+
      ': '+chosen+' de '+people.length);
  }
  const menu=$('#bim-ppt-people-options');
  if(!menu)return;
  menu.innerHTML=people.length?people.map(person=>
    '<label class="bim-ppt-people-option"><input type="checkbox" data-bim-ppt-person="'+
    esc(person.key)+'" value="'+esc(person.key)+'"'+
    (selected===null||selected.has(person.key)?' checked':'')+
    (pptBimState.busy?' disabled':'')+'>'+
    '<span class="name">'+esc(person.name)+'</span>'+
    '<span class="photo-count">'+person.count+' actividad'+(person.count!==1?'es':'')+
    '</span></label>').join(''):
    '<div class="bim-ppt-people-empty">No hay actividades de esta especialidad con los filtros actuales.</div>';
  document.querySelectorAll('#bim-ppt-people-menu .bim-ppt-people-actions button').forEach(button=>{
    button.disabled=pptBimState.busy||!people.length;
  });
}
function closeBimPptPeopleMenu(restoreFocus=false){
  const menu=$('#bim-ppt-people-menu'),trigger=$('#bim-ppt-people-trigger');
  if(!menu||!trigger)return;
  menu.hidden=true;
  trigger.setAttribute('aria-expanded','false');
  if(restoreFocus)trigger.focus();
}
function positionBimPptPeopleMenu(){
  const menu=$('#bim-ppt-people-menu'),trigger=$('#bim-ppt-people-trigger');
  if(!menu||!trigger||menu.hidden)return;
  const header=menu.parentElement;
  if(!header)return;
  const box=header.getBoundingClientRect(),anchor=trigger.getBoundingClientRect();
  const width=Math.min(menu.offsetWidth||308,Math.max(1,box.width-24));
  const left=Math.max(12,Math.min(anchor.right-box.left-width,box.width-width-12));
  menu.style.left=left+'px';
  menu.style.right='auto';
}
function toggleBimPptPeopleMenu(){
  if(pptBimState.profile!=='by-person'||pptBimState.busy)return;
  const menu=$('#bim-ppt-people-menu'),trigger=$('#bim-ppt-people-trigger');
  if(!menu||!trigger||trigger.disabled)return;
  const opening=menu.hidden;
  if(!opening){closeBimPptPeopleMenu();return;}
  closeBimPptSpecialtyMenu();
  closeBimPptMeetingMenu();
  menu.hidden=false;
  trigger.setAttribute('aria-expanded','true');
  positionBimPptPeopleMenu();
}
function setBimPptPerson(key,checked){
  if(pptBimState.profile!=='by-person'||pptBimState.busy)return;
  const people=pptBimAvailablePeople(),keys=people.map(x=>x.key);
  if(!keys.includes(key))return;
  const saved=pptBimSelectedPeople();
  const next=new Set(saved===null?keys:saved);
  if(checked)next.add(key);else next.delete(key);
  pptBimState.selectedOwners[pptBimState.specialty]=
    keys.every(x=>next.has(x))?null:[...next];
  pptBimRefreshItems();
  // Conservar el foco del check al reconstruir la vista previa.
  const newInput=[...document.querySelectorAll('[data-bim-ppt-person]')]
    .find(input=>input.value===key);
  newInput?.focus();
}
function setBimPptAllPeople(enabled){
  if(pptBimState.profile!=='by-person'||pptBimState.busy)return;
  pptBimState.selectedOwners[pptBimState.specialty]=enabled?null:[];
  pptBimRefreshItems();
}
/* Especialidades adicionales: aparecen solo al activar "Añadir tablas".
 * Se descubren en los registros sin evidencia que cumplen los filtros actuales,
 * incluidos los equipos con únicamente actividades tabulares (por ejemplo GIS).
 * Revit/Civil 3D conservan su clasificación anterior por responsable. */
/* AREA_BIM2: las opciones de especialidad NO dependen de fotografías ni de
 * "ownerCandidates". Una disciplina con tareas sin fotos (GIS, por ejemplo)
 * debe aparecer aun si el filtro semanal de disciplina está en Revit. */
function pptBimTableSpecialties(){
  if(pptBimState.profile!=='by-person'||!pptBimState.includeTables)return [];
  const ignored=new Set(['revit','rvt','civil','civil 3d','civil3d','c3d']);
  const teams=new Map();
  const sector=pptBimState.sectorFilter||'';
  const packageFilter=$('#weekly-package')?.value||'';
  for(const task of tasks){
    if(sector&&pptBimSector(task)!==sector)continue;
    if(packageFilter&&task.package!==packageFilter)continue;
    const name=String(task.team||'').trim();
    const key=pptBimNormalizeOwner(name);
    if(!key||ignored.has(key))continue;
    if(!teams.has(key))teams.set(key,name);
  }
  return [...teams].map(([key,label])=>({value:'team:'+key,label}))
    .sort((a,b)=>a.label.localeCompare(b.label,'es',{numeric:true}));
}
function pptBimSpecialtyName(value){
  if(value==='civil')return 'Civil 3D';
  if(value==='revit')return 'Revit';
  return pptBimTableSpecialties().find(opt=>opt.value===value)?.label||'Revit';
}
function pptBimRenderSpecialties(){
  const menu=$('#bim-ppt-specialty-menu');
  if(!menu)return;
  const options=[
    {value:'revit',label:'Revit'},{value:'civil',label:'Civil 3D'},
    ...pptBimTableSpecialties()
  ];
  menu.innerHTML=options.map(option=>
    '<button type="button" role="option" data-bim-specialty="'+esc(option.value)+'" '+
    'aria-selected="'+(pptBimState.specialty===option.value)+'" '+
    'onclick="setBimPptSpecialty(this.dataset.bimSpecialty)">'+
    esc(option.label)+'</button>').join('');
}
function setBimPptIncludeTables(checked){
  if(pptBimState.profile!=='by-person'||pptBimState.busy||
    !$('#bim-ppt-back')?.classList.contains('open'))return;
  pptBimState.includeTables=!!checked;
  pptBimState.exportContent=pptBimState.includeTables?'ambos':'fotos';
  if(!pptBimState.includeTables&&pptBimState.specialty.startsWith('team:'))
    pptBimState.specialty='revit';
  closeBimPptPeopleMenu();
  closeBimPptSpecialtyMenu();
  pptBimRefreshItems();
}
/* Opciones de diagnóstico para separar el origen de un PPTX que pide reparar.
 * Solo afecta AREA_BIM2; AREA_BIM mantiene su exportación habitual. */
function setBimPptExportContent(value){
  if(pptBimState.profile!=='by-person'||pptBimState.busy||
     !pptBimState.includeTables||!['ambos','fotos','tablas'].includes(value))return;
  pptBimState.exportContent=value;
  updateBimPptSelectedCounter();
}
function pptBimIncludedExportItems(){
  const chosen=pptBimState.profile==='by-person'?pptBimSelectedPeople():null;
  const mode=pptBimState.profile==='by-person'&&pptBimState.includeTables
    ?pptBimState.exportContent:'fotos';
  return pptBimState.items.filter(item=>
    item.enabled&&(chosen===null||chosen.has(pptBimNormalizeOwner(item.owner)))&&
    (mode==='ambos'||(mode==='fotos'?!item.empty:!!item.empty)));
}
function pptBimRefreshModeInfo(){
  const special=pptBimState.profile==='by-person';
  document.querySelectorAll('[data-bim-ppt-mode]').forEach(button=>{
    // AREA_BIM mantiene Reunión; AREA_BIM2 añade exclusivamente Por semana.
    button.hidden=button.dataset.bimPptMode!=='reunion'&&
      (!special||button.dataset.bimPptMode!=='semana');
    button.setAttribute('aria-pressed',String(button.dataset.bimPptMode===pptBimState.mode));
    button.disabled=pptBimState.busy;
  });
  const sectorSelect=$('#bim-ppt-sector-filter');
  if(sectorSelect){
    sectorSelect.value=pptBimState.sectorFilter;
    sectorSelect.disabled=pptBimState.busy;
  }
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
  const tablesToggle=$('#bim-ppt-tables-toggle'),tablesCheck=$('#bim-ppt-include-tables');
  const contentPicker=$('#bim-ppt-export-content-wrap'),contentSelect=$('#bim-ppt-export-content');
  if(contentPicker)contentPicker.hidden=!special||!pptBimState.includeTables;
  if(contentSelect){
    contentSelect.value=pptBimState.exportContent||'fotos';
    contentSelect.disabled=pptBimState.busy;
  }
  if(tablesToggle)tablesToggle.hidden=!special;
  if(tablesCheck){
    tablesCheck.checked=special&&pptBimState.includeTables;
    tablesCheck.disabled=pptBimState.busy;
  }
  if(specialtyPicker)specialtyPicker.hidden=!special;
  if(specialtyTrigger)specialtyTrigger.disabled=pptBimState.busy;
  if(special){
    pptBimRenderSpecialties();
    const specialtyLabel=$('#bim-ppt-specialty-label');
    if(specialtyLabel)specialtyLabel.textContent=pptBimSpecialtyName(pptBimState.specialty);
    document.querySelectorAll('[data-bim-specialty]').forEach(option=>{
      option.setAttribute('aria-selected',String(option.dataset.bimSpecialty===pptBimState.specialty));
      option.disabled=pptBimState.busy;
    });
  }else closeBimPptSpecialtyMenu();
  pptBimRenderPeoplePicker();
  const note=$('#bim-ppt-design-note');
  if(note)note.innerHTML=special
    ?'Perfil AREA_BIM2: fotos en grupos de tres ordenadas por persona y sector. Marca Añadir tablas para incluir actividades sin capturas al final y activar disciplinas con registros solo tabulares, como GIS. Se conservan los filtros de semana, sector, disciplina, paquete y colaborador.'
    :'Diseño basado en la plantilla de reunión semanal: cabeceras rojas, tres columnas y descripciones inferiores. Los títulos se obtienen del <strong>paquete de trabajo</strong>. Puedes corregir la descripción de cada fotografía antes de exportar. Se respetan los filtros de sector, paquete, disciplina y colaborador.';
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
  if(label){
    const photos=items.filter(x=>!x.empty).length;
    const activities=new Set(items.map(x=>x.taskId)).size;
    label.textContent='Semana '+pptBimState.week.replace('-W',' · ')+
      ' · '+(special?activities+' actividades · '+photos+' fotografías':photos+' fotografía'+(photos!==1?'s':''))+
      ' · '+new Set(items.map(pptBimGroupName)).size+(special?' responsable(s)':' paquete(s)');
  }
  const description=$('#bim-ppt-mode-note');
  const manualRangeUI=$('#bim-ppt-meeting-range');
  const reunion=pptBimState.mode==='reunion';
  if(description)description.hidden=reunion;
  if(manualRangeUI)manualRangeUI.hidden=!reunion;
  if(reunion){
    const period=pptBimMeetingReportPeriod(pptBimState.week,pptBimState.meetingDay,pptBimState.manualMeetingRange);
    const caption=$('#bim-ppt-meeting-range-caption');
    if(caption){
      const fullCaption=period
        ?'Reunión '+PPT_BIM_MEETING_DAYS[pptBimState.meetingDay]+' '+dateDisplay(period.meeting)+
          ' · Fotografías cargadas (Perú):':'No se pudo calcular la reunión';
      caption.textContent=period&&special
        ?'Reunión '+PPT_BIM_MEETING_DAYS[pptBimState.meetingDay].slice(0,3)+'. '+
          dateDisplay(period.meeting)+' · Fotos (PE):':fullCaption;
      caption.title=fullCaption;
    }
    for(const [key,id] of [['start','bim-ppt-date-start'],['end','bim-ppt-date-end']]){
      const input=$('#'+id);
      if(input){input.value=period?.[key]||'';input.disabled=pptBimState.busy;}
    }
    const reset=$('#bim-ppt-date-reset');
    if(reset){reset.hidden=!pptBimState.manualMeetingRange;reset.disabled=pptBimState.busy;}
  }
  if(!description)return;
  if(pptBimState.mode==='ingreso'){
    description.textContent='Ingreso: fotografías cargadas durante la semana ISO seleccionada (hora de Perú).';
  }else if(pptBimState.mode==='semana'){
    const ingreso=pptBimState.weekFilters.ingreso,culminacion=pptBimState.weekFilters.culminacion;
    description.textContent='SEM'+Number(pptBimState.week.slice(-2))+' · '+
      (ingreso&&culminacion?
        'Ingreso O Culminación: fotos de ingreso o tareas completadas esta semana, sin duplicados. Las actividades sin fotos van en la tabla final.':
        ingreso?'Solo ingreso: fotos cargadas esta semana; actividades sin fotos en tabla final.':
        'Solo culminación: fotos de tareas completadas esta semana; actividades sin fotos en tabla final.');
  }else{
    description.textContent='Culminación: fotografías de actividades completadas durante esta semana; no implica que la foto se haya tomado ese día.';
  }
}
function pptBimRefreshItems(mode=pptBimState.mode){
  // Conservar descripciones y casillas por fotografía al cambiar día o criterio.
  for(const item of pptBimState.items)
    pptBimState.drafts.set(pptBimPhotoKey(item),{caption:item.caption,enabled:item.enabled});
  const allItems=pptBimItemsForWeek(pptBimState.week,mode,pptBimState.meetingDay,
    pptBimState.profile==='by-person'?pptBimState.specialty:null,
    pptBimState.weekFilters,pptBimState.sectorFilter,pptBimState.manualMeetingRange,
    pptBimState.profile==='by-person'&&pptBimState.includeTables);
  pptBimState.ownerCandidates=pptBimState.profile==='by-person'?allItems:[];
  const selected=pptBimState.profile==='by-person'?pptBimSelectedPeople():null;
  const items=selected===null?allItems:allItems.filter(item=>
    selected.has(pptBimNormalizeOwner(item.owner)));
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
function setBimPptMeetingRange(field,value){
  if(pptBimState.busy||pptBimState.mode!=='reunion'||
    !$('#bim-ppt-back')?.classList.contains('open')||!['start','end'].includes(field))return;
  const automatic=pptBimMeetingPeriod(pptBimState.week,pptBimState.meetingDay);
  const current=pptBimMeetingReportPeriod(
    pptBimState.week,pptBimState.meetingDay,pptBimState.manualMeetingRange);
  if(!automatic||!current)return;
  const next={start:current.start,end:current.end,[field]:value};
  if(!pptBimValidRangeDate(next.start)||!pptBimValidRangeDate(next.end)||
    next.start>next.end){
    toast('Selecciona un rango válido: Desde no puede ser posterior a Hasta.');
    pptBimRefreshModeInfo();
    return;
  }
  pptBimState.manualMeetingRange=next.start===automatic.start&&next.end===automatic.end?null:next;
  pptBimRefreshItems();
}
function resetBimPptMeetingRange(){
  if(pptBimState.busy||pptBimState.mode!=='reunion'||
    !$('#bim-ppt-back')?.classList.contains('open')||!pptBimState.manualMeetingRange)return;
  pptBimState.manualMeetingRange=null;
  pptBimRefreshItems();
}
function setBimPptSector(value){
  if(pptBimState.busy||!$('#bim-ppt-back')?.classList.contains('open')||
    !['','Sector 1','Sector 2','Sector 3','Sin sector'].includes(value))return;
  if(value===pptBimState.sectorFilter)return;
  pptBimState.sectorFilter=value;
  pptBimRefreshItems();
}
function setBimPptMode(mode){
  if(pptBimState.profile!=='by-person'&&mode!=='reunion')return;
  if(pptBimState.busy||!['reunion','semana'].includes(mode)||
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
  pptBimState.manualMeetingRange=null;
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
    !$('#bim-ppt-back')?.classList.contains('open')||
    !['revit','civil',...pptBimTableSpecialties().map(opt=>opt.value)].includes(value))return;
  if(value!==pptBimState.specialty){
    closeBimPptPeopleMenu();
    pptBimState.specialty=value;
    pptBimRefreshItems();
  }
  closeBimPptSpecialtyMenu(true);
}
document.addEventListener('click',event=>{
  if(!event.target.closest('#bim-ppt-day-picker'))closeBimPptMeetingMenu();
  if(!event.target.closest('#bim-ppt-specialty-picker'))closeBimPptSpecialtyMenu();
  if(!event.target.closest('#bim-ppt-people-picker')&&!event.target.closest('#bim-ppt-people-menu'))closeBimPptPeopleMenu();
});
window.addEventListener('resize',()=>{
  if(!$('#bim-ppt-people-menu')?.hidden)positionBimPptPeopleMenu();
});
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('#bim-ppt-back .bim-ppt-toolbar')?.addEventListener('scroll',()=>{
    if(!$('#bim-ppt-people-menu')?.hidden)positionBimPptPeopleMenu();
  });
});
document.addEventListener('change',event=>{
  const check=event.target.closest('[data-bim-ppt-person]');
  if(check)setBimPptPerson(check.value,check.checked);
});
function setBimPptMeetingDay(value){
  if(pptBimState.busy||!$('#bim-ppt-back')?.classList.contains('open'))return;
  const day=Number(value);
  if(!Number.isInteger(day)||day<1||day>7)return;
  if(day===pptBimState.meetingDay){closeBimPptMeetingMenu(true);return}
  pptBimState.meetingDay=day;
  pptBimState.manualMeetingRange=null;
  try{localStorage.setItem(PPT_BIM_MEETING_DAY_KEY,String(day))}catch(e){}
  pptBimRefreshItems();
  closeBimPptMeetingMenu(true);
}
function openBimPptExport(){
  if(currentView!=='weekly'){toast('Ingresa a Control Semanal para exportar el informe.');return}
  // Las actividades sin imágenes de AREA_BIM2 pueden previsualizarse incluso sin Storage.
  const profile=typeof bimExportProfile!=='undefined'&&bimExportProfile==='by-person'
    ?'by-person':'standard';
  if(profile!=='by-person'&&(!window.bimEvidenceCloud||!window.bimEvidenceCloud.ready())){
    toast('Supabase Storage no está disponible. Comprueba la conexión.');return;
  }
  const meetingDay=pptBimSavedMeetingDay();
  const specialty='revit';
  const items=pptBimItemsForWeek(selectedWeek,'reunion',meetingDay,
    profile==='by-person'?specialty:null,null,'',null,false);
  pptBimState={items:items.map(x=>({...x,enabled:true})),
    week:selectedWeek,mode:'reunion',meetingDay,profile,specialty,includeTables:false,exportContent:'fotos',sectorFilter:'',
    manualMeetingRange:null,weekFilters:{ingreso:true,culminacion:true},
    selectedOwners:{revit:null,civil:null},
    ownerCandidates:profile==='by-person'?items:[],
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
  closeBimPptPeopleMenu();
  $('#bim-ppt-back').classList.remove('open');
  document.body.style.overflow='';
  pptBimState.token++;
  pptBimState.items=[];
}
function renderBimPptExport(){
  const area=$('#bim-ppt-list');
  if(!area)return;
  const byPerson=pptBimState.profile==='by-person';
  const groups=new Map();
  pptBimState.items.forEach((item,index)=>{
    const key=byPerson&&item.empty?'__missing_activities__':pptBimGroupName(item);
    if(!groups.has(key))groups.set(key,[]);
    groups.get(key).push({x:item,index});
  });
  area.innerHTML=pptBimState.items.length?[...groups].map(([name,group])=>{
    const missing=byPerson&&name==='__missing_activities__';
    const photoCount=group.filter(({x})=>!x.empty).length;
    const taskCount=new Set(group.map(({x})=>x.taskId)).size;
    if(missing){
      // Las tareas sin foto nunca se simulan como imágenes: se exportan como tabla.
      const rows=group.map(({x,index})=>
        '<tr><td class="bim-ppt-missing-check"><input type="checkbox" data-bim-ppt-check="'+index+'"'+
        (x.enabled?' checked':'')+' aria-label="Incluir '+esc(x.taskId)+'"></td>'+
        '<td class="bim-ppt-missing-code">'+esc(x.taskId)+'</td>'+
        '<td><textarea rows="2" maxlength="240" id="bim-ppt-caption-'+index+
        '" data-bim-ppt-caption="'+index+'" aria-label="Descripción de '+esc(x.taskId)+'">'+
        esc(x.caption)+'</textarea></td>'+
        '<td>'+esc(x.owner||'Sin responsable')+'</td>'+
        '<td>'+esc(pptBimSector(x))+'</td>'+
        '<td>'+esc(x.team||'Sin disciplina')+'</td>'+
        '<td>'+esc(x.package||'Sin paquete')+'</td>'+
        '<td>'+esc(x.status||'Sin estado')+'</td></tr>').join('');
      return '<section class="bim-ppt-group bim-ppt-missing-group"><h3>ACTIVIDADES SIN CAPTURAS'+
        ' <span>'+taskCount+' actividad'+(taskCount===1?'':'es')+' · tabla para PPTX</span></h3>'+
        '<div class="bim-ppt-missing-table-wrap"><table class="bim-ppt-missing-table">'+
        '<thead><tr><th>Incluir</th><th>Código BIM</th><th>Actividad / descripción</th>'+
        '<th>Responsable</th><th>Sector</th><th>Disciplina</th><th>Paquete</th><th>Estado</th></tr></thead>'+
        '<tbody>'+rows+'</tbody></table></div></section>';
    }
    const countLabel=byPerson
      ?taskCount+' actividad'+(taskCount===1?'':'es')+' · '+photoCount+' foto'+(photoCount===1?'':'s')
      :photoCount+' fotografía(s)';
    return '<section class="bim-ppt-group"><h3>'+esc(name)+
      ' <span>'+countLabel+'</span></h3><div class="bim-ppt-items">'+
      group.map(({x,index})=>
        '<article class="bim-ppt-item">'+
        '<div class="bim-ppt-item-title"><label><input type="checkbox" data-bim-ppt-check="'+index+'"'+
        (x.enabled?' checked':'')+'> Incluir</label>'+
        '<label class="bim-ppt-caption-label" for="bim-ppt-caption-'+index+'">Descripción para el PPT</label>'+
        '<span>'+esc(x.taskId)+' · '+esc(x.team||'Disciplina sin especificar')+
        ' · Foto '+x.photoIndex+' de '+x.photoCount+'</span></div>'+
        '<button type="button" class="bim-ppt-thumb" data-bim-ppt-thumb="'+index+'"'+
        ' aria-label="Ver fotografía '+(index+1)+' en pantalla completa" title="Ampliar fotografía">Vista previa</button>'+
        '<div class="bim-ppt-fields">'+
        '<textarea id="bim-ppt-caption-'+index+'" data-bim-ppt-caption="'+index+'" maxlength="240" rows="2">'+
        esc(x.caption)+'</textarea></div></article>').join('')+
      '</div></section>';
  }).join(''):
    '<p class="bim-ppt-empty">'+
      (byPerson&&pptBimSelectedPeople()?.size===0?
        'No hay colaboradores marcados. Abre Personal y selecciona al menos uno.':
        (byPerson?'No hay actividades con los filtros seleccionados.':
          'No hay fotografías para la semana y el criterio seleccionados. Puedes cambiar el criterio arriba.'))+
    '</p>';
  updateBimPptSelectedCounter();
}
function updateBimPptSelectedCounter(){
  pptBimRefreshModeInfo();
  const included=pptBimIncludedExportItems();
  const target=$('#bim-ppt-selection');
  if(target){
    const labels=included.map(pptBimGroupName);
    const isPerson=pptBimState.profile==='by-person';
    if(isPerson){
      const photos=included.filter(x=>!x.empty).length;
      const tables=included.filter(x=>x.empty).length;
      target.textContent=new Set(included.map(x=>x.taskId)).size+' actividades · '+
        photos+' fotos · '+tables+' filas de tabla · '+
        new Set(labels).size+' responsables';
    }else{
      target.textContent=included.length+' imágenes · '+new Set(labels).size+
        ' paquetes · '+
        included.reduce((n,x,i)=>n+(i===0||labels[i-1]!==labels[i]?1:0),0)+' grupos';
    }
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
    if(!el||item.empty)continue;
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
function pptBimCover(pptx,week,groups,imageCount,meetingPeriod=null,byPerson=false,activityCount=0){
  const slide=pptx.addSlide();
  pptBimMaster(slide,pptx);
  const S=pptx.ShapeType;
  pptBimAddText(slide,byPerson?'REPORTE SEMANAL DE ACTIVIDADES BIM':'REPORTE FOTOGRÁFICO BIM',
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
  pptBimAddText(slide,(byPerson?'RESPONSABLES: ':'PAQUETES: ')+groups+
    (byPerson?'     ACTIVIDADES: '+activityCount:'')+'     FOTOGRAFÍAS: '+imageCount,
    {x:.55,y:4.11,w:12,h:.55,fontSize:18,color:'172B49',bold:true});
  pptBimAddText(slide,'Descripciones basadas en las tareas registradas y revisadas antes de exportar.',
    {x:.55,y:5.43,w:12.15,h:.44,fontSize:12,color:'626B78'});
  slide.addShape(S.rect,{x:0,y:6.79,w:4.12,h:.35,fill:{color:'FF0000'},line:{color:'FF0000'}});
  pptBimAddText(slide,'ÁREA BIM · S&P',{x:.45,y:6.87,w:3.4,h:.16,
    fontSize:10,color:'FFFFFF',bold:true,align:'center'});
}
/* AREA_BIM2: ordenar por persona y sector; completar SIEMPRE tres fotos
 * por diapositiva mientras queden fotografías. Solo la última puede tener
 * una o dos. Las tareas sin foto van después, en tablas independientes.
 * AREA_BIM conserva el empaquetado anterior. */
function pptBimPackSlides(items,byPerson=false){
  if(byPerson){
    const photos=items.filter(item=>!item.empty);
    const sectorRank=name=>['Sector 1','Sector 2','Sector 3','Sin sector'].indexOf(name);
    photos.sort((a,b)=>
      pptBimNormalizeOwner(a.owner).localeCompare(pptBimNormalizeOwner(b.owner),'es',{numeric:true})||
      sectorRank(pptBimSector(a))-sectorRank(pptBimSector(b))||
      (a.package||'').localeCompare(b.package||'','es',{numeric:true})||
      a.taskId.localeCompare(b.taskId,'es',{numeric:true})||
      String(a.id).localeCompare(String(b.id),'es',{numeric:true}));
    const pages=[];
    for(let i=0;i<photos.length;i+=3)pages.push(photos.slice(i,i+3));
    return pages;
  }
  const sectorGroups=new Map();
  for(const photo of items){
    const sector=pptBimSector(photo);
    if(!sectorGroups.has(sector))sectorGroups.set(sector,[]);
    sectorGroups.get(sector).push(photo);
  }
  const ordered=[];
  for(const sector of ['Sector 1','Sector 2','Sector 3','Sin sector']){
    const group=sectorGroups.get(sector);
    if(group?.length)ordered.push(...pptBimOrderSectorPhotos(group,byPerson));
  }
  const pages=[];
  for(let index=0;index<ordered.length;index+=3)
    pages.push(ordered.slice(index,index+3));
  return pages;
}
function pptBimOrderSectorPhotos(items,byPerson=false){
  const groups=new Map();
  for(const item of items){
    const key=String(byPerson?(item.owner||'Sin responsable'):(item.package||'Sin paquete'));
    if(!groups.has(key))groups.set(key,[]);
    groups.get(key).push(item);
  }
  if(!byPerson)return [...groups.values()].flat();
  // AREA_BIM2: conservar completos los tríos de una misma persona primero.
  const prioritized=[...groups.entries()].sort((a,b)=>
    b[1].length-a[1].length||a[0].localeCompare(b[0],'es',{numeric:true}));
  const full=[],pairs=[],singles=[];
  for(const [,photos] of prioritized){
    let i=0;
    while(i+3<=photos.length){
      full.push(...photos.slice(i,i+3));
      i+=3;
    }
    if(photos.length-i===2)pairs.push(photos.slice(i));
    else if(photos.length-i===1)singles.push(photos[i]);
  }
  // Agrupar las parejas con una evidencia individual cuando se pueda.
  while(pairs.length&&singles.length)
    full.push(...pairs.shift(),singles.shift());
  return [...full,...pairs.flat(),...singles];
}
function pptBimEvidenceSlide(pptx,week,entries,byPerson=false){
  if(!Array.isArray(entries)||entries.length<1||entries.length>3)
    throw new Error('Cada diapositiva requiere entre 1 y 3 fotografías.');
  if(entries.some(item=>item.empty))
    throw new Error('Las actividades sin fotografía deben exportarse como tabla, no como imagen.');
  const S=pptx.ShapeType,slide=pptx.addSlide();
  pptBimMaster(slide,pptx);
  pptBimAddText(slide,'EVIDENCIAS BIM · SEMANA '+week.split('-W')[1],
    {x:.37,y:.80,w:11.9,h:.29,fontSize:18,bold:true});
  // La cuadrícula conserva tres posiciones fijas; solo las columnas con
  // fotografía dibujan bordes, sector, encabezado y descripción.
  // Las posiciones restantes quedan completamente blancas y sin líneas.
  const start=.28,totalWidth=12.801,top=1.13,redH=.673,picH=3.746,captionH=.961;
  const sectorH=.21,packageH=redH-sectorH;
  const gap=.015,slotWidth=(totalWidth-gap*2)/3;
  for(let k=0;k<entries.length;k++){
    const e=entries[k],x=start+k*(slotWidth+gap),w=slotWidth;
    slide.addShape(S.rect,{x,y:top,w,h:sectorH,
      fill:{color:'E9EFF5'},line:{color:'000000',width:.8}});
    slide.addShape(S.rect,{x,y:top+sectorH,w,h:packageH,
      fill:{color:'C00000'},line:{color:'000000',width:.8}});
    pptBimAddText(slide,pptBimSector(e).toUpperCase(),
      {x:x+.10,y:top+.045,w:w-.20,h:.12,fontSize:10,bold:true,
        color:'172B49',align:'center',fit:'shrink'});
    // AREA_BIM muestra paquete; AREA_BIM2 mantiene responsable.
    pptBimAddText(slide,String(byPerson?(e.owner||'Sin responsable'):(e.package||'Sin paquete')).toUpperCase(),
      {x:x+.10,y:top+sectorH+.072,w:w-.20,h:.31,fontSize:16,bold:true,
        color:'FFFFFF',align:'center',fit:'shrink'});
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
      (e.team?' · '+e.team:'')+
      ' · Foto '+e.photoIndex+' de '+e.photoCount,
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
/* AREA_BIM2: actividades sin fotografías en cuadrículas editables de PowerPoint.
 * Se ordenan por responsable y sector, se deduplican por código y se paginan
 * sin mezclar con la cuadrícula de tres evidencias fotográficas. */
function pptBimMissingActivitySlides(pptx,week,items){
  const unique=new Map();
  for(const item of items){
    if(item.empty&&!unique.has(item.taskId))unique.set(item.taskId,item);
  }
  if(!unique.size)return 0;
  const entries=[...unique.values()];
  const sectorOrder=sector=>['Sector 1','Sector 2','Sector 3','Sin sector'].indexOf(sector);
  entries.sort((a,b)=>
    pptBimNormalizeOwner(a.owner).localeCompare(pptBimNormalizeOwner(b.owner),'es',{numeric:true})||
    sectorOrder(pptBimSector(a))-sectorOrder(pptBimSector(b))||
    (a.package||'').localeCompare(b.package||'','es',{numeric:true})||
    a.taskId.localeCompare(b.taskId,'es',{numeric:true}));
  // El ancho combinado de las siete columnas es 12.78 pulgadas (plantilla 16:9).
  const widths=[1.05,4.29,2.18,1.46,1.09,1.31,1.40];
  const headers=['CÓDIGO BIM','ACTIVIDAD','RESPONSABLE','DISCIPLINA','SECTOR','PAQUETE','ESTADO'];
  const tableY=1.54,headerH=.45,maxY=6.61;
  const rowHeight=item=>{
    const chars=String(item.caption||item.title||'').length;
    const lines=Math.max(1,Math.ceil(chars/48));
    const ownerLines=Math.ceil(String(item.owner||'').length/28);
    return Math.min(1.32,Math.max(.61,.57+Math.max(0,lines-2)*.17+
      (ownerLines>2?.1:0)));
  };
  const pages=[];
  let page=[],height=headerH;
  for(const item of entries){
    const h=rowHeight(item);
    if(page.length&&tableY+height+h>maxY){
      pages.push(page);page=[];height=headerH;
    }
    page.push({item,h});height+=h;
  }
  if(page.length)pages.push(page);
  pages.forEach((page,index)=>{
    const slide=pptx.addSlide();
    pptBimMaster(slide,pptx);
    pptBimAddText(slide,'ACTIVIDADES SIN EVIDENCIA FOTOGRÁFICA · SEMANA '+week.split('-W')[1],
      {x:.37,y:.79,w:12.55,h:.30,fontSize:16.6,bold:true});
    pptBimAddText(slide,'Registros sin capturas en el período seleccionado · Ordenados por responsable y sector',
      {x:.38,y:1.18,w:12.4,h:.20,fontSize:10,color:'626B78'});
    // Renderizar la tabla como celdas y textos editables. PptxGenJS 4.0.0
    // produce estructuras OOXML de tabla nativa que provocan reparación en
    // determinadas instalaciones de PowerPoint, aunque el ZIP/XML sea legible.
    // Los rectángulos + textos no requieren a:graphicFrame/a:tbl.
    const rows=[headers,...page.map(({item})=>[
      item.taskId,String(item.caption||item.title||'').replace(/\s+/g,' ').trim(),
      item.owner||'Sin responsable',item.team||'Sin disciplina',
      pptBimSector(item),item.package||'Sin paquete',item.status||'Sin estado'
    ])];
    let y=tableY;
    for(let rowIndex=0;rowIndex<rows.length;rowIndex++){
      const h=rowIndex===0?headerH:page[rowIndex-1].h;
      let x=.28;
      const header=rowIndex===0;
      const background=header?'C00000':(rowIndex%2===0?'F1F4F8':'FFFFFF');
      for(let col=0;col<widths.length;col++){
        const w=widths[col];
        slide.addShape(pptx.ShapeType.rect,{
          x,y,w,h,fill:{color:background},
          line:{color:'BFC5CE',width:.55}
        });
        pptBimAddText(slide,String(rows[rowIndex][col]||''),{
          x:x+.06,y:y+.06,w:w-.12,h:Math.max(.20,h-.12),
          fontFace:'Arial',fontSize:header?9.2:col===1?10.4:col===2?9.8:9.3,
          color:header?'FFFFFF':'172B49',
          bold:header||col===0,align:!header&&col===1?'left':'center',
          valign:'mid',fit:'shrink'
        });
        x+=w;
      }
      y+=h;
    }
    pptBimAddText(slide,'ACTIVIDADES SIN CAPTURAS · '+entries.length+' REGISTROS · '+
      (index+1)+' / '+pages.length,
      {x:.32,y:6.75,w:12.5,h:.19,fontSize:9,color:'5A5A5A'});
  });
  return pages.length;
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
  const included=pptBimIncludedExportItems();
  if(!included.length){toast('Selecciona al menos una actividad o fotografía.');return}
  const photoCount=included.filter(x=>!x.empty).length;
  if(photoCount&&!window.bimEvidenceCloud?.ready()){
    toast('No hay conexión con Supabase Storage.');return;
  }
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
    pptBimCover(pptx,pptBimState.week,groups.size,photoCount,
      pptBimState.mode==='reunion'
        ?pptBimMeetingReportPeriod(pptBimState.week,pptBimState.meetingDay,pptBimState.manualMeetingRange):null,
      byPerson,new Set(included.map(item=>item.taskId)).size);
    const decoded=[];
    let processedPhotos=0;
    for(const item of included){
      if(runToken!==pptBimState.token)throw new Error('La exportación fue interrumpida');
      if(item.empty){
        decoded.push({...item});
        continue;
      }
      const blob=await window.bimEvidenceCloud.download(item.path);
      const loaded=await pptBimDecodeImage(blob);
      decoded.push({...item,...loaded});
      processedPhotos++;
      if(status)status.textContent='Preparando imágenes '+processedPhotos+' de '+photoCount+'…';
    }
    // AREA_BIM2: fotos en tres columnas completas; al final, tablas por actividad.
    const pages=pptBimPackSlides(decoded,byPerson);
    for(const entries of pages)pptBimEvidenceSlide(pptx,pptBimState.week,entries,byPerson);
    const tableSlides=byPerson?pptBimMissingActivitySlides(pptx,pptBimState.week,decoded):0;
    if(status)status.textContent='Generando PPTX editable…';
    const totalSlides=1+pages.length+tableSlides;
    const generated=await pptx.write({outputType:'blob',compression:true});
    let blob=generated instanceof Blob?generated:new Blob([generated],
      {type:'application/vnd.openxmlformats-officedocument.presentationml.presentation'});
    if(status)status.textContent='Verificando estructura de las diapositivas…';
    blob=await pptBimRepairShapeIdentifiers(blob);
    if(status)status.textContent='Validando integridad del archivo PowerPoint…';
    await pptBimValidateBlob(blob,totalSlides,photoCount);
    const suffix=byPerson?'_'+pptBimSpecialtyName(pptBimState.specialty)
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[^A-Za-z0-9_-]/g,'')+
      '_'+(pptBimState.includeTables
        ?{ambos:'Completo',fotos:'SoloFotos',tablas:'SoloTablas'}[pptBimState.exportContent]
        :'SoloFotos'):'';
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
