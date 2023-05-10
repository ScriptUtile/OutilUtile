
/// crée un tableau d'objets à partir des données Wat.erp
/// requete : select id_fac_cli, mnt_cdt_ttc_ecr_cli, num_cta_abt from ecr_cli where cod_typ_ecr='11' and cod_mod_reg='02' and trunc(dat_cpt_ecr_cli)='&dat' order by 1;
function extractData(valuesStr, headersStr){
  var res = [];
  var arr = [];
  arr = valuesStr.split('\n'); 
  
  var headers = headersStr.toLowerCase().split(',');
  for (let i = 0; i < headers.length; i++) {
    headers[i] = headers[i].trim();
  }
  
  for(var i = 0; i < arr.length; i++) {
    var data = arr[i].split('\t');
    var row = {};
    for(var j = 0; j < headers.length; j++) {
      if(data[j]) row[headers[j]] = data[j].trim();
     else row[headers[j]] = data[j];
    }
    res.push(row);
  }
  
  return [headers, res];
}


/// retourne un tableau de couples [anc, nou] basés sur l'index de headers (= numéro de colonne)
function getAncNouFields(headers) {
  const ANC = 'anc_';
  const NOU = 'nou_';
  var resCouples = [];
  var resIdxHeadersCoupleGlobal = []; // liste des headers étant un couple anc/nou
  var couple;
  var fieldName;
  var header;
  for (let i = 0; i < headers.length; i++) {
    header = headers[i];
//console.log(i, headers[i]);
    if(header.indexOf(ANC) == 0) { // cherche le NOU correspondant
      fieldName = header.substr(ANC.length);
//console.log('fieldName', fieldName);      
      for (let j = 0; j < headers.length; j++) {
        if(j != i && headers[j] == NOU + fieldName) {
          couple = [i, j];
          resCouples.push(couple);
          resIdxHeadersCoupleGlobal.push(i);
          resIdxHeadersCoupleGlobal.push(j);
//console.log(i, headers[i], j, headers[j])
          break;
        }
      }
    }
  }
  return [resCouples, resIdxHeadersCoupleGlobal];
}


/// comparaison des valeurs entre anc nou
function compareAncNou(headers, couples, rows) {
  var res = []; // tableau contenant pour chaque row les indexes des couples ayant des différences
  var resHeadersDiffGlobal = []; // tableau recensant les headers qui ont un changement sur au moins une ligne
  var row;
  var couple; // ancien / nouveau

  for (let i = 0; i < rows.length; i++) {
    let couplesDiff = [];
    row = rows[i];
    for(let j = 0; j < couples.length; j++) {
      couple = couples[j];
        if(row[headers[couple[0]]] != row[headers[couple[1]]]) { // différence entre anc et nou
          // console.log("!= : row["+i+"]", "couples["+j+"]="+couples[j], headers[couple[0]]+'='+row[headers[couple[0]]], headers[couple[1]]+'='+row[headers[couple[1]]]);
          couplesDiff.push(j);
          
          if(!resHeadersDiffGlobal.includes(headers[couple[0]])) resHeadersDiffGlobal.push(headers[couple[0]]);
          if(!resHeadersDiffGlobal.includes(headers[couple[1]])) resHeadersDiffGlobal.push(headers[couple[1]]);        
        }
    }
    res.push(couplesDiff); // 
  }
  return [res, resHeadersDiffGlobal];
}


