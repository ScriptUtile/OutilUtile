
function comparerDiff() {
    let tableau1 = document.getElementById("tableau1").value.split("\n").filter(ligne => ligne.trim() !== "");
    let tableau2 = document.getElementById("tableau2").value.split("\n").filter(ligne => ligne.trim() !== "");
    let resultat = comparerTableauxDiff(tableau1, tableau2);
    document.getElementById("resultat1").value = resultat[0].join("\n");
    document.getElementById("resultat2").value = resultat[1].join("\n");
    
    document.getElementById("countIn1").innerHTML = tableau1.length;
    document.getElementById("countIn2").innerHTML = tableau2.length;
    document.getElementById("countRes1").innerHTML = resultat[0].length;
    document.getElementById("countRes2").innerHTML = resultat[1].length;


  }
  
  // function comparerTableauxDiff(tableau1, tableau2) {
  //   let resultat = [];
  //   for (let element of tableau1) {
  //     if (!tableau2.includes(element)) {
  //       resultat.push(element);
  //     }
  //   }
  //   for (let element of tableau2) {
  //     if (!tableau1.includes(element)) {
  //       resultat.push(element);
  //     }
  //   }
  //   return resultat;
  // }

  		function comparerTableauxDiff(tab1, tab2) {
      var resultat1 = [];
      var resultat2 = [];
      // Parcourir le premier tableau
      for (var i = 0; i < tab1.length; i++) {
        // Si l'élément n'est pas présent dans le deuxième tableau
        if (tab2.indexOf(tab1[i]) === -1) {
        // Ajouter l'élément au tableau résultat
        resultat1.push(tab1[i]);
        }
      }
      // Parcourir le deuxième tableau
      for (var j = 0; j < tab2.length; j++) {
        // Si l'élément n'est pas présent dans le premier tableau
        if (tab1.indexOf(tab2[j]) === -1) {
        // Ajouter l'élément au tableau résultat
        resultat2.push(tab2[j]);
        }
      }
      return [resultat1, resultat2];
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
      <textarea id="tableau1" rows="20" cols="30"></textarea>
      <div id="countIn1" class="count"></div>
      <textarea id="tableau2" rows="20" cols="30"></textarea><br />
      <div id="countIn2" class="count"></div>
      <button onclick="comparerDiff()">Comparer</button><br />
        <br>
      <div id="cols">
        <label for="resultat1">Eléménts uniquement dans le tableau1 :</label>
      <textarea id="resultat1" rows="20" cols="30"></textarea>
      <div id="countRes1" class="count"></div>
      <label for="resultat2">Eléménts uniquement dans le tableau2 :</label>
      <textarea id="resultat2" rows="20" cols="30"></textarea><br />
      <div id="countRes2" class="count"></div>
      </div>
    </div>
    `;
  }