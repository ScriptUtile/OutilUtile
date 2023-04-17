/// convertit les données XML du format string en objet XML
function parseXML(xmlStr) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlStr, "application/xml");
  const errorNode = xml.querySelector("parsererror");
  if (errorNode) {
    console.warn("error while parsing");
    document.getElementById('output').innerHTML = "/!\\ Erreur. Données XML non valides.";
    throw new Error();
  }
  else return xml;
}

/// crée un tableau d'objets à partir des données bancaires
function extractDataBank(xml) {
  xml.getElementsByTagName("TRANSACTION");
  var dataBank = [];
  var transactions = xml.getElementsByTagName("TRANSACTION");
  for(var i = 0; i < transactions.length; i++) {
      var transaction = transactions[i];
      var rowBank = {};
      rowBank.id_fac_cli = transaction.attributes['OrderReference'].value.slice(14);
      rowBank.montant = parseInt(transaction.attributes['GrossAmount'].value) /100;
      rowBank.date = transaction.attributes['AuthorizationDate'].value;
      rowBank.match = false;
      dataBank.push(rowBank);
  }

  return dataBank;
}

/// crée un tableau d'objets à partir des données Wat.erp
/// requete : select id_fac_cli, mnt_cdt_ttc_ecr_cli, num_cta_abt from ecr_cli where cod_typ_ecr='11' and cod_mod_reg='02' and trunc(dat_cpt_ecr_cli)='&dat' order by 1;
function extractDataWaterp(str){
  var dataWaterp = [];
  var arr = [];
  arr = str.split('\n'); 
  
  // const headersStr = "ID_FAC_CLI, MNT_CDT_TTC_ECR_CLI, NUM_CTA_ABT";
  const headersStr = "id_fac_cli, montant, num_cta_abt, match";
  var headers = headersStr.split(',');
  for (let i = 0; i < headers.length; i++) {
    headers[i] = headers[i].trim();
  }
  
  for(var i = 1; i < arr.length; i++) {
    var data = arr[i].split('\t');
    var rowWaterp = {};
    for(var j = 0; j < headers.length; j++) {
      if(headers[j] == 'montant') rowWaterp[headers[j]] = parseFloat(data[j].trim().replace(',', '.')); // conversion du MNT_CDT_TTC_ECR_CLI en montant
      else if(headers[j] == 'match') rowWaterp[headers[j]] = false; // match
      else rowWaterp[headers[j]] = data[j].trim();
    }
    dataWaterp.push(rowWaterp);
  }
  
  return dataWaterp;
}

/// Calcule la somme d'un tableau sur le champ spécifié
function sumArrayOnPorperty(array, propertyName, fix=false) {
  var sum = 0;
  for (let i = 0; i < array.length; i++) {
    // sum += array[i].montant;
    sum += array[i][propertyName];
  }
  if(fix) sum = sum.toFixed(2); // /!\ toFixed pour éviter le bug de décimales (issu de la converstion de nombres binaires en nombres décimaux)
  return sum; 
}

/// retourne un tableau de doublons avec les propriétés montant et id_fac_cli 
function getDoublons(array) {
  var arrDbl = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      
      if(i != j && array[i].montant == array[j].montant && array[i].id_fac_cli == array[j].id_fac_cli)
      arrDbl.push(array[i]);
    }
  }

  return arrDbl; 
}

/// comparaison des montants
/// passe la propiété match à true dans chaque tableau si les données correspondent 
function compareAmounts(dataBank, dataWaterp) {
  var eltBank;
  var eltWaterp
  for (let i = 0; i < dataBank.length; i++) {
    eltBank = dataBank[i];

    for (let j = 0; j < dataWaterp.length; j++) {
      eltWaterp = dataWaterp[j];
      if(!eltWaterp.match && eltBank.montant == eltWaterp.montant && eltBank.id_fac_cli == eltWaterp.id_fac_cli) {
        eltBank.match = eltWaterp.match = true;
        break;
      }
    }
  }
  return [dataBank, dataWaterp];
}

