
function formatValues() {
    var input = document.getElementById("inputValues").value.trim();
    var lines = input.split("\n");
    var output = "";
   var chunkSize = 1000;
    var currentNum;
    for (var i = 0; i < lines.length; i += chunkSize) {
      var chunkLines = lines.slice(i, i + chunkSize);
      var chunkOutput = "";
      for (var j = 0; j < chunkLines.length; j++) {
        chunkOutput += "'" + chunkLines[j].trim() + "'";
        if (j < chunkLines.length - 1) {
          chunkOutput += ", ";
        }
      }
      currentNum = i / chunkSize;
      output += "<label for='outputValues-" + currentNum + "'>Résultat " + (currentNum + 1) + "</label><br>";
      output += "<textarea id='outputValues-" + currentNum + "' rows='5' cols='70' readonly>" + chunkOutput + "</textarea>";
      output += "<div id='count"+currentNum+"' class='count'>"+chunkLines.length+"</div>";
      output += "<button id='copy-"+currentNum+"'>Copier</button><br><br>";
    }
    document.getElementById("countIn").innerHTML = lines.length;
    document.getElementById("output").innerHTML = output;

    var btn;
    for(var n=0; n<=currentNum; n++) {
      btn = document.getElementById('copy-'+n);
      btn.addEventListener("click", copyHdlr);
    }
}
function copyHdlr() {
    var num = this.id.substr(5);
    var el = document.getElementById('outputValues-'+num);;
    copyToClipboard(el);
  }

  function copyToClipboard(el) {
    el.select();
    document.execCommand("copy");
  }

  function checkCopyAuto() {
    if (document.getElementById('autoCB').checked)
      copyToClipboard(document.getElementById("outputValues-0"));
  }


function formatValeurJS() {
  document.getElementById("info-bubble").innerHTML =`
<ul>
<li>Ce script permet de formater une colonne de valeur en une ligne de valeur comme suit : 'valeur1', 'valeur2', 'valeur3'</li>
</ul>
`;
    document.getElementById("scripts-container").innerHTML = `
    <div id="ctn">
    <div>
      <label for="inputValues">Entrez les valeurs :</label><br>
      <textarea id="inputValues" rows="20" cols="70" onchange="formatValues(); checkCopyAuto();"></textarea>
      <div id="countIn" class="count"></div>
    </div>
    <label for="autoCB">Copie automatique du Résultat 1 dans le clipboard</label>
    <input id="autoCB" type="checkbox" checked>
    <button type="button" onclick="formatValues()">Convertir</button>
    <button type="button" id="reset" onclick="formatValeurJS()">Reset</button><br><br>

    <div id="count"></div>
    <div id="output"></div>
  </div>
    `;
  }