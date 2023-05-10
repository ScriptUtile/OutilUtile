function handleFileSelect(evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        var csvData = event.target.result;
        var data = Papa.parse(csvData, {header: true});
        var tableName = document.getElementById('table-name').value;
        if (tableName === '') {
            alert('Veuillez saisir le nom de la table');
            return;
        }
        var insertStatements = [];
        data.data.forEach(function(row) {
            var columns = Object.keys(row);
            var values = columns.map(function(column) {
                if (row[column] === '') {
                    return 'NULL';
                } else {
                    return "'" + row[column] + "'";
                }
            });
            var insertStatement = 'INSERT INTO ' + tableName + ' (' + columns.join(', ') + ') VALUES (' + values.join(', ') + ')';
            insertStatements.push(insertStatement);
        });
        console.log(insertStatements.join('\n'));
        document.getElementById("resultat").value = insertStatements.join(';\n')
    };
    reader.readAsText(file);
}



function insertCSV() {
    document.getElementById("info-bubble").innerHTML =`
    <ul>
    <li>Ce script permet de générer en masse des inserts</li>
    </ul>
    `;
    document.getElementById("scripts-container").innerHTML = `
    <input type="file" id="csv-file">
    <input type="text" id="table-name" placeholder="Nom de la table"></input>
    <textarea id="resultat" rows="10" cols="70"></textarea>
    `;
    document.getElementById('csv-file').addEventListener('change', handleFileSelect, false);
    
  }

