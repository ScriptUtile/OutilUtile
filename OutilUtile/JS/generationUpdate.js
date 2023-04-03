function genererRequetesUpdate() {
    // Récupération des valeurs saisies par l'utilisateur
    var nomTable        = document.getElementById("nomTable").value.trim().split(",");
    var colonneWhere    = document.getElementById("colonneWhere").value.trim().split(",");
    var colonnes        = document.getElementById("colonnes").value.trim().split(",");
    var valeursTableau  = document.getElementById("valeurs").value.trim().split("\n").filter(ligne => ligne.trim() !== "");;
    var where           = document.getElementById("where").value.trim().split("\n").filter(ligne => ligne.trim() !== "");;

    // Vérification du nombre de valeurs saisies pour les colonnes et les valeurs
    // if (colonnes.length !== valeurs.length) {
    // 	alert("Le nombre de colonnes et de valeurs doit être identique !");
    // 	return;
    // }

    // // Vérification du nombre de valeurs saisies pour la clause WHERE
    // if (where.length > 1 && where.length !== valeurs.length) {
    // 	alert("Le nombre de valeurs de la clause WHERE doit être égal à 1 ou au nombre de valeurs saisies pour les colonnes et les valeurs !");
    // 	return;
    // }

    // Création des requêtes SQL
    var requetes = [];
    console.log(valeursTableau[0]); 
    console.log(valeursTableau[0].length == 4); 
    // console.log(toString(valeursTableau[0]) = 'null');
    if (where.length == 1 && valeursTableau[0].length != 4) {
        for (var i = 0; i < valeursTableau.length; i++) {
            requetes.push("UPDATE " + nomTable + " SET " + colonnes + " = '" + valeursTableau[i] + "' where " + colonneWhere + " = '" + where + "';");
        }
    } else if (valeursTableau.length == 1) {
        for (var i = 0; i < where.length; i++) {
            if (valeursTableau[0].length == 4) {
                console.log('RLY ??')
                requetes.push("UPDATE " + nomTable + " SET " + colonnes + " = " + valeursTableau + " where " + colonneWhere + " = '" + where[i] + "';");
            } else {
                requetes.push("UPDATE " + nomTable + " SET " + colonnes + " = '" + valeursTableau + "' where " + colonneWhere + " = '" + where[i] + "';");
            }
            
        }
    }
        else if ((valeursTableau.length > 1 & where.length > 1) & valeursTableau.length == where.length) {
            for (var i = 0; i < where.length; i++) {
                requetes.push("UPDATE " + nomTable + " SET " + colonnes + " = '" + valeursTableau[i] + "' where " + colonneWhere + " = '" + where[i] + "';");
            }
        }
            else {
                requetes.push('Problème de valeurs \n');
                requetes.push('Les zones de texte Valeurs et clause WHERE doivent avoir soit : \n');
                requetes.push('- Le même nombre de valeurs \n');
                requetes.push('- Le tableau de valeur = 1 et where = autant que nécéssaire \n');
                requetes.push('- Le tableau de valeur = autant que nécéssaire et where = 1 \n');
            }
    

    

    // Affichage des requêtes générées dans la zone de texte
    document.getElementById("resultat").value = requetes.join("\n")
}
  

  function updateEnMasse() {
    document.getElementById("info-bubble").innerHTML =`
    <ul>
    <li>Ce script permet de générer en masse des update</li>
    <li>Exemple : </li>
    <li>Table à MAJ : appareil</li>
    <li>Colonne à MAJ : id_appareil_parent</li>
    <li>Valeurs à MAJ : 7845125 ou colonne de valeur séparée d'un saut de ligne</li>
    <li>Colonne du where : id_appareil</li>
    <li>Clause du where : 2578451 ou colonne de valeur séparée d'un saut de ligne</li>
    <li>Résultat : </li>
    <li>UPDATE appareil SET id_appareil_parent = '2578451' where id_appareil = '7845125';</li>
    <li>NB : Vous pouvez mettre une valeur unique pour la valeur à MAJ ou la clause du where, ça générera des requêtes avec une seule variable changeante.</li>
    <li>Si vos deux valeurs doivent changer à chaque requête, le nombre de valeur dans les deux tableaux doit être identique</li>
    </ul>
    `;
    document.getElementById("scripts-container").innerHTML = `
    <h1>Création de requêtes SQL UPDATE</h1>
    <p for="nomTable">Table à mettre à jour :</p>
	<input type="text" id="nomTable"><br><br>

	<p>Colonne à mettre à jour :</p>
	<input type="text" id="colonnes"><br><br>

	<p>Valeurs à mettre à jour :</p>
	<textarea id="valeurs" rows="10" cols="50"></textarea>

    <p>Colonnes du WHERE :</p>
	<input type="text" id="colonneWhere"><br><br>

	<p>Clause WHERE :</p>
	<textarea id="where" rows="10" cols="50"></textarea><br><br>

	<button onclick="genererRequetesUpdate()">Générer les requêtes</button><br><br>

	<textarea id="resultat" rows="10" cols="80"></textarea>

    `;
  }