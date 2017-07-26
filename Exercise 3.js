//3.1 Create range function that returns an array containing all the numbers from first to second arguments
/*
function range(x, y) {
    let arr = [];
    for (x; x <= y; x += 1) {
        arr.push(x);
    }
    return arr;
}

console.log(range(1, 10));

*///3.2 Create a sum function the takes an array and sums the array
/*
function sum(arr) {
    return arr.reduce( (x,y) => {return y += x}, 0)
}

*///3.3 Modify range to include a step size upon each array increment
/*
function range(x, y, step) {
    arr = [];
    if (step === undefined) {x <= y ? step = 1 : step = -1 }
    if (x > y) {
        for (x; x >= y; x += step) {
            arr.push(x);
        }
    } else {
        for (x; x <= y; x += step) {
        arr.push(x);
        }
    }
    return arr;
} 

*///3.4 Create a function that reverses an array and outputs a new array and a function that reverses an array in place
/*
function reverseArray(arr) {
    let nArr = [];
    arr.map( x => {nArr.unshift(x);});
    return nArr;
}

function reverseArrayInPlace(arr) {
    let nArr = reverseArray(arr);
    for (let i = 0; i < nArr.length; i++) {
        arr[i] = nArr[i];
    }
    return arr;
}
var arrayValue = [1, 2, 3, 4, 5];
console.log(reverseArray(["A", "B", "C"]));
reverseArrayInPlace(arrayValue);
console.log(arrayValue);

*///3.5 Function the builds a list structure from an array and a function that takes a list and converts to an array.
//Write a helper function which creates a new list and adds the element to front and another that returns the element given at a supplied list position.
/*
function arrayToList(arr) {
    if (arr[0] === undefined) {
        return undefined;
    } else {
        let list = {
            value: arr[0],
            rest: arrayToList(arr.slice(1))
        };
        return list;
    }
}

arrayToList([10,20]);
console.log(JSON.stringify(arrayToList([3,4,5])));

function listToArray(list) {
    let arr = [];
    function rec(list) {
        if (list === undefined) {
            return undefined;
        }
        arr.push(list.value);
        rec(list.rest);
    }
    rec(list);
    return arr;
}

console.log(listToArray(arrayToList([10,20,30])));

function prepend(val, list) {
    let lst = arrayToList([val]);
    lst.rest = list;
    return lst;
}

console.log(prepend(10, prepend(20, undefined)));

function nth(list, int) {
    let arr = listToArray(list);
    return arr[int];
}

console.log(nth(arrayToList([10, 20, 30, 90]), 3));

*///3.6 Write a deep comparison function that compares objects by their values
/*
function deepEqual(obj1, obj2) {
    if (typeof(obj1) === typeof(obj2)) { 
        //Check arguments for equality (excluding objects as they are considered false when compared)
        if (obj1 === obj2) {
            return true;
        }
        //Check arguments for number inequality (excluding objects)
        if (obj1 !== obj2 && (typeof obj1 !== "object" || typeof obj2 !== "object" )) { 
            return false;
        }
        //Compare object property amounts
        let propsOf1 = 0, propsOf2 = 0;
        for (let prop in obj1) {
            propsOf1 += 1;
        }
        for (let prop in obj2) {
            propsOf2 += 1;
            //Compare property equality recursively
            if (!deepEqual(obj1[prop], obj2[prop])) {  
                return false;
            } 
        }
        return (propsOf1 === propsOf2);
    } else { 
        return false;
    }
}

var obj1 = {new: 2, here: 8};
(typeof obj1);
var obj2 = {here: 8, object: 2};

console.log(deepEqual(obj1, obj2));
*/
