//1.1 Create 7 lines of pound signs, with each new line having an additional sign.
/*
let str = "";
for (let i = 0; i<7; i++) {    
    str += "#";
    console.log(str);
}
*///1.2 Write a program that logs the numbers 1-100. If the number is divisible by 3 output "Fizz". 
//If number is divisible by 5 (but not 3) output "Buzz"
/*
for(let i=1; i<=100; i++){
    i % 3 === 0 ? console.log("Fizz") : i % 5 === 0 ? console.log("Buzz") : console.log(i)
}

//Modify above to print FizzBuzz when number is divisible by both 3&5
for (let i=1; i<=100; i++) {
    if (i % 3 === 0) {
        i % 5 === 0 ? console.log("FizzBuzz") : console.log("Fizz");
    }
    i % 5 === 0 ? console.log("Buzz") : console.log(i);
}
*///1.3 Create an 8x8 chessboard pattern using pound signs
/*
for (let y =0; y<8; y++) {
    let str = "";
    for (let x = 0; x < 8; x++) {
        if (x % 2 === 0) { 
        y % 2 === 0 ? str += " " : str += "#" ;
        } else { 
        y % 2 === 0 ? str += "#" : str += " "; 
        }
    }
    console.log(str);
}
*/

