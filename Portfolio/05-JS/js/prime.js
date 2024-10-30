/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function (n) {
  "use strict";

  var n = parseInt(document.getElementById("num").value);

  function isPrime(n) {
    var i;

    for (i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  var i, sequence = [];
  for (i = 2; i <= Math.sqrt(n); i++) {
    if (isPrime(i) && n%i==0){
      sequence.push(i);
      while(n%i==0){
        n /= i;
      }
    }
  }

  if (isPrime(n) && n>1) sequence.push(n);

  //TODO: Check which numbers are factors of n and also check if
  // that number also happens to be a prime
  document.getElementById("pf").innerText = `The prime factors for this number are: [${sequence.join(', ')}]`;
  return sequence;
};

// the prime factors for this number are: [ 2, 3, 5, 7, 11, 13 ]
console.log(getPrimeFactors(30030));