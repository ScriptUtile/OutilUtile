  
function generateCSV() {
  // Récupération des noms de colonnes
  let columnNames = document.getElementById("columnNames").value.split(",");
  // Récupération des valeurs
  let values = document.getElementById("values").value.split("\t");
  
  // Création du contenu du fichier CSV
  let csvContent = "data:text/csv;charset=utf-8," + columnNames.join(";") + "\n" + values.join(";");
  
  // Création d'un élément lien pour télécharger le fichier CSV
  let encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  let fileName =  document.getElementById("fileName").value;
  if((fileName.length - fileName.indexOf('.csv')) != 4 ) fileName += ".csv";
  link.setAttribute("href", encodedUri);
  // link.setAttribute("download", "data.csv");
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  
  // Téléchargement du fichier CSV
  link.click();
}




function creationCSV() {
  document.getElementById("info-bubble").innerHTML =`
<ul>
<li>Ce script permet de générer un fichier CSV à partir de copier/coller depuis le Résultat de requête de SQL Developer.</li>
</ul>
`;
    document.getElementById("scripts-container").innerHTML = `
    <h2>Création CSV</h2>
    <div id="ctn">
      <label for="columnNames">Noms des colonnes :</label><br>
      <textarea id="columnNames" rows="4" cols="70"></textarea><br><br>
      <label for="values">Valeurs :</label><br>
      <textarea id="values" rows="20" cols="70"></textarea><br><br>
      <label for="fileName">Nom du fichier :</label><br>
      <input type="text" id="fileName" value="data.csv">
      <br><br>
      <button onclick="generateCSV()">Générer le fichier CSV</button>
    </div>
    `;
  }