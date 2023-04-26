/// retourne un tableau en supprimant les doublons
function removeDuplicates(array) { 
  let uniqueArray = []; 
  for (let i = 0; i < array.length; i++) { 
    if (uniqueArray.indexOf(array[i]) === -1)  { 
      uniqueArray.push(array[i]); 
    } 
  } 
  return uniqueArray; 
}



function runSupprDoublons() {
  var input = document.getElementById("inputValues").value.trim();
  var lines = input.split("\n");
  
  /// supprime les doublons
  var uniqueArr = removeDuplicates(lines);

  var output = "";
 
 
 /*
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
*/

  output += "<label for='outputValues'>Résultat</label><br>";
  // output += "<textarea id='outputValues' rows='5' cols='70' readonly>" + uniqueArr + "</textarea>";
  output += "<textarea id='outputValues' rows='5' cols='70' readonly>";
  for (let i = 0; i < uniqueArr.length; i++) {
    output += uniqueArr[i] + "\n";
  }

  output += "</textarea>";
  output += "<div id='count' class='count'>"+uniqueArr.length+"</div>";
  // output += "<button id='copy-"+currentNum+"'>Copier</button><br><br>";


  document.getElementById("countIn").innerHTML = lines.length;
  document.getElementById("output").innerHTML = output;

  /*
  var btn;
  for(var n=0; n<=currentNum; n++) {
    btn = document.getElementById('copy-'+n);
    btn.addEventListener("click", copyHdlr);
  }
  */

  console.log('lines', lines);
  console.log('uniqueArr', uniqueArr);
}



function supprDoublons() {
    document.getElementById("info-bubble").innerHTML =`
  <ul>
  <li>A venir</li>
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
