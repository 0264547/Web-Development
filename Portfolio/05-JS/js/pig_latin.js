/*
Pig Latin
*/

function igpayAtinlay() {
  // TODO: Initialize the word array properly
  var returnArray = [];
  var wordArray = [];
  sentence=document.getElementById("txtVal").value;
  wordArray = sentence.split(" ");
  // TODO: make sure that the output is being properly built to produce the desired result.
  for (let i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    var beginning = word.charAt(0);
    var start='';

    if (/[aeiouAEIOU]/.test(beginning)) {
      returnArray.push(word+"way");
      continue;
    }

    for (let ii = 1; ii < word.length; ii++) {
      if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
        for(iii=ii;iii<word.length;iii++){
          start+=word.charAt(iii);
        }
        returnArray.push(start+beginning+"ay");
        break;
      } else {
        beginning += word.charAt(ii);
      }
    }
  }
  document.getElementById("pigLatLbl").innerText = returnArray.join(' ');
}

// Some examples of expected outputs
console.log(igpayAtinlay("pizza")); // "izzapay"
console.log(igpayAtinlay("apple")); // "appleway"
console.log(igpayAtinlay("happy meal")); // "appyhay ealmay"
