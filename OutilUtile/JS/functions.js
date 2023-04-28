// copie le contenu de l'élément dans le presse-papier
function copyToClipboard(el) {
    el.select();
    document.execCommand("copy");
  }

/// retourne le tableau en supprimant ses doublons
function removeDuplicates(array) { 
  let uniqueArray = []; 
  for (let i = 0; i < array.length; i++) { 
    if (uniqueArray.indexOf(array[i]) === -1)  { 
      uniqueArray.push(array[i]); 
    } 
  } 
  return uniqueArray; 
}