/// do the magic
function runAnalyseMvt() {

  var hideNoDiffCols = document.getElementById('cbHideNoDiffCols').checked;
  var hideBaseCols = document.getElementById('cbHideBaseCols').checked;
  var paramShrinkHeaders = document.getElementById('paramShrinkHeaders').checked;
  

  var inputColumns = document.getElementById('columnNames').value.trim();
  var inputValues = document.getElementById('values').value.trim();

  
  /// données
  var data = extractData(inputValues, inputColumns);
  var headers = data[0];
  var rows = data[1];

  var resAncNou = getAncNouFields(headers);
  var couples = resAncNou[0];
  var idxHeadersCoupleGlobal = resAncNou[1];


  /// comparaison des données
  var resCompare = compareAncNou(headers, couples, rows);
  
  var resDiff = resCompare[0];
  var headersDiffGlobal = resCompare[1];


  /// sortie console
  console.log('headers', headers);
  console.log('rows', rows);
  console.log('couples', couples);
  console.log('idxHeadersCoupleGlobal', idxHeadersCoupleGlobal);
  console.log('headersDiffGlobal', headersDiffGlobal);

  /// détermine les colonnes à afficher (toutes ou uniquement celles avec des différences anc/nou)
  var idxHeadersToDisplay = [];
  for (let i = 0; i < headers.length; i++) { 
    if(hideNoDiffCols) {
      if(headersDiffGlobal.includes(headers[i])) // n'affiche que les colonnes avec une différence de valeur sur anc / nou
        idxHeadersToDisplay.push(i);
     
      else if(!hideBaseCols) { // affiche les colonnes de bases
        if(!idxHeadersCoupleGlobal.includes(i))
          idxHeadersToDisplay.push(i);
      }

    } else {
      if(hideBaseCols) {
        if(idxHeadersCoupleGlobal.includes(i)) // affiche uniquement les colonnes anc/nou
          idxHeadersToDisplay.push(i);
      } else  {
        idxHeadersToDisplay.push(i);
      }
    }
  }

  /// sortie document
  if (rows.length) {

    var tableRes = '<table class="small">';

    // affichage des entetes
    tableRes += "<tr><th></th>";
    for (let i = 0; i < idxHeadersToDisplay.length; i++) {
      tableRes += "<th";
      if(paramShrinkHeaders) tableRes += ' class="shrink"';
      tableRes += ">";
      tableRes += '<span class="num">' + parseInt(idxHeadersToDisplay[i] +1) + "</span><br>";
      tableRes += headers[idxHeadersToDisplay[i]] +"</th>";
    }
    tableRes += "</tr>";

    // affichage des lignes
    for (let i = 0; i < rows.length; i++) {
      let rowHasDiff = false;
      let headersDiff = []; // nom des entetes ou on a une difference
      // let colsDiff = []; // numero des colonnes ou on a une difference
      
      if(resDiff[i].length) { // on a une différence sur la ligne
        rowHasDiff = true;
        let couplesDiff = resDiff[i];
        for (let j = 0; j < couplesDiff.length; j++) {
          let couple = couples[couplesDiff[j]];

          for (let k = 0; k < couple.length; k++) {
            headersDiff.push(headers[couple[k]]);
            // colsDiff.push(couple[k]);
          }
          
        }
        // console.log("tableRes-diff :"+i, /*"colsDiff="+colsDiff,*/ "headersDiff="+ headersDiff);
      }
      tableRes += '<tr><td><span class="num">'+ parseInt(i+1) +"</span></td>";
      for (let j = 0; j < headers.length; j++) {
        let classStr = "";
        if(rowHasDiff) {
            if(headersDiff.includes(headers[j]))
              classStr = ' class="diff"';
        }
        if(idxHeadersToDisplay.includes(j)) {
          tableRes += "<td"+ classStr +">";
          if(rows[i][headers[j]])
            tableRes += rows[i][headers[j]];
          tableRes += "</td>";
        }
      }
      tableRes += "</tr>";  
    }
    tableRes += "</table>";
  }
  

  // outputHtml = '<span class="label">Résulats :</span>';
  outputHtml = "";
  outputHtml += tableRes;
  document.getElementById("output").innerHTML = outputHtml;
}


function analyseMvt() {
    document.getElementById("info-bubble").innerHTML =`
  <ul>
  <li>Ce script permet de mettre en valeur les changements sur les couples anc/nou en colorant en rouge les données concernées.</li>
  <li>Noms des colonnes : liste de noms séparés par une virgule. (SQLDeveloper > copier les entêtes des colonnes)</li>
  <li>Valeurs : liste de lignes de valeurs, séparées par une tabulation. (SQLDeveloper > copier les données)</li>
  </ul>
  `;
      document.getElementById("scripts-container").innerHTML = `
      <h2>MVT</h2>
      <div id="ctn">
        <label for="columnNames">Noms des colonnes :</label><br>
        <textarea id="columnNames" rows="4" cols="70"></textarea><br><br>
        <label for="values">Valeurs :</label><br>
        <textarea id="values" rows="20" cols="70"></textarea><br>
        <div class="left-align">
          <div class="float-left">
            <input type="checkbox" id="paramShrinkHeaders" onChange="runAnalyseMvt();" checked>
            <label for="paramShrinkHeaders">Entêtes réductibles</label><br>
            <input type="checkbox" id="cbHideNoDiffCols" onChange="runAnalyseMvt();" checked>
            <label for="cbHideNoDiffCols">Masquer les colonnes sans changement</label><br>
            <input type="checkbox" id="cbHideBaseCols" onChange="runAnalyseMvt();">
            <label for="cbHideBaseCols">Masquer les colonnes de base</label><br>
            
          </div>
          <div class="right-align">
            <button type="button" onclick="runAnalyseMvt();">Analyser</button>
            <button type="button" id="reset" onclick="analyseMvt();">Reset</button><br><br>
          </div>
        </div>
      </div>
      <br>
      <div id="output" class="fullwidth"></div>
      `;
    }
