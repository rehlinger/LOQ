//1.1 Create 7 lines pound signs, with each new line having an additional sign.

/*
let str = "#"
for (let i = 0; i<7; i++) {
    console.log(str);
    str += "#"
}


//1.2 Write a program that logs the numbers 1-100. If the number is divisible by 3 output "Fizz", if number is divisible by 5 (but not 3) output "Buzz"
for(let i=1; i<=100; i++){
    i % 3 === 0 ? console.log("Fizz") : i % 5 === 0 ? console.log("Buzz") : console.log(i)
}


//Modify above to print FizzBuzz when number is divisible by both 3&5

for (let i=1; i<=100; i++) {
    switch (i % 3) {
        case (0) : 
        i % 5 === 0 ? console.log("FizzBuzz") : console.log("Fizz")
        break
    }
    i % 5 === 0 ? console.log("Buzz") : console.log(i)
}


//1.3 Create an 8x8 chessboard pattern using pound signs
for (let i =0; i<8; i++) {
    str = ""
    for (let col = 0; col<8; col++) {
        if (col % 2 === 0) { 
        i % 2 === 0 ? str += " " : str += "#" 
        } else { 
        i % 2 === 0 ? str += "#" : str += " " 
        }
    }
    console.log(str)
}

*/

