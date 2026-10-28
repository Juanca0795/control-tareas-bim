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
const info=await get(await fetch('https://sheets.googleapis.com/v4/spreadsheets/'+sheet+'?fields=sheets(properties(sheetId,title,gridProperties))',{headers}));
const target=info.sheets.find(t=>t.properties?.sheetId===101)?.properties;
if(target?.title!=='Control_Tareas')throw Error('Pestaña de destino incorrecta');
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
// Autoajustar la altura según las descripciones y los apoyos registrados.
// La altura se calcula DESPUÉS de guardar los textos y mostrar filas activas.
if(rows.length){
  for(const col of [2,10])requests.push({repeatCell:{
    range:{sheetId:101,startRowIndex:4,endRowIndex:4+rows.length,startColumnIndex:col,endColumnIndex:col+1},
    cell:{userEnteredFormat:{wrapStrategy:'WRAP'}},
    fields:'userEnteredFormat.wrapStrategy'
  }});
  requests.push({autoResizeDimensions:{
    dimensions:{sheetId:101,dimension:'ROWS',startIndex:4,endIndex:4+rows.length}
  }});
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
