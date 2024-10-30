import sw from 'star-wars-quotes';
import superheroes, { randomSuperhero } from 'superheroes';
import supervillains, { randomSupervillain } from 'supervillains';
import fs from 'fs';

const quote = sw();
const hero = randomSuperhero();
const villain = randomSupervillain();

console.log("Hello World!");
console.log();
console.log(quote);
console.log();
console.log("----EPIC BATTLE----");
console.log(hero);
console.log();
console.log("VS");
console.log();
console.log(villain);
console.log();

fs.readFile('./data/input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });