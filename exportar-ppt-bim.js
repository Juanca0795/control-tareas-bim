/* Reporte BIM semanal: exportación PPTX de fotografías desde Supabase Storage.
 * Reconstruye en elementos editables el formato 16:9 de tres columnas de
 * PPT_Reunion_Semanal_020626.pptx (sin fotografías, textos ni etiquetas antiguas).
 * No usa IA ni inventa nombres de sectores, elementos o estados.
 */
// Versión probada para exportar PPTX OOXML válido (no usar el bundle 3.x anterior).
const PPT_BIM_VERSION='4.0.0';
const PPT_BIM_ZIP_VERSION='3.10.1';
let pptBimScriptPromise=null;
let pptBimState={items:[],week:'',busy:false,token:0};

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

function pptBimItemsForWeek(week){
  if(typeof weeklyFiltered!=='function')return [];
  const snapshot=weeklyFiltered(week);
  const current=new Map(tasks.map(t=>[t.id,t]));
  const out=[];
  for(const row of snapshot.rows){
    const task=current.get(row.id);
    if(!task)continue;
    for(const photo of taskEvidenceRecords(task.id)){
      out.push({
        id:photo.id,path:photo.path,taskId:task.id,
        package:row.package||task.package||'Sin paquete',
        team:row.team||task.team||'',owner:row.owner||task.owner||'',
        title:task.title||task.id,caption:task.title||task.id,
        name:photo.name||'Fotografía'
      });
    }
  }
  return out.sort((a,b)=>a.package.localeCompare(b.package,'es',{numeric:true})||
    a.taskId.localeCompare(b.taskId,'es',{numeric:true})||
    a.id.localeCompare(b.id));
}
function openBimPptExport(){
  if(currentView!=='weekly'){toast('Ingresa a Control Semanal para exportar el informe.');return}
  const items=pptBimItemsForWeek(selectedWeek);
  if(!items.length){
    toast('No hay fotografías guardadas en las actividades de esta semana y filtros.');
    return;
  }
  if(!window.bimEvidenceCloud||!window.bimEvidenceCloud.ready()){
    toast('Supabase Storage no está disponible. Comprueba la conexión.');return;
  }
  pptBimState={items:items.map(x=>({...x,enabled:true})),
    week:selectedWeek,busy:false,token:pptBimState.token+1};
  const label=$('#bim-ppt-week-label');
  if(label)label.textContent='Semana '+selectedWeek.replace('-W',' · ')+
    ' · '+items.length+' fotografía'+(items.length!==1?'s':'')+
    ' · '+new Set(items.map(x=>x.package)).size+' paquete(s)';
  renderBimPptExport();
  $('#bim-ppt-back').classList.add('open');
  document.body.style.overflow='hidden';
  // Las miniaturas se cargan con URLs firmadas, nunca con enlaces públicos.
  loadBimPptThumbnails(pptBimState.token);
}
function closeBimPptExport(){
  if(pptBimState.busy)return;
  $('#bim-ppt-back').classList.remove('open');
  document.body.style.overflow='';
  pptBimState.token++;
  pptBimState.items=[];
}
function renderBimPptExport(){
  const area=$('#bim-ppt-list');
  if(!area)return;
  const packages=new Map();
  pptBimState.items.forEach((x,index)=>{
    if(!packages.has(x.package))packages.set(x.package,[]);
    packages.get(x.package).push({x,index});
  });
  area.innerHTML=[...packages].map(([name,group])=>
    '<section class="bim-ppt-group"><h3>'+esc(name)+
    ' <span>'+group.length+' fotografía(s)</span></h3><div class="bim-ppt-items">'+
    group.map(({x,index})=>
      '<article class="bim-ppt-item">'+
      '<div class="bim-ppt-thumb" data-bim-ppt-thumb="'+index+'">Vista previa</div>'+
      '<div class="bim-ppt-fields">'+
      '<div class="bim-ppt-item-title"><label><input type="checkbox" data-bim-ppt-check="'+index+'"'+
      (x.enabled?' checked':'')+'> Incluir</label>'+
      '<span>'+esc(x.taskId)+' · '+esc(x.team||'Disciplina sin especificar')+'</span></div>'+
      '<label class="bim-ppt-caption-label" for="bim-ppt-caption-'+index+'">Descripción para el PPT</label>'+
      '<textarea id="bim-ppt-caption-'+index+'" data-bim-ppt-caption="'+index+'" maxlength="240" rows="2">'+
      esc(x.caption)+'</textarea></div></article>').join('')+
    '</div></section>').join('');
  updateBimPptSelectedCounter();
}
function updateBimPptSelectedCounter(){
  const included=pptBimState.items.filter(x=>x.enabled);
  const target=$('#bim-ppt-selection');
  if(target)target.textContent=included.length+' imágenes · '+new Set(included.map(x=>x.package)).size+
    ' paquetes · '+included.reduce((n,x,i)=>n+(i===0||included[i-1].package!==x.package?1:0),0)+' grupos';
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
function pptBimMaster(slide,pptx){
  const S=pptx.ShapeType;
  slide.background={color:'FFFFFF'};
  // Identidad y bandas de la plantilla de reunión semanal (13.33 × 7.5).
  slide.addShape(S.line,{x:0,y:.72,w:13.33,h:0,line:{color:'C8C8C8',width:.75}});
  slide.addShape(S.rect,{x:.19,y:.19,w:.32,h:.23,fill:{color:'C00000'},line:{color:'C00000'}});
  pptBimAddText(slide,'ANIN',{x:.58,y:.12,w:1.65,h:.46,
    fontFace:'Arial',bold:true,fontSize:24,color:'1C2B45'});
  pptBimAddText(slide,'AUTORIDAD NACIONAL DE INFRAESTRUCTURA',
    {x:.59,y:.51,w:3.3,h:.16,fontSize:7,color:'4C5564'});
  slide.addShape(S.rect,{x:11.69,y:.03,w:.80,h:.54,fill:{color:'C00000'},line:{color:'C00000'}});
  pptBimAddText(slide,'S&P',{x:11.72,y:.095,w:.77,h:.36,fontSize:23,color:'FFFFFF',bold:true});
  pptBimAddText(slide,'ÁREA BIM',{x:12.51,y:.25,w:.73,h:.18,fontSize:8,color:'414141',bold:true});
  // Pie gris con banda roja heredados visualmente del archivo de referencia.
  slide.addShape(S.rect,{x:0,y:7.05,w:9.05,h:.39,fill:{color:'858585'},line:{color:'858585'}});
  slide.addShape(S.rect,{x:9.06,y:7.02,w:4.27,h:.29,fill:{color:'FF0000'},line:{color:'FF0000'}});
}
function pptBimFit(innerW,innerH,iw,ih){
  const ratio=Math.min(innerW/iw,innerH/ih);
  return {w:iw*ratio,h:ih*ratio};
}
function pptBimCover(pptx,week,groups,imageCount){
  const slide=pptx.addSlide();
  pptBimMaster(slide,pptx);
  const S=pptx.ShapeType;
  pptBimAddText(slide,'REPORTE FOTOGRÁFICO BIM',
    {x:.55,y:1.04,w:12.15,h:.65,fontSize:30,bold:true,color:'172B49'});
  slide.addShape(S.rect,{x:.55,y:1.89,w:12.18,h:.12,fill:{color:'C00000'},line:{color:'C00000'}});
  pptBimAddText(slide,'CONTROL SEMANAL · '+week.replace('-W',' / SEMANA '),
    {x:.55,y:2.37,w:12,h:.55,fontSize:22,bold:true});
  pptBimAddText(slide,'Evidencias vinculadas a entregables registrados en Control de Tareas',
    {x:.55,y:3.1,w:12,h:.43,fontSize:14,color:'525D6C'});
  pptBimAddText(slide,'PAQUETES: '+groups+'     FOTOGRAFÍAS: '+imageCount,
    {x:.55,y:4.11,w:12,h:.55,fontSize:18,color:'172B49',bold:true});
  pptBimAddText(slide,'Descripciones basadas en las tareas registradas y revisadas antes de exportar.',
    {x:.55,y:5.43,w:12.15,h:.44,fontSize:12,color:'626B78'});
  slide.addShape(S.rect,{x:0,y:6.79,w:4.12,h:.35,fill:{color:'FF0000'},line:{color:'FF0000'}});
  pptBimAddText(slide,'ÁREA BIM · S&P',{x:.45,y:6.87,w:3.4,h:.16,
    fontSize:10,color:'FFFFFF',bold:true,align:'center'});
}
function pptBimEvidenceSlide(pptx,week,packageName,entries){
  const S=pptx.ShapeType,slide=pptx.addSlide();
  pptBimMaster(slide,pptx);
  pptBimAddText(slide,'EVIDENCIAS BIM · SEMANA '+week.split('-W')[1],
    {x:.37,y:.80,w:11.9,h:.29,fontSize:18,bold:true});
  const start=.28,top=1.13, widths=[4.267,4.198,4.336],redH=.673,picH=3.746,captionH=.961;
  let x=start;
  for(let k=0;k<3;k++){
    const w=widths[k],e=entries[k];
    slide.addShape(S.rect,{x,y:top,w,h:redH,
      fill:{color:'C00000'},line:{color:'000000',width:.8}});
    pptBimAddText(slide,packageName.toUpperCase(),
      {x:x+.10,y:top+.13,w:w-.2,h:.37,fontSize:16,bold:true,color:'FFFFFF',align:'center',
        fit:'shrink'});
    slide.addShape(S.rect,{x,y:top+redH,w,h:picH,
      fill:{color:'FFFFFF'},line:{color:'000000',width:.8}});
    slide.addShape(S.rect,{x,y:top+redH+picH,w,h:captionH,
      fill:{color:'FFFFFF'},line:{color:'000000',width:.8}});
    if(e){
      const frame={x:x+.16,y:top+redH+.13,w:w-.32,h:picH-.26};
      const sz=pptBimFit(frame.w,frame.h,e.width,e.height);
      slide.addImage({data:e.data,x:frame.x+(frame.w-sz.w)/2,
        y:frame.y+(frame.h-sz.h)/2,w:sz.w,h:sz.h});
      const caption=String(e.caption||e.title||'').replace(/\s+/g,' ').trim();
      pptBimAddText(slide,caption,
        {x:x+.13,y:top+redH+picH+.09,w:w-.26,h:.59,
          fontSize:caption.length>180?8:caption.length>95?10:13,
          bold:true,align:'center',valign:'mid',fit:'shrink'});
      pptBimAddText(slide,e.taskId+(e.team?' · '+e.team:''),
        {x:x+.13,y:top+redH+picH+.73,w:w-.26,h:.14,fontSize:8,
          color:'5A5A5A',align:'center'});
    }
    x+=w;
  }
  slide.addShape(S.rect,{x:0,y:6.8,w:4.1,h:.34,fill:{color:'FF0000'},line:{color:'FF0000'}});
  pptBimAddText(slide,packageName+' · '+week.replace('-W',' / S'),
    {x:.17,y:6.88,w:3.83,h:.16,fontSize:10,color:'FFFFFF',bold:true,align:'center'});
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
  if(btn)btn.disabled=true;
  if(status)status.textContent='Preparando PowerPoint…';
  try{
    const Factory=await pptBimEnsureLib();
    const pptx=new Factory();
    pptx.layout='LAYOUT_WIDE';
    pptx.author='ÁREA BIM | S&P';
    pptx.subject='Reporte de evidencias BIM, '+pptBimState.week;
    pptx.title='Reporte fotográfico BIM '+pptBimState.week;
    pptx.lang='es-PE';
    pptx.company='ÁREA BIM | S&P';
    const groups=new Map();
    included.forEach(item=>{
      if(!groups.has(item.package))groups.set(item.package,[]);
      groups.get(item.package).push(item);
    });
    pptBimCover(pptx,pptBimState.week,groups.size,included.length);
    let completed=0;
    for(const [packageName,photos] of groups){
      const decoded=[];
      for(const photo of photos){
        if(runToken!==pptBimState.token)throw new Error('La exportación fue interrumpida');
        const blob=await window.bimEvidenceCloud.download(photo.path);
        const loaded=await pptBimDecodeImage(blob);
        decoded.push({...photo,...loaded});
        completed++;
        if(status)status.textContent='Preparando imágenes '+completed+' de '+included.length+'…';
      }
      for(let i=0;i<decoded.length;i+=3){
        pptBimEvidenceSlide(pptx,pptBimState.week,packageName,decoded.slice(i,i+3));
      }
    }
    if(status)status.textContent='Generando PPTX editable…';
    const totalSlides=1+[...groups.values()].reduce((sum,images)=>sum+Math.ceil(images.length/3),0);
    const generated=await pptx.write({outputType:'blob',compression:true});
    const blob=generated instanceof Blob?generated:new Blob([generated],
      {type:'application/vnd.openxmlformats-officedocument.presentationml.presentation'});
    if(status)status.textContent='Validando integridad del archivo PowerPoint…';
    await pptBimValidateBlob(blob,totalSlides,included.length);
    pptBimDownloadBlob(blob,'Reporte_BIM_'+pptBimState.week.replace('-','_')+'.pptx');
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
