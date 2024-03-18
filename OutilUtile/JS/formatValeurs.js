
function formatValues() {
  var input = document.getElementById("inputValues").value.trim();
  var lines = input.split("\n");
  var concatAllFieldname = document.getElementById("concatAllFieldname").value.trim();
  var formatModeByLot = document.getElementById("formatModeByLot").checked;
  var formatModeConcatAll = document.getElementById("formatModeConcatAll").checked;
  var tailleLot = document.getElementById("tailleLot").value.trim();
  var formatTrim = document.getElementById("formatTrim").checked;
  var formatAddQuotes = document.getElementById("formatAddQuotes").checked;
  var output = "";

// console.log('formatModeByLot', formatModeByLot);
// console.log('formatModeConcatAll', formatModeConcatAll);


  var chunkSize = 1000;
  if(Number(tailleLot) > 0) chunkSize = Number(tailleLot);
  var currentNum;

  if(formatModeConcatAll) { // un seul lot séparé par des OR
    output += "<label for='outputValues-0'>Résultat 1</label><br>";
    output += "<textarea id='outputValues-0' rows='10' cols='70' readonly>";
  }

  for (var i = 0; i < lines.length; i += chunkSize) {
    var chunkLines = lines.slice(i, i + chunkSize);
    var chunkOutput = "";
    for (var j = 0; j < chunkLines.length; j++) {
      //chunkOutput += "'" + chunkLines[j].trim() + "'";
      if(formatAddQuotes) chunkOutput += "'";
      if(formatTrim) chunkOutput += chunkLines[j].trim();
      else chunkOutput += chunkLines[j];
      if(formatAddQuotes) chunkOutput += "'";

      if (j < chunkLines.length - 1) {
        chunkOutput += ", ";
      }
    }

    currentNum = i / chunkSize;
    
    if(formatModeConcatAll) { // un seul lot séparé par des OR
      if(currentNum == 0) output += "WHERE";
      else output += "OR";
      output +=  " " + concatAllFieldname + " in (" + chunkOutput + ")\n";
      
    } else { // par lot de 1000
      output += "<label for='outputValues-" + currentNum + "'>Résultat " + (currentNum + 1) + "</label><br>";
      output += "<textarea id='outputValues-" + currentNum + "' rows='5' cols='70' readonly>" + chunkOutput + "</textarea>";
      output += "<div id='count"+currentNum+"' class='count'>"+chunkLines.length+"</div>";
      output += "<button id='copy-"+currentNum+"'>Copier</button><br><br>";
    }
  }

  if(formatModeConcatAll) {
    output += ";";
    output += "</textarea>";
    output += "<div id='count0' class='count'>"+lines.length+"</div>";
    output += "<button id='copy-0'>Copier</button><br><br>";
  } 

  document.getElementById("countIn").innerHTML = lines.length;
  document.getElementById("output").innerHTML = output;

  if(formatModeByLot) {
    var btn;
    for(var n=0; n<=currentNum; n++) {
      btn = document.getElementById('copy-'+n);
      btn.addEventListener("click", copyHdlr);
    }
  } else if(formatModeConcatAll) {
    btn = document.getElementById('copy-0');
    btn.addEventListener("click", copyHdlr);
  }

}

function copyHdlr() {
  var num = this.id.substr(5);
  var el = document.getElementById('outputValues-'+num);
  copyToClipboard(el);
}

function checkCopyAuto() {
  if (document.getElementById('autoCB').checked)
    copyToClipboard(document.getElementById("outputValues-0"));
}


function formatValeurJS() {
  document.getElementById("info-bubble").innerHTML =`
<ul>
<li>Ce script permet de formater une colonne de valeurs en une ligne de valeurs comme suit : 'valeur1', 'valeur2', 'valeur3'</li>
</ul>
`;
    document.getElementById("scripts-container").innerHTML = `
    <h2>Formatage d'une liste de valeurs en ligne</span></h2>
    <div id="ctn">
    <div>
      <label for="inputValues">Entrez les valeurs :</label><br>
      <textarea id="inputValues" rows="20" cols="70" onchange="formatValues(); checkCopyAuto();"></textarea>
      <div id="countIn" class="count"></div>
    </div>
    <div>
      <div class="float-left">
      
      <fieldset>
        <legend>Paramètres</legend>
          <div>
            <input id="autoCB" type="checkbox" checked>
            <label for="autoCB">Copie automatique du Résultat 1</label>
          </div>
          <div>
            <input id="formatTrim" type="checkbox" checked>
            <label for="formatTrim">Appliquer un trim sur les valeurs entrées</label>
          </div>
          <div>
            <input id="formatAddQuotes" type="checkbox" checked>
            <label for="formatAddQuotes">Afficher les valeurs de sorties entre quotes</label>
          </div>
          <div>
            <label for="tailleLot">Taille des lots</label>
            <input id="tailleLot" type="number" value="1000">
          </div>
          <fieldset class="inside">
            <legend>Mode de Formatage</legend>
            <div>
              <input id="formatModeByLot" name="formatMode" type="radio" checked>
              <label for="formatModeByLot">Par lots</label>
            </div>
            <div>
              <input id="formatModeConcatAll" name="formatMode" type="radio">
              <label for="formatModeConcatAll">Par concaténation OR</label>
              <input id="concatAllFieldname" type="text" value="nomDuChamp" class="width_auto">
            </div>
          </fieldset>
        </fieldset>
      </div>
      <div>
        <button type="button" onclick="formatValues()">Convertir</button>
        <button type="button" id="reset" onclick="formatValeurJS()">Reset</button><br><br>
      </div>
      <div id="count"></div>
    </div>

    <div id="output"></div>
  </div>
    `;
  }