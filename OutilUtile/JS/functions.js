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

/// retourne le tableau en supprimant ses doublons. Les doublons sont retournés dans un 2e tableau
function removeDuplicatesPlus(array) { 
  let uniqueArray = []; 
  let doublonsArr = []; 
  for (let i = 0; i < array.length; i++) { 
    if (uniqueArray.indexOf(array[i]) === -1)  { 
      uniqueArray.push(array[i]); 
    } else {
      if(!doublonsArr.includes(array[i])) doublonsArr.push(array[i]);
    } 
  } 
  return [uniqueArray, doublonsArr]; 
}