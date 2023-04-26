
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
  
  for(var i = 1; i < arr.length; i++) {
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


/// retourne un tableau de paires d'index [anc, nou]
function getAncNouFields(headers) {
  const ANC = 'anc_';
  const NOU = 'nou_';
  var res = [];
  var paire;
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
          paire= [i, j];
          res.push(paire);
//console.log(i, headers[i], j, headers[j])
        }
      }
    }
  }
//console.log(res);
  return res;
}


/// comparaison des valeurs entre anc nou
function compareAncNou(headers, paires, rows) {
  var res = [];
  var row;
  var paire;
//console.log(headers);
  for (let i = 0; i < rows.length; i++) {
    row = rows[i];
//console.log(i, rows[i]);
    for(var j = 0; j < paires.length; j++) {
      paire = paires[j];
// console.log(headers[paires[j][0]], headers[paires[j][1]]);
// console.log(row[headers[paires[j][0]]], row[headers[paires[j][1]]]);
//console.log(headers[paires[j][0]]+'='+row[headers[paires[j][0]]], headers[paires[j][1]]+'='+row[headers[paires[j][1]]]);
//console.log(headers[paire[0]]+'='+row[headers[paire[0]]], headers[paire[1]]+'='+row[headers[paire[1]]]);
      if(row[headers[paire[0]]] != row[headers[paire[1]]]) {
          console.log(headers[paire[0]]+'='+row[headers[paire[0]]], headers[paire[1]]+'='+row[headers[paire[1]]]);

      }

    }
  }
  return res;
}
/*
/// retourne un tableau d'objets contenant uniquement les élements avec .match==false
function getUnmatched(arrData) {
  var res = [];
  for (let i = 0; i < arrData.length; i++) {
    if(!arrData[i].match) res.push(arrData[i]);
  }
  return res;
};
*/


/// do the magic
function runAnalyseMvt() {
  var inputColumns = document.getElementById('columnNames').value.trim();
  var inputValues = document.getElementById('values').value.trim();

  
  /// données
 var data = extractData(inputValues, inputColumns);
 var headers = data[0];
 var rows = data[1];

 var paires = getAncNouFields(headers);
 //console.log('paires', paires);
// for (let i = 0; i < paires.length; i++) {
//   const element = paires[i];
//   console.log(headers[paires[i][0]], headers[paires[i][1]]);
// }


 /// comparaison des données
 var res = compareAncNou(headers, paires, rows);
 
 /*
  var dataBankUnmatched = getUnmatched(dataBank);
  var dataWaterpUnmatched = getUnmatched(dataWaterp);

  /// recherche de doublons
  var dblDataBank = getDoublons(dataBank);
  var dblDataWaterp = getDoublons(dataWaterp);

*/
  /// sortie console
// console.log('inputColumns', inputColumns);
// console.log('inputValues', inputValues);
  //console.log('data', data);
  // console.log('dataBankUnmatched', dataBankUnmatched);
  // console.log('dataWaterpUnmatched', dataWaterpUnmatched);
  // console.log('dblDataBank', dblDataBank);
  // console.log('dblDataWaterp', dblDataWaterp);

/*
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
*/
}



