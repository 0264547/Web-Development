/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.
document.getElementById("btn").addEventListener("click", function(){
  var n=parseInt(document.getElementById("num").value);
  var primes = sieve(n);
  document.getElementById("primes").textContent = primes.join(", ");
});

var sieve = function (n) {
  "use strict";

  var array = [],
    primes = [],
    i=2,
    j;

  for(let k =0;k<=n;k++){
    array.push(true);
  }

  array[0]=false;
  array[1]=false;

  while (i*i<=n){
    if(array[i]){
      for(j=i*i;j<=n;j+=i){
        array[j]=false;
      }
    }
    i++;
  }

  for(let k=2;k<=n;k++){
    if(array[k]){
      primes.push(k);
    }
  }

  // TODO: Implement the sieve of eratosthenes algorithm to find all the prime numbers under the given number.
  return primes;
};
