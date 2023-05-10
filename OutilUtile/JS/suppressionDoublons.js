function runSupprDoublons() {
  var input = document.getElementById("inputValues").value.trim();
  var lines = input.split("\n");
  
  // supprime les doublons
  var resDuplicates = removeDuplicatesPlus(lines);
  var uniqueArr = resDuplicates[0];
  var doublonsArr = resDuplicates[1];

  var output = "";
  // résultat sans doublons
  output += "<label for='outputValues'>Résultat sans les doublons :</label><br>";
  output += "<textarea id='outputValues' rows='15' cols='70' readonly>";
  for (let i = 0; i < uniqueArr.length; i++) {
    output += uniqueArr[i] + "\n";
  }
  output += "</textarea>";
  output += "<div id='count' class='count'>"+uniqueArr.length+"</div>";


  // doublons supprimés
  output += "<br><label for='doublonsValues'>Doublons supprimés :</label><br>";
  output += "<textarea id='doublonsValues' rows='5' cols='70' readonly>";
  for (let i = 0; i < doublonsArr.length; i++) {
    output += doublonsArr[i] + "\n";
  }
  output += "</textarea>";
  output += "<div id='doublonsCount' class='count'>"+doublonsArr.length+"</div>";


  document.getElementById("countIn").innerHTML = lines.length;
  document.getElementById("output").innerHTML = output;

  console.log('lines', lines);
  console.log('uniqueArr', uniqueArr);
  console.log('doublonsArr', doublonsArr);
}

function supprDoublons() {
    document.getElementById("info-bubble").innerHTML =`
  <ul>
  <li>Ce script retourne la liste de valeurs entrées allégée de ses doublons.</li>
  <li>Une valeur par ligne</li>
  </ul>
  `;
  document.getElementById("scripts-container").innerHTML = `
  <h2>Suppression de doublons</span></h2>
  <div id="ctn">
  <div>
    <label for="inputValues">Entrez les valeurs :</label><br>
    <textarea id="inputValues" rows="20" cols="70" onchange="runSupprDoublons(); /*checkCopyAuto();*/"></textarea>
    <div id="countIn" class="count"></div>
  </div>
<!--  <label for="autoCB">Copie automatique du Résultat 1 dans le clipboard</label>
  <input id="autoCB" type="checkbox" checked>-->
  <button type="button" onclick="runSupprDoublons()">Supprimer les doublons</button>
  <button type="button" id="reset" onclick="supprDoublons()">Reset</button><br><br>

  <div id="count"></div>
  <div id="output"></div>
</div>
  `;
}