function analyseMvt() {
    document.getElementById("info-bubble").innerHTML =`
  <ul>
  <li>A venir</li>
  </ul>
  `;
      document.getElementById("scripts-container").innerHTML = `
      <h2>MVT</h2>
      <div id="ctn">
        <label for="columnNames">Noms des colonnes :</label><br>
        <textarea id="columnNames" rows="4" cols="70">
SES, DAT_MVT, COD_ITV_TRC, COD_PRO_TRC, NUM_STE_TRC, OSUSER, TERMINAL, ACT, ID_FAC_CLI, ANC_COD_NAT_CPT, NOU_COD_NAT_CPT, ANC_COD_TYP_ECR, NOU_COD_TYP_ECR, ANC_COD_TYP_FAC_CLI, NOU_COD_TYP_FAC_CLI, ANC_ID_FAC_CLI_REF, NOU_ID_FAC_CLI_REF, ANC_NUM_CTA_ABT, NOU_NUM_CTA_ABT, ANC_NUM_LOT_FAC_CLI, NOU_NUM_LOT_FAC_CLI, ANC_NUM_CLI_PAY, NOU_NUM_CLI_PAY, ANC_NUM_TRN, NOU_NUM_TRN, ANC_ANN_TRN, NOU_ANN_TRN, ANC_PER_TRN, NOU_PER_TRN, ANC_COD_MTF_REF, NOU_COD_MTF_REF, ANC_COD_TYP_RGR, NOU_COD_TYP_RGR, ANC_ID_FAC_CLI_RGR, NOU_ID_FAC_CLI_RGR, ANC_NUM_FAC_CLI, NOU_NUM_FAC_CLI, ANC_DAT_FAC_CLI, NOU_DAT_FAC_CLI, ANC_MNT_TTC_FAC_CLI, NOU_MNT_TTC_FAC_CLI, ANC_DAT_PRE_RLV_CSO_FAC_CLI, NOU_DAT_PRE_RLV_CSO_FAC_CLI, ANC_DAT_FIN_CSO_FAC_CLI, NOU_DAT_FIN_CSO_FAC_CLI, ANC_VOL_CSO_FAC_CLI, NOU_VOL_CSO_FAC_CLI, ANC_VOL_EAU_FAC_CLI, NOU_VOL_EAU_FAC_CLI, ANC_VOL_AST_FAC_CLI, NOU_VOL_AST_FAC_CLI, ANC_DAT_PLV_FAC_CLI, NOU_DAT_PLV_FAC_CLI, ANC_CDT_M3_FAC_CLI, NOU_CDT_M3_FAC_CLI, ANC_CAT_FAC, NOU_CAT_FAC, ANC_IND_PLV_FAC_CLI, NOU_IND_PLV_FAC_CLI, ANC_COD_FAC_AST_FAC_CLI, NOU_COD_FAC_AST_FAC_CLI, ANC_ID_USER_CREATION, NOU_ID_USER_CREATION, ANC_DAT_EMI_FAC_CLI, NOU_DAT_EMI_FAC_CLI, ANC_DAT_CPB_FAC_CLI, NOU_DAT_CPB_FAC_CLI, ANC_COD_ETA_CPB, NOU_COD_ETA_CPB, ANC_DAT_EXG_FAC_CLI, NOU_DAT_EXG_FAC_CLI, ANC_CMT, NOU_CMT, ANC_ID_DET_LOT_RCO, NOU_ID_DET_LOT_RCO, ANC_TRT_ENC, NOU_TRT_ENC, ANC_NUM_DEV, NOU_NUM_DEV, ANC_ANC_NUM_FAC, NOU_ANC_NUM_FAC, ANC_NOM_FIC_PDF, NOU_NOM_FIC_PDF, ANC_COD_ETA_FAC_CLI, NOU_COD_ETA_FAC_CLI, ANC_ID_USER_EDITION, NOU_ID_USER_EDITION, ANC_DAT_ETA_EDT, NOU_DAT_ETA_EDT, ANC_ID_USER_VALIDATION, NOU_ID_USER_VALIDATION, ANC_DAT_VAL_FAC_CLI, NOU_DAT_VAL_FAC_CLI, ANC_COD_ETA_EDT, NOU_COD_ETA_EDT, ANC_DAT_PER_FAC_SUI, NOU_DAT_PER_FAC_SUI, ANC_CDT_M3_FOR_ABT, NOU_CDT_M3_FOR_ABT, ANC_CDT_M3_ABT, NOU_CDT_M3_ABT, ANC_CDT_M3_JAC_ABT, NOU_CDT_M3_JAC_ABT, ANC_COD_MDE_DSR_FAC, NOU_COD_MDE_DSR_FAC, ANC_NUM_RUM, NOU_NUM_RUM, ANC_CAT_ABT, NOU_CAT_ABT, ANC_IND_ARR_FAC, NOU_IND_ARR_FAC, ANC_IND_FRA_SCE, NOU_IND_FRA_SCE, ANC_IND_LIT, NOU_IND_LIT, ANC_IND_TRT_PRL_BNK, NOU_IND_TRT_PRL_BNK, ANC_IND_WAR, NOU_IND_WAR, ANC_ID_AGENCE, NOU_ID_AGENCE, ANC_ID_SECTEUR, NOU_ID_SECTEUR, ANC_ID_TRAITE_JURIDIQUE_PRINCI, NOU_ID_TRAITE_JURIDIQUE_PRINCI, ANC_ID_TRAITE_JURIDIQUE_SECOND, NOU_ID_TRAITE_JURIDIQUE_SECOND, ANC_ID_REFERENCE_BANCAIRE, NOU_ID_REFERENCE_BANCAIRE, ANC_INDICATEUR_CALCUL_BATCH, NOU_INDICATEUR_CALCUL_BATCH, ANC_ID_EDITIQUE, NOU_ID_EDITIQUE, CLIENT_IDENTIFIER, ANC_IND_AVC_PER_FAC_ABT, NOU_IND_AVC_PER_FAC_ABT, ANC_IND_ETA_FAC_ABT, NOU_IND_ETA_FAC_ABT, ANC_ID_REC, NOU_ID_REC, ANC_STATUT_CHORUS_PRO, NOU_STATUT_CHORUS_PRO, ANC_IDENTIFIANT_FACTURE_CHORUS, NOU_IDENTIFIANT_FACTURE_CHORUS, ANC_DATE_DEPOT_CHORUS_PRO, NOU_DATE_DEPOT_CHORUS_PRO, ANC_ID_TRAITE_FACTURATION, NOU_ID_TRAITE_FACTURATION, ANC_LAST_UPDATED, NOU_LAST_UPDATED, ANC_A_ANALYSER, NOU_A_ANALYSER, ANC_REFERENCE_DETTE, NOU_REFERENCE_DETTE, ANC_ID_ANALYSE_FACTURE, NOU_ID_ANALYSE_FACTURE
        </textarea><br><br>
        <label for="values">Valeurs :</label><br>
        <textarea id="values" rows="20" cols="70">
3862755754	20/04/23 16:02:40,975442000				WRPVALPRD		U	1370124	1	1	01	01	FI	FI			1066684	1066684	4224	4224	1070273	1070273	20	20	2023	2023	1	1			G	G		1370124	1370124	1370124	20/04/23	20/04/23	249,84	249,84	12/09/22	12/09/22	17/04/23	17/04/23	68	68	68	68	68	68			0	0	1	1	T	T	NO	NO	svc_waterp	svc_waterp					00	00	05/05/23	05/05/23					N	N							00	00									0	0	01/01/23	01/01/23	0	0	0	0	0	0	01	01	TIPSEPA0260000690000000000137012423	TIPSEPA0260000690000000000137012423	1	1	0	0	0	0	0	0	0	0	0	0	1	1	253	253	3	3			84185	84185	1	1				1	1	2	2									2	2	20/04/23 14:02:35,869323000	20/04/23 14:02:40,975353000						
3862755754	20/04/23 16:02:40,973672000				WRPVALPRD		U	1370123	1	1	01	01	FI	FI			1036809	1036809	4224	4224	1056513	1056513	20	20	2023	2023	1	1			G	G		1370123	1370123	1370123	20/04/23	20/04/23	40,66	40,66	12/09/22	12/09/22	17/04/23	17/04/23	0	0	0	0	0	0	05/05/23	05/05/23	0	0	1	1	P	P	NO	NO	svc_waterp	svc_waterp					00	00	05/05/23	05/05/23					N	N							00	00									0	0	01/01/23	01/01/23	0	0	0	0	0	0	01	01			1	1	0	0	0	0	0	0	1	1	0	0	1	1	253	253	3	3			31251	31251	1	1				1	1	2	2									2	2	20/04/23 14:02:35,848476000	20/04/23 14:02:40,973582000						
3862755754	20/04/23 16:02:40,971766000				WRPVALPRD		U	1370122	1	1	01	01	FI	FI			1030696	1030696	4224	4224	1038806	1038806	20	20	2023	2023	1	1			G	G		1370122	1370122	1370122	20/04/23	20/04/23	99,35	99,35	12/09/22	12/09/22	17/04/23	17/04/23	19	19	19	19	19	19			0	0	1	1	R	R	NO	NO	svc_waterp	svc_waterp					00	00	05/05/23	05/05/23					N	N							00	00									0	0	01/01/23	01/01/23	0	0	0	0	0	0	01	01	TIPSEPA0260000690000000000137012223	TIPSEPA0260000690000000000137012223	1	1	0	0	0	0	0	0	0	0	0	0	1	1	253	253	3	3					1	1				1	1	2	2									2	2	20/04/23 14:02:35,824642000	20/04/23 14:02:40,971658000						
3862755754	20/04/23 16:02:40,968796000				WRPVALPRD		U	1370121	1	1	01	01	FI	FI			1030691	1030691	4224	4224	1039328	1039328	20	20	2023	2023	1	1			G	G		1370121	1370121	1370121	20/04/23	20/04/23	139,51	139,51	12/09/22	12/09/22	17/04/23	17/04/23	32	32	32	32	32	32			0	0	1	1	R	R	NO	NO	svc_waterp	svc_waterp					00	00	05/05/23	05/05/23					N	N							00	00									0	0	01/01/23	01/01/23	0	0	0	0	0	0	01	01	TIPSEPA0260000690000000000137012123	TIPSEPA0260000690000000000137012123	1	1	0	0	0	0	0	0	0	0	0	0	1	1	253	253	3	3					1	1				1	1	2	2									2	2	20/04/23 14:02:35,813398000	20/04/23 14:02:40,968704000						
3862755754	20/04/23 16:02:40,966560000				WRPVALPRD		U	1370120	1	1	01	01	FI	FI			1073117	1073117	4224	4224	1060628	1060628	20	20	2023	2023	1	1			G	G		1370120	1370120	1370120	20/04/23	20/04/23	252,33	252,33	08/09/22	08/09/22	17/04/23	17/04/23	69	69	69	69	69	69	05/05/23	05/05/23	0	0	1	1	P	P	NO	NO	svc_waterp	svc_waterp					00	00	05/05/23	05/05/23					N	N							00	00									0	0	01/01/23	01/01/23	0	0	0	0	0	0	01	01			1	1	0	0	0	0	0	0	1	1	0	0	1	1	250	250	3	3			44205	44205	1	1				1	1	2	2									2	2	20/04/23 14:02:35,805598000	20/04/23 14:02:40,966468000						
3862755754	20/04/23 16:02:40,964654000				WRPVALPRD		U	1370119	1	1	01	01	FI	FI			1069403	1069403	4224	4224	1073359	1073359	20	20	2023	2023	1	1			G	G		1370119	1370119	1370119	20/04/23	20/04/23	151,54	151,54	11/10/22	11/10/22	17/04/23	17/04/23	35	35	35	35	35	35	05/05/23	05/05/23	0	0	1	1	P	P	NO	NO	svc_waterp	svc_waterp					00	00	05/05/23	05/05/23					N	N							00	00									0	0	01/01/23	01/01/23	0	0	0	0	0	0	01	01			1	1	0	0	0	0	0	0	1	1	0	0	1	1	250	250	3	3			95794	95794	1	1				1	1	2	2									2	2	20/04/23 14:02:35,782733000	20/04/23 14:02:40,964557000						
3862755754	20/04/23 16:02:40,961416000				WRPVALPRD		U	1370118	1	1	01	01	FI	FI			1065844	1065844	4224	4224	1041592	1041592	20	20	2023	2023	1	1			G	G		1370118	1370118	1370118	20/04/23	20/04/23	227,27	227,27	11/10/22	11/10/22	17/04/23	17/04/23	59	59	59	59	59	59			0	0	1	1	T	T	NO	NO	svc_waterp	svc_waterp					00	00	05/05/23	05/05/23					N	N							00	00									0	0	01/01/23	01/01/23	0	0	0	0	0	0	01	01	TIPSEPA0260000690000000000137011823	TIPSEPA0260000690000000000137011823	2	2	0	0	0	0	0	0	0	0	0	0	1	1	250	250	3	3			74464	74464	1	1				1	1	2	2									2	2	20/04/23 14:02:35,758472000	20/04/23 14:02:40,961319000						
3862755754	20/04/23 16:02:40,959374000				WRPVALPRD		U	1370117	1	1	01	01	FI	FI			1064812	1064812	4224	4224	1068501	1068501	20	20	2023	2023	1	1			G	G		1370117	1370117	1370117	20/04/23	20/04/23	227,27	227,27	11/10/22	11/10/22	17/04/23	17/04/23	59	59	59	59	59	59			0	0	1	1	R	R	NO	NO	svc_waterp	svc_waterp					00	00	05/05/23	05/05/23					N	N							00	00									0	0	01/01/23	01/01/23	0	0	0	0	0	0	01	01	TIPSEPA0260000690000000000137011723	TIPSEPA0260000690000000000137011723	1	1	0	0	0	0	0	0	0	0	0	0	1	1	250	250	3	3					1	1				1	1	2	2									2	2	20/04/23 14:02:35,750922000	20/04/23 14:02:40,959274000						
3862755754	20/04/23 16:02:40,957170000				WRPVALPRD		U	1370116	1	1	01	01	FI	FI			1062879	1062879	4224	4224	1066942	1066942	20	20	2023	2023	1	1			G	G		1370116	1370116	1370116	20/04/23	20/04/23	227,27	227,27	11/10/22	11/10/22	17/04/23	17/04/23	59	59	59	59	59	59	05/05/23	05/05/23	0	0	1	1	P	P	NO	NO	svc_waterp	svc_waterp					00	00	05/05/23	05/05/23					N	N							00	00									0	0	01/01/23	01/01/23	0	0	0	0	0	0	01	01			1	1	0	0	0	0	0	0	1	1	0	0	1	1	250	250	3	3			72464	72464	1	1				1	1	2	2									2	2	20/04/23 14:02:35,739485000	20/04/23 14:02:40,957065000						
3862755754	20/04/23 16:02:40,954604000				WRPVALPRD		U	1370115	1	1	01	01	FI	FI			1056037	1056037	4224	4224	1060628	1060628	20	20	2023	2023	1	1			G	G		1370115	1370115	1370115	20/04/23	20/04/23	227,27	227,27	11/10/22	11/10/22	17/04/23	17/04/23	59	59	59	59	59	59	05/05/23	05/05/23	0	0	1	1	P	P	NO	NO	svc_waterp	svc_waterp					00	00	05/05/23	05/05/23					N	N							00	00									0	0	01/01/23	01/01/23	0	0	0	0	0	0	01	01			1	1	0	0	0	0	0	0	1	1	0	0	1	1	250	250	3	3			44205	44205	1	1				1	1	2	2									2	2	20/04/23 14:02:35,710094000	20/04/23 14:02:40,954506000						
        </textarea><br><br>

        <button type="button" onclick="runAnalyseMvt()">Analyser</button>
        <button type="button" id="reset" onclick="analyseMvt()">Reset</button><br><br>
  
      <div id="output"></div>
    </div>
      `;
    }
