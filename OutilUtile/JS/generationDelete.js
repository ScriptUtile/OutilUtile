function genererRequetesDelete() {
    // Récupération des valeurs saisies par l'utilisateur
    var nomTable        = document.getElementById("nomTable").value.trim().split(",");
    var colonneWhere    = document.getElementById("colonneWhere").value.trim().split(",");
    var where           = document.getElementById("where").value.trim().split("\n").filter(ligne => ligne.trim() !== "");;


    // Création des requêtes SQL
    var requetes = [];
   
        for (var i = 0; i < where.length; i++) {
            requetes.push("DELETE FROM " + nomTable + " where " + colonneWhere + " = '" + where[i] + "';");
        }

    // Affichage des requêtes générées dans la zone de texte
    document.getElementById("resultat").value = requetes.join("\n")
}
  

  function deleteEnMasse() {
    document.getElementById("info-bubble").innerHTML =`
<ul>
<li>Ce script permet de générer en masse des delete</li>
<li>Exemple : </li>
<li>Table à MAJ : appareil</li>
<li>Colonne du where : id_appareil</li>
<li>Clause du where : 7845125 ou colonne de valeur séparée d'un saut de ligne</li>
<li>Résultat : </li>
<li>DELETE FROM appareil where id_appareil = '7845125';</li>
</ul>
`;
    document.getElementById("scripts-container").innerHTML = `
    <div id="ctn">
        <h2>Création de requêtes SQL DELETE</h2>
        <label for="nomTable">Table à mettre à jour :</label>
        <input type="text" id="nomTable"><br><br>

        <label for="colonneWhere">Colonnes du WHERE :</label>
        <input type="text" id="colonneWhere"><br><br>

        <label for="where">Clause WHERE :</label><br>
        <textarea id="where" rows="10" cols="70"></textarea><br><br>

        <button onclick="genererRequetesDelete()">Générer les requêtes</button><br><br>

        <textarea id="resultat" rows="10" cols="70"></textarea>
    </div>
    `;
  }