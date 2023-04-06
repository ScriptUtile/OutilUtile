
function comparerDiff() {
    let tableau1 = document.getElementById("tableau1").value.split("\n").filter(ligne => ligne.trim() !== "");
    let tableau2 = document.getElementById("tableau2").value.split("\n").filter(ligne => ligne.trim() !== "");
    let resultat = comparerTableauxDiff(tableau1, tableau2);
    document.getElementById("resultat").value = resultat.join("\n");
  }
  
  function comparerTableauxDiff(tableau1, tableau2) {
    let resultat = [];
    for (let element of tableau1) {
      if (!tableau2.includes(element)) {
        resultat.push(element);
      }
    }
    for (let element of tableau2) {
      if (!tableau1.includes(element)) {
        resultat.push(element);
      }
    }
    return resultat;
  }
  
  function compareTabV2Diff() {
    document.getElementById("info-bubble").innerHTML =`
<ul>
<li>Ce script permet de comparer les valeurs de deux tableaux et de donner les valeurs qui ne sont pas communes aux deux.</li>
</ul>
`;
    document.getElementById("scripts-container").innerHTML = `
    <h2>Comparaison de tableaux : éléments différents</h2>
    <!--<div class="tout">-->
    <div id="ctn">
      <label for="tableau1">Entrez les éléments des deux tableaux à comparer, un par ligne :</label>
      <textarea id="tableau1" rows="20" cols="25"></textarea>
      <textarea id="tableau2" rows="20" cols="25"></textarea><br />
        <button onclick="comparerDiff()">Comparer</button><br />
        <br>
        <label for="resultat">Résultat :</label><br>
        <textarea id="resultat" rows="18" cols="54"></textarea>
    </div>
    `;
  }