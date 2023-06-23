function supprimeDuTableau_process() {
  let tableau1 = document.getElementById("tableau1").value.split("\n").filter(ligne => ligne.trim() !== "");
  let tableau2 = document.getElementById("tableau2").value.split("\n").filter(ligne => ligne.trim() !== "");
  let resultat = deleteValuesFromArray(tableau1, tableau2);
  document.getElementById("resultat").value = resultat.join("\n");
  
  document.getElementById("countIn1").innerHTML = tableau1.length;
  document.getElementById("countIn2").innerHTML = tableau2.length;
  document.getElementById("countRes").innerHTML = resultat.length;
}
  
function deleteValuesFromArray(tab1, tab2) {
  var resultat = [];
  // Parcourir le premier tableau
  for (var i = 0; i < tab1.length; i++) {
    // Si l'élément n'est pas présent dans le deuxième tableau
    if (tab2.indexOf(tab1[i]) === -1) {
    // Ajouter l'élément au tableau résultat
    resultat.push(tab1[i]);
    }
  }
  return resultat;
}
  
function supprimeDuTableau() {
  document.getElementById("info-bubble").innerHTML =`
  <ul>
  <li>Ce script retourne le tableau1 sans les valeurs données dans le tableau2.</li>
  <li>Entrer une valeur par ligne</li>
  </ul>
  `;
  document.getElementById("scripts-container").innerHTML = `
  <h2>Supprime les valeurs du tableau</h2>
  <!--<div class="tout">-->
  <div id="ctn">
    <div>
      <label for="tableau1">Entrez les éléments du tableau :</label>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <label for="tableau2">Entrez les éléments à supprimer :</label>
    </div>
    <textarea id="tableau1" rows="20" cols="30"></textarea>
    <div id="countIn1" class="count"></div>
    <textarea id="tableau2" rows="20" cols="30"></textarea><br />
    <div id="countIn2" class="count"></div>
    <button onclick="supprimeDuTableau_process()">Epurer</button>
    <button onclick="supprimeDuTableau()">Reset</button><br>
      <br>
    <div>
      <label for="resultat">Tableau épuré :</label>
    <textarea id="resultat" rows="18" cols="64"></textarea>
    <div id="countRes" class="count"></div>
    </div>
  </div>
  `;
}
