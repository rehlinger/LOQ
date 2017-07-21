/*
//2.1 Write a function that will return the smallest of two given numbers
function min(x, y) {
    if (x < y) {
        return x
    } return y
}

console.log(min(0, 10));
console.log(min(0, -10));

//2.2 Return a boolean of whether an inputted number is even recursively
function isEven(x) {
    if (x === 0) {
        return true
    }
    if (x === 1) {
        return false
    }
    if (x > 1) {
        return (isEven(x-2))
    }
}

    //Fix previous to handle negative numbers
    function isEven(x) {
        x = Math.abs(x)
        if (x === 0) {
            return true
        }
        if (x === 1) {
            return false
        }
        if (x > 1) {
            return (isEven(x-2))
        }
    }

//2.3 Write function that takes a string and returns how many upper B's
function countBs(str) {
    let num = 0;
    for (let i = 0; i <= str.length-1 ; i++) {
        if (str.charAt(i) === "B") {
            num += 1;
        }
    }
    return num
}

    //2.4 Rewrite countBs to check for any char
    function countChar(str, chk) {
        let num = 0;
        for (let i = 0; i <= str.length-1 ; i++) {
            if (str.charAt(i) === chk) {
                num += 1;
            }
        }
        return num
    }
*/