/// retourne un tableau d'objets contenant uniquement les élements avec .match==false
function getUnmatched(arrData) {
  var res = [];
  for (let i = 0; i < arrData.length; i++) {
    if(!arrData[i].match) res.push(arrData[i]);
  }
  return res;
};




function runAnalysis() {
  var inputBank = document.getElementById('inputBank').value.trim();
  var inputWaterp = document.getElementById('inputWaterp').value.trim();

  
  /// données bancaires
  const xml = parseXML(inputBank);
  var dataBank = extractDataBank(xml);

  /// données Wat.erp
  var dataWaterp = extractDataWaterp(inputWaterp);

  //// ecart
  var sumBank = sumArrayOnPorperty(dataBank, 'montant', true);
  var sumWaterp = sumArrayOnPorperty(dataWaterp, 'montant', true);
  var delta = sumBank - sumWaterp;


  /// comparaison des données
  var res = compareAmounts(dataBank, dataWaterp);
  dataBank = res[0];
  dataWaterp = res[1];

  var dataBankUnmatched = getUnmatched(dataBank);
  var dataWaterpUnmatched = getUnmatched(dataWaterp);

  /// recherche de doublons
  var dblDataBank = getDoublons(dataBank);
  var dblDataWaterp = getDoublons(dataWaterp);


  /// sortie console
  console.log('dataBank',dataBank);
  console.log('dataWaterp', dataWaterp);
  console.log('dataBankUnmatched', dataBankUnmatched);
  console.log('dataWaterpUnmatched', dataWaterpUnmatched);
  console.log('dblDataBank', dblDataBank);
  console.log('dblDataWaterp', dblDataWaterp);


  /// sortie document
  var tableBankUnmatched = "";
  if (dataBankUnmatched.length) {
    var tableBankUnmatched = "<table class='small'><tr><th>id_fac_cli</th><th>montant</th><th>date</th></tr>";
    for (let i = 0; i < dataBankUnmatched.length; i++) {
      tableBankUnmatched += "<tr>";
      tableBankUnmatched += "<td>"+dataBankUnmatched[i].id_fac_cli+"</td>";
      tableBankUnmatched += "<td>"+dataBankUnmatched[i].montant+"</td>";
      tableBankUnmatched += "<td>"+dataBankUnmatched[i].date+"</td>";
      tableBankUnmatched += "</tr>";
    }
    tableBankUnmatched += "</table>";
  }
    
  var tableWaterpUnmatched = "";
  if (dataWaterpUnmatched.length) {
    tableWaterpUnmatched += "<table class='small'><tr><th>id_fac_cli</th><th>montant</th><th>num_cta_abt</th></tr>";
    for (let i = 0; i < dataWaterpUnmatched.length; i++) {
      tableWaterpUnmatched += "<tr>";
      tableWaterpUnmatched += "<td>"+dataWaterpUnmatched[i].id_fac_cli+"</td>";
      tableWaterpUnmatched += "<td>"+dataWaterpUnmatched[i].montant+"</td>";
      tableWaterpUnmatched += "<td>"+dataWaterpUnmatched[i].num_cta_abt+"</td>";
      tableWaterpUnmatched += "</tr>";
    }
    tableWaterpUnmatched += "</table>";
  }

  var tabledblBank = "";
  if (dblDataBank.length) {
    var tabledblBank = "<table class='small'><tr><th>id_fac_cli</th><th>montant</th><th>date</th></tr>";
    for (let i = 0; i < dblDataBank.length; i++) {
      tabledblBank += "<tr>";
      tabledblBank += "<td>"+dblDataBank[i].id_fac_cli+"</td>";
      tabledblBank += "<td>"+dblDataBank[i].montant+"</td>";
      tabledblBank += "<td>"+dblDataBank[i].date+"</td>";
      tabledblBank += "</tr>";
    }
    tabledblBank += "</table>";
  }
  
  var tabledblWaterp = "";
  if (dblDataWaterp.length) {
    var tabledblWaterp = "<table class='small'><tr><th>id_fac_cli</th><th>montant</th><th>num_cta_abt</th></tr>";
    for (let i = 0; i < dblDataWaterp.length; i++) {
      tabledblWaterp += "<tr>";
      tabledblWaterp += "<td>"+dblDataWaterp[i].id_fac_cli+"</td>";
      tabledblWaterp += "<td>"+dblDataWaterp[i].montant+"</td>";
      tabledblWaterp += "<td>"+dblDataWaterp[i].num_cta_abt+"</td>";
      tabledblWaterp += "</tr>";
    }
    tabledblWaterp += "</table>";
  }
  


  var outputHtml = "<table><tr><th class='narrow'></th><th class='large'>Banque</th><th class='large'>Wat.erp</th></tr>";
  outputHtml += "<tr>";
  outputHtml += "<tr>";
  outputHtml += "<td>total (€)</td>";
  outputHtml += "<td>"+sumBank+"</td>";
  outputHtml += "<td>"+sumWaterp+"</td>";
  outputHtml += "</tr>";
  outputHtml += "<tr>";
  outputHtml += "<td>écart (€)</td>";
  outputHtml += "<td colspan='2' class='center'>"+delta.toFixed(2)+"</td>";
  outputHtml += "</tr>";
  outputHtml += "<td>lignes</td>";
  outputHtml += "<td>"+dataBank.length+"</td>";
  outputHtml += "<td>"+dataWaterp.length+"</td>";
  outputHtml += "</tr>";
  outputHtml += "<tr>";
  outputHtml += "<td>lignes sans correspondance</td>";
  outputHtml += "<td>"+dataBankUnmatched.length+"</td>";
  outputHtml += "<td>"+dataWaterpUnmatched.length+"</td>";
  outputHtml += "</tr>";
  outputHtml += "<tr>";
  outputHtml += "<td>détail</td>";
  outputHtml += "<td class='vtop'>"+tableBankUnmatched+"</td>";
  outputHtml += "<td class='vtop'>"+tableWaterpUnmatched+"</td>";
  outputHtml += "</tr>";
  outputHtml += "<tr>";
  outputHtml += "<td>doublons</td>";
  outputHtml += "<td class='vtop'>"+tabledblBank+"</td>";
  outputHtml += "<td class='vtop'>"+tabledblWaterp+"</td>";
  outputHtml += "</tr>";

  outputHtml += "</table>";
  document.getElementById("output").innerHTML = outputHtml;
}



function analyseEcartCB() {
    document.getElementById("info-bubble").innerHTML =`
  <ul>
  <li>A venir</li>
  </ul>
  `;
      document.getElementById("scripts-container").innerHTML = `
      <div id="ctn">
      <div>
        <label for="inputBank">Entrez les données bancaires (copier/coller du fichier xml) :</label><br>
        <textarea id="inputBank" rows="10" cols="70"></textarea>
      </div>
      <br>
      <div>
        <label for="inputWaterp">Entrez les données Wat.erp (copier/coller des données SQLDeveloper) :<br>
        select id_fac_cli, mnt_cdt_ttc_ecr_cli, num_cta_abt from ecr_cli where cod_typ_ecr='11' and cod_mod_reg='02' and trunc(dat_cpt_ecr_cli)='&dat' order by 1;</label><br>
        <textarea id="inputWaterp" rows="10" cols="70"></textarea>
      </div>
      <button type="button" onclick="runAnalysis()">Analyser</button>
      <button type="button" id="reset" onclick="analyseEcartCB()">Reset</button><br><br>
  
      <div id="output"></div>
    </div>
      `;
    }
