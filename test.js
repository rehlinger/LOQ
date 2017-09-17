// let args = [[23,5,3,2],{value: 2}];

// let broke = function(args) {  
//     let mapz = undefined;  
//     return args[0].map( x => args[0][x]);
// }

// console.log(broke(args)) /*?*/


// function myFunction(...argz) { }
// var args = [0, 1];
// myFunction(-1, ...args, 2, ...[1,9]);

"\n\n\n   gfdgdyt\gfds.b hj.kjhgfdgfd".match(/(gf)/);/*?*/

[6,4,5,8].length - 1;

let cat = {
    size: 23
}

let muffy = Object.create(cat)

muffy.height = 10;

!muffy.hasOwnProperty("size")


var MOUNTAINS = [
    { name: "Kilimanjaro", height: 5895, country: "Tanzania" },
    { name: "Everest", height: 8848, country: "Nepal" },
    { name: "Mount Fuji", height: 3776, country: "Japan" },
    { name: "Mont Blanc", height: 4808, country: "Italy/France" },
    { name: "Vaalserberg", height: 323, country: "Netherlands" },
    { name: "Denali", height: 6168, country: "United States" },
    { name: "Popocatepetl", height: 5465, country: "Mexico" }
];

let name = ["age","name"];

//MOUNTAINS.map(x => x.map(x => x)) /*?*/

let num = "44";

Number("  678")/*?*/

isNaN(num);

///////////////////////---Halo 5 API---////////////////////////////////////
// let gamertag = "IronBoomer"

// let datas = fetch("https://www.haloapi.com/stats/h5/players/"+gamertag+"/matches?modes=arena&start=0&count=30", {
//     method: "get",
//     headers: {
//         "Accept-Language": "en",
//         "Ocp-Apim-Subscription-Key": "611a9f331ac748578ed2ad12aaee9ec6"
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data.Results)
//         addCon(data);
//     });

// function addCon(data) {
//     let maps = [];
//     data.Results.map(x => {
//         x.Teams.map(y => {
//             if (y.Id === x.Players[0].TeamId && y.Rank === 1) {
//                 maps.push(" Win!");} else {}
//             if (y.Id === x.Players[0].TeamId && y.Rank === 2) {
//                 maps.push(" Lose:( ")} else {}
//         });
//     });
//     let para = document.createElement("p");
//     document.body.insertBefore(para, document.querySelector("input")).textContent = "Win/Lose: " + maps;
// } ///////////////////////---Halo 5 API---////////////////////////////////////
let angle1 = 9.23/*?*/
Math.cos(angle1)/*?*/
2-Math.PI/2 /*?*/
if (angle1 > Math.PI) {
    for (let i = 0; angle1 > 1; i++) {
        i/*?*/
        angle1 -= i*Math.PI;/*?*/
    }
}

(Math.acos()) /*?*/


Math.acos(4.63362-Math.PI*3/2); /*?*/
Math.cos(17.2-Math.PI*5)

let y = 10, z = 2, length = 2;
let theta = .23;

x = (y*Math.cos(theta)-Math.sqrt( y*y*Math.cos(theta)*Math.cos(theta)-z^2-length^2 ))/*?*/

Math.cos(1*Math.PI/2)/*?*/