//4.1 Use reduce and concat to flatten an array of arrays into 1 array 
/*
let arrays = [[1,2,3],[4,5],[6]];

arrays.reduce( (x,y) => {return x.concat(y);});

//4.2 Compute the average age of mothers when given birth from given dataset
//Import dataset
let ancestryOrg = require('./Exercise 4 - ancestry.js');
try {
  var ancestry = JSON.parse(ancestryOrg);
} catch (x) {console.error(x)}

function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
}

//Create object that holds array data by name property
var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

function avgMomAge(arr, str) {
  return average(arr.filter( x => {return byName[x.mother] !== undefined;}).map( function (x) {return x.born - byName[x.mother].born;}));
}

//console.log(avgMomAge(ancestry));

//Output the average age per century in the given data set

function generateGroup(x) {
  return Math.ceil(x / 100);
}

function gensOut(arr) { 
  let obj = {};
  arr.map(x => {
    if (obj[generateGroup(x.died)] === undefined) {
      obj[generateGroup(x.died)] = [(x.died - x.born)];
    } else { obj[generateGroup(x.died)].push(x.died - x.born)  }
  })
  for (let prop in obj) {
  console.log(prop+":", average(obj[prop]))
  }
}

gensOut(ancestry);

function groupBy(f, arr) {
  let obj = {};
  arr.map(x => {
    if (obj[f(x.died)] === undefined) {
      obj[f(x.died)] = [x.name];
    } else { obj[f(x.died)].push(x.name)  }
  })
  return obj
}

groupBy(generateGroup, ancestry)

//Create an implementation of the every and some functions on arrays. 
//Every = All items in array === true = True
function every(arr, chk) {
  return arr.map( x => { 
    if(typeof(x) === "object") {
      return every(x, chk);
    } else {
      if(chk(x)) {return true;} else {return false;}
    }
  }).reduce( (x,y) => { if (x === true) {return x = y;} else {return false;} })
}
console.log(every([NaN, [NaN,[NaN,NaN,NaN],NaN], NaN], isNaN));

console.log(every([NaN, NaN, 4], isNaN));

//Some = Any items in array === true = True
function some(arr, chk) {
  return arr.map( x => { 
    if(typeof(x) === "object") {
      return some(x, chk);
    } else {
      if(chk(x)) {return true;} else {return false;}
    }
  }).reduce( (x,y) => { if (x === true) {return true;} else {return x = y;} })
}

//console.log(some([NaN, 3, 4], isNaN));
//console.log(some([4, 4, 4], isNaN));

*/