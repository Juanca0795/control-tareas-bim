/* Evidencias BIM (jpg/png/webp): archivo en Storage, metadatos ligeros en catalogs JSONB. */
const BIM_EVIDENCE_MAX=6, BIM_EVIDENCE_BYTES=5*1024*1024;
const BIM_EVIDENCE_TYPES=new Set(['image/jpeg','image/png','image/webp']);
function normalizeEvidenceByTask(input){
  const out={};
  if(!input||typeof input!=='object'||Array.isArray(input))return out;
  for(const [taskId,records] of Object.entries(input)){
    if(!/^BIM-[A-Za-z0-9_-]{1,64}$/.test(taskId)||!Array.isArray(records))continue;
    const map=new Map();
    for(const x of records){
      if(!x||typeof x!=='object')continue;
      const id=String(x.id||''),path=String(x.path||''),mime=String(x.mime||'');
      if(!/^[a-zA-Z0-9_-]{6,96}$/.test(id)||
         !/^bim-tasks\/BIM-[A-Za-z0-9_-]{1,64}\/[a-zA-Z0-9_-]{6,96}\.(jpg|png|webp)$/.test(path)||
         !path.startsWith('bim-tasks/'+taskId+'/')||
         !BIM_EVIDENCE_TYPES.has(mime))continue;
      const entry={id,path,mime,name:String(x.name||'Imagen').slice(0,120),
        addedAt:String(x.addedAt||''),updatedAt:String(x.updatedAt||x.addedAt||''),
        deletedAt:String(x.deletedAt||'')};
      if(!map.has(id)||entry.updatedAt>=map.get(id).updatedAt)map.set(id,entry);
    }
    if(map.size)out[taskId]=[...map.values()].sort((a,b)=>a.addedAt.localeCompare(b.addedAt));
  }
  return out;
}
function mergeEvidenceByTask(remote,local){
  const a=normalizeEvidenceByTask(remote),b=normalizeEvidenceByTask(local),out={};
  for(const task of new Set([...Object.keys(a),...Object.keys(b)])){
    const entries=new Map((a[task]||[]).map(e=>[e.id,e]));
    for(const item of b[task]||[]){
      const old=entries.get(item.id);
      if(!old||item.updatedAt>old.updatedAt)entries.set(item.id,item);
    }
    if(entries.size)out[task]=[...entries.values()].sort((x,y)=>x.addedAt.localeCompare(y.addedAt));
  }
  return out;
}
function taskEvidenceRecords(id){return (catalogs.evidenceByTask?.[id]||[]).filter(r=>!r.deletedAt)}
function taskEvidenceBadge(id){
  const count=taskEvidenceRecords(id).length;
  if(!count)return '';
  return '<span class="bim-photo-badge" title="'+count+' foto'+(count===1?'':'s')+
    ' vinculada'+(count===1?'':'s')+'" aria-label="'+count+' fotos adjuntas">'+
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+
    '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.4"/>'+
    '<path d="m4 17 5-5 3 3 3-4 5 6"/></svg><b>'+count+'</b></span>';
}
let bimEvidenceEditor={taskId:'',existing:[],pending:[],removed:new Set(),busy:false,token:0};
const bimEvidenceSigned=new Map();
function startEvidenceEditor(t){
  cleanupEvidenceEditor();
  // Signed URLs caducan: volver a solicitarlas al reabrir el formulario.
  bimEvidenceSigned.clear();
  bimEvidenceEditor={taskId:t?.id||'',existing:t?taskEvidenceRecords(t.id).map(x=>({...x})):[],
    pending:[],removed:new Set(),busy:false,token:bimEvidenceEditor.token+1};
  renderEvidenceEditor();
}
function cleanupEvidenceEditor(){
  for(const entry of bimEvidenceEditor.pending||[])try{URL.revokeObjectURL(entry.preview)}catch(e){}
  bimEvidenceEditor.pending=[];
  bimEvidenceEditor.removed.clear();
}
function visibleEvidenceCount(){
  return bimEvidenceEditor.pending.length+
    bimEvidenceEditor.existing.filter(x=>!bimEvidenceEditor.removed.has(x.id)).length;
}
function renderEvidenceEditor(){
  const list=document.getElementById('bim-evidence-list'),status=document.getElementById('bim-evidence-status');
  if(!list||!status)return;
  const active=bimEvidenceEditor.existing.filter(x=>!bimEvidenceEditor.removed.has(x.id));
  const photoCard=(item,newItem)=>{
    const preview=newItem?item.preview:bimEvidenceSigned.get(item.path)||'';
    return '<article class="bim-evidence-item">'+
      '<button type="button" class="bim-evidence-thumb" data-bim-evidence-zoom="'+esc(item.id)+'"'+
      ' aria-label="Ampliar fotografía '+esc(item.name)+'" title="Ver fotografía en pantalla completa">'+
      (preview?'<img src="'+esc(preview)+'" alt="Vista previa de '+esc(item.name)+'" loading="lazy">':
       '<span class="bim-evidence-wait" data-evidence-preview="'+esc(item.id)+'">Cargando…</span>')+
      '</button><div class="bim-evidence-meta"><span title="'+esc(item.name)+'">'+esc(item.name)+'</span>'+
      (newItem?'<small>Por guardar</small>':'<small>Guardada en Supabase</small>')+'</div>'+
      '<button type="button" class="bim-evidence-remove" data-evidence-remove="'+esc(item.id)+'"'+
      ' aria-label="Quitar '+esc(item.name)+'" '+(bimEvidenceEditor.busy?'disabled':'')+'>×</button></article>';
  };
  list.innerHTML=active.map(x=>photoCard(x,false)).concat(bimEvidenceEditor.pending.map(x=>photoCard(x,true))).join('')||
    '<p class="bim-evidence-empty">Todavía no hay imágenes. Es opcional.</p>';
  status.textContent=visibleEvidenceCount()+' de '+BIM_EVIDENCE_MAX+' fotografías';
  const zone=document.getElementById('bim-evidence-drop');
  if(zone)zone.classList.toggle('is-full',visibleEvidenceCount()>=BIM_EVIDENCE_MAX);
  if(active.length)loadEvidencePreviews(active,bimEvidenceEditor.token);
  // Badge del tab: refleja imágenes existentes, pegadas y removidas al instante.
  if(typeof updateBimEditorPhotoCount==='function')updateBimEditorPhotoCount();
}
async function loadEvidencePreviews(records,token){
  if(!window.bimEvidenceCloud)return;
  for(const entry of records){
    if(bimEvidenceSigned.has(entry.path))continue;
    try{
      const url=await window.bimEvidenceCloud.url(entry.path);
      if(token!==bimEvidenceEditor.token)return;
      bimEvidenceSigned.set(entry.path,url);
      const placeholder=[...document.querySelectorAll('[data-evidence-preview]')]
        .find(e=>e.dataset.evidencePreview===entry.id);
      if(placeholder){
        const img=document.createElement('img');
        img.src=url;img.alt='Vista previa de '+entry.name;img.loading='lazy';
        placeholder.replaceWith(img);
      }
    }catch(err){
      const placeholder=[...document.querySelectorAll('[data-evidence-preview]')]
        .find(e=>e.dataset.evidencePreview===entry.id);
      if(placeholder)placeholder.textContent='Sin vista previa';
      console.warn('No se pudo abrir la evidencia',err);
    }
  }
}
function addEvidenceFiles(files){
  if(!document.getElementById('modal-back')?.classList.contains('open')||bimEvidenceEditor.busy)return;
  for(const file of Array.from(files||[])){
    if(!BIM_EVIDENCE_TYPES.has(file.type)){
      toast('Solo se aceptan imágenes JPG, PNG o WEBP.');continue;
    }
    if(file.size>BIM_EVIDENCE_BYTES||!file.size){
      toast('La imagen debe pesar como máximo 5 MB.');continue;
    }
    if(visibleEvidenceCount()>=BIM_EVIDENCE_MAX){
      toast('Máximo 6 fotografías por actividad.');break;
    }
    const id=(typeof crypto!=='undefined'&&crypto.randomUUID?
      crypto.randomUUID().replace(/-/g,''):Date.now().toString(36)+Math.random().toString(36).slice(2));
    bimEvidenceEditor.pending.push({
      id,file,preview:URL.createObjectURL(file),name:file.name||'Imagen pegada'
    });
  }
  renderEvidenceEditor();
}
function removeEvidenceFromEditor(id){
  if(bimEvidenceEditor.busy)return;
  const pending=bimEvidenceEditor.pending.find(p=>p.id===id);
  if(pending){
    URL.revokeObjectURL(pending.preview);
    bimEvidenceEditor.pending=bimEvidenceEditor.pending.filter(p=>p.id!==id);
  }else if(bimEvidenceEditor.existing.some(p=>p.id===id)){
    bimEvidenceEditor.removed.add(id);
  }
  renderEvidenceEditor();
}
// El visor funciona tanto para fotografías nuevas (blob: temporal) como
// para imágenes existentes (URL firmada de Supabase). No modifica el archivo.
let bimPhotoLightboxPreviousFocus=null;
function openBimPhotoLightbox(source,title='Fotografía BIM',trigger=null){
  const modal=document.getElementById('bim-photo-lightbox');
  const image=document.getElementById('bim-photo-lightbox-image');
  if(!modal||!image||!source)return;
  bimPhotoLightboxPreviousFocus=trigger||document.activeElement;
  image.src=source;
  image.alt=title;
  document.getElementById('bim-photo-lightbox-title').textContent=title;
  modal.hidden=false;
  document.getElementById('bim-photo-lightbox-close')?.focus();
}
function closeBimPhotoLightbox(){
  const modal=document.getElementById('bim-photo-lightbox');
  if(!modal||modal.hidden)return;
  modal.hidden=true;
  const image=document.getElementById('bim-photo-lightbox-image');
  if(image)image.removeAttribute('src');
  if(bimPhotoLightboxPreviousFocus?.isConnected)
    bimPhotoLightboxPreviousFocus.focus();
  bimPhotoLightboxPreviousFocus=null;
}
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&!document.getElementById('bim-photo-lightbox')?.hidden){
    event.preventDefault();
    event.stopImmediatePropagation();
    closeBimPhotoLightbox();
  }
},true);
document.addEventListener('click',event=>{
  const modal=document.getElementById('bim-photo-lightbox');
  if(modal&&!modal.hidden&&event.target===modal){
    closeBimPhotoLightbox();return;
  }
  const trigger=event.target.closest?.('[data-bim-evidence-zoom], [data-bim-ppt-thumb]');
  if(!trigger||modal?.hidden===false)return;
  const image=trigger.querySelector('img');
  if(!image?.src)return; // La miniatura aún está cargando.
  event.preventDefault();
  openBimPhotoLightbox(image.currentSrc||image.src,image.alt||'Fotografía BIM',trigger);
});
document.addEventListener('paste',event=>{
  if(!document.getElementById('modal-back')?.classList.contains('open'))return;
  const files=[...(event.clipboardData?.items||[])].filter(x=>x.kind==='file'&&x.type.startsWith('image/'))
    .map(x=>x.getAsFile()).filter(Boolean);
  if(!files.length)return;
  event.preventDefault();addEvidenceFiles(files);
});
document.addEventListener('click',event=>{
  const button=event.target.closest('[data-evidence-remove]');
  if(button){event.preventDefault();removeEvidenceFromEditor(button.dataset.evidenceRemove)}
});
function selectEvidenceFiles(){
  if(bimEvidenceEditor.busy)return;
  document.getElementById('bim-evidence-input')?.click();
}
function wireEvidenceControls(){
  const input=document.getElementById('bim-evidence-input');
  const drop=document.getElementById('bim-evidence-drop');
  if(!input||!drop)return;
  input.addEventListener('change',()=>{
    addEvidenceFiles(input.files);
    input.value='';
  });
  drop.addEventListener('dragover',event=>{event.preventDefault();drop.classList.add('is-over')});
  drop.addEventListener('dragleave',()=>drop.classList.remove('is-over'));
  drop.addEventListener('drop',event=>{
    event.preventDefault();drop.classList.remove('is-over');addEvidenceFiles(event.dataTransfer?.files);
  });
}
async function commitEvidenceEditor(taskId){
  if(bimEvidenceEditor.busy)throw Error('Espera a que finalice la carga de fotografías.');
  const added=bimEvidenceEditor.pending;
  if(!added.length&&!bimEvidenceEditor.removed.size)return;
  if(added.length&&(!window.bimEvidenceCloud||!window.bimEvidenceCloud.ready()))
    throw Error('Supabase Storage no está disponible. Configura el depósito bim-evidencias antes de añadir fotografías.');
  const prev=normalizeEvidenceByTask(catalogs.evidenceByTask||{});
  const now=new Date().toISOString();
  const uploaded=[];
  bimEvidenceEditor.busy=true;
  document.getElementById('save-button').disabled=true;
  try{
    for(const item of added){
      const ext=item.file.type==='image/jpeg'?'jpg':item.file.type==='image/png'?'png':'webp';
      const path='bim-tasks/'+taskId+'/'+item.id+'.'+ext;
      await window.bimEvidenceCloud.upload(path,item.file);
      uploaded.push({id:item.id,path,mime:item.file.type,name:item.name.slice(0,120),
        addedAt:now,updatedAt:now,deletedAt:''});
    }
    const current=prev[taskId]||[];
    const updated=current.map(x=>bimEvidenceEditor.removed.has(x.id)?
      {...x,deletedAt:now,updatedAt:now}:x);
    const merged=mergeEvidenceByTask(prev,{[taskId]:[...updated,...uploaded]});
    catalogs.evidenceByTask=merged;
  }catch(err){
    // No dejar una tarea con referencias a imágenes que no terminaron de subirse.
    if(uploaded.length&&window.bimEvidenceCloud?.remove){
      try{await window.bimEvidenceCloud.remove(uploaded.map(x=>x.path))}catch(e){console.warn('Limpieza de cargas incompletas:',e)}
    }
    throw err;
  }finally{
    bimEvidenceEditor.busy=false;
    document.getElementById('save-button').disabled=false;
  }
}
