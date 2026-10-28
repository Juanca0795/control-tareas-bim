import {createSign} from 'node:crypto';
const sheet='1bJ-CJ8EaZ-2P-KS6EOefxxBy0HaU1BJYs7Ab2GPNcIc';
const key=process.env.SUPABASE_PUBLISHABLE_KEY;
const sa=JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON||'null');
if(!key||!sa?.private_key)throw Error('Configurar los secretos de GitHub.');
const b=x=>Buffer.from(JSON.stringify(x)).toString('base64url');
const now=Math.floor(Date.now()/1000);
const u=b({alg:'RS256',typ:'JWT'})+'.'+b({iss:sa.client_email,scope:'https://www.googleapis.com/auth/spreadsheets',aud:'https://oauth2.googleapis.com/token',iat:now,exp:now+3500});
const sign=createSign('RSA-SHA256');sign.update(u);
async function get(r){const x=await r.json();if(!r.ok)throw Error('HTTP '+r.status+': '+JSON.stringify(x).slice(0,250));return x}
const oauth=await get(await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion:u+'.'+sign.sign(sa.private_key).toString('base64url')})}));
const headers={Authorization:'Bearer '+oauth.access_token,'Content-Type':'application/json'};
const tasks=await get(await fetch('https://qpotytogdeanlkmgswpm.supabase.co/rest/v1/bim_tasks?user_id=eq.00000000-0000-0000-0000-000000000001&select=id,title,package,team,owner,priority,lod,deadline,status,support,progress&order=id.asc&limit=1000',{headers:{apikey:key,Authorization:'Bearer '+key}}));
if(!Array.isArray(tasks)||tasks.length>=1000||new Set(tasks.map(t=>t.id)).size!==tasks.length)throw Error('Listado inválido');
if(!tasks.length&&process.env.ALLOW_EMPTY_TASK_SYNC!=='true')throw Error('Lista vacía: eliminación masiva bloqueada por seguridad');
const info=await get(await fetch('https://sheets.googleapis.com/v4/spreadsheets/'+sheet+'?ranges=Control_Tareas%21B5%3AM5&includeGridData=true&fields=sheets(properties(sheetId,title,gridProperties),data(columnMetadata))',{headers}));
const target=info.sheets.find(t=>t.properties?.sheetId===101)?.properties;
if(target?.title!=='Control_Tareas')throw Error('Pestaña de destino incorrecta');
// Aproximación conservadora al ancho Calibri 10 pt para ajustar filas
// aun si Google devuelve 21 px con autoResizeDimensions tras importar un XLSX.
const sheetInfo=info.sheets.find(t=>t.properties?.sheetId===101);
const widths=sheetInfo?.data?.[0]?.columnMetadata||[];
const titleWidth=widths[1]?.pixelSize||383;  // C, descripción
// La altura depende de la descripción (columna C), no de los nombres largos
// de "Apoyo en otra área" (K). K se muestra en una sola línea sin perder el dato.
function textWidth(text){
  return [...String(text)].reduce((n,ch)=>{
    if(/\s/.test(ch))return n+3;
    if(/[iIl1.,:;!'|]/.test(ch))return n+3;
    if(/[mMwW@#%]/.test(ch))return n+8.8;
    if(/[A-ZÁÉÍÓÚÑ]/.test(ch))return n+7.3;
    return n+5.95;
  },0);
}
function wrappedLines(input,columnWidth){
  if(!input)return 1;
  const max=Math.max(70,columnWidth-16);
  let count=0;
  for(const paragraph of String(input).split(/\r?\n/)){
    count++;
    let used=0;
    for(const word of paragraph.trim().split(/\s+/).filter(Boolean)){
      const width=textWidth(word);
      if(used&&used+3+width>max){count++;used=0;}
      if(width>max){
        const parts=Math.ceil(width/max);
        count+=parts-1;
        used=width-(parts-1)*max;
      }else used+=(used?3:0)+width;
    }
  }
  return Math.max(1,count);
}
const taskRowHeights=tasks.map(t=>26+13*(wrappedLines(t.title,titleWidth)-1));
const val=x=>x===null||x===undefined||x===''?{}:{userEnteredValue:typeof x==='number'?{numberValue:x}:{stringValue:String(x)}};
const date=s=>s?Math.round((Date.parse(s+'T00:00:00Z')-Date.UTC(1899,11,30))/86400000):null;
const rows=tasks.map((t,i)=>{const r=i+5;const fields=[t.id,t.title,t.package,t.team,t.owner,t.priority,t.lod||'',date(t.deadline),t.status,t.support||'',Number(t.progress||0)/100];const formula='=IF(I'+r+'="","",IF(J'+r+'="Completada","Completada",IF(I'+r+'<TODAY(),"Vencida ("&(TODAY()-I'+r+')&" d)",IF(I'+r+'=TODAY(),"Vence hoy",IF(I'+r+'-TODAY()<=3,"Próximo a vencer ("&(I'+r+'-TODAY())&" d)","En plazo ("&(I'+r+'-TODAY())&" d)")))))';return{values:[...fields.map(val),{userEnteredValue:{formulaValue:formula}}]};});
const end=Math.max(target.gridProperties.rowCount,rows.length+30);
const requests=[];
if(end>target.gridProperties.rowCount)requests.push({
  updateSheetProperties:{properties:{sheetId:101,gridProperties:{rowCount:end}},fields:'gridProperties.rowCount'}
});
// Mantener el formato y los chips solamente en las actividades reales.
// Los nuevos renglones heredan las validaciones desde la primera tarea (fila 5).
if(rows.length>1)requests.push({
  copyPaste:{
    source:{sheetId:101,startRowIndex:4,endRowIndex:5,startColumnIndex:1,endColumnIndex:13},
    destination:{sheetId:101,startRowIndex:5,endRowIndex:4+rows.length,startColumnIndex:1,endColumnIndex:13},
    pasteType:'PASTE_DATA_VALIDATION',pasteOrientation:'NORMAL'
  }
});
// Sincronización espejo: la columna B es el ID y las filas borradas desaparecen.
requests.push({updateCells:{
  range:{sheetId:101,startRowIndex:4,endRowIndex:end,startColumnIndex:1,endColumnIndex:13},
  rows:[],fields:'userEnteredValue'
}});
if(rows.length)requests.push({updateCells:{
  range:{sheetId:101,startRowIndex:4,endRowIndex:4+rows.length,startColumnIndex:1,endColumnIndex:13},
  rows,fields:'userEnteredValue'
}});
// Google Sheets mantiene validaciones/formato en celdas vacías: retirar los
// desplegables de esas celdas y ocultar las filas hasta que haya nuevas tareas.
requests.push({updateDimensionProperties:{
  range:{sheetId:101,dimension:'ROWS',startIndex:4,endIndex:4+rows.length},
  properties:{hiddenByUser:false},fields:'hiddenByUser'
}});
// Presentación compacta: filas normales de 26 px; cada línea adicional suma 13 px.
// C se parte en líneas con centrado vertical. K se recorta visualmente en una
// línea cuando es largo; el valor íntegro permanece en la celda.
if(rows.length){
  requests.push({repeatCell:{
    range:{sheetId:101,startRowIndex:4,endRowIndex:4+rows.length,startColumnIndex:2,endColumnIndex:3},
    cell:{userEnteredFormat:{wrapStrategy:'WRAP',verticalAlignment:'MIDDLE'}},
    fields:'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment'
  }});
  requests.push({repeatCell:{
    range:{sheetId:101,startRowIndex:4,endRowIndex:4+rows.length,startColumnIndex:10,endColumnIndex:11},
    cell:{userEnteredFormat:{wrapStrategy:'CLIP',verticalAlignment:'MIDDLE'}},
    fields:'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment'
  }});
  taskRowHeights.forEach((height,i)=>requests.push({updateDimensionProperties:{
    range:{sheetId:101,dimension:'ROWS',startIndex:4+i,endIndex:5+i},
    properties:{pixelSize:height},fields:'pixelSize'
  }}));
}
if(4+rows.length<end){
  requests.push({setDataValidation:{
    range:{sheetId:101,startRowIndex:4+rows.length,endRowIndex:end,startColumnIndex:1,endColumnIndex:13}
  }});
  requests.push({updateDimensionProperties:{
    range:{sheetId:101,dimension:'ROWS',startIndex:4+rows.length,endIndex:end},
    properties:{hiddenByUser:true},fields:'hiddenByUser'
  }});
}
await get(await fetch('https://sheets.googleapis.com/v4/spreadsheets/'+sheet+':batchUpdate',{method:'POST',headers,body:JSON.stringify({requests})}));
console.log('Sincronizadas '+tasks.length+' tareas desde Supabase; no se escribe en Supabase');
