//10.1 Write module that converts month numbers to names / names to numbers
/*(function(exports) {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    exports.name = function(number) {
        return months[number];    
    };
    exports.number = function(name) {
        return months.indexOf(name);    
    };
})(this.month = {});

console.log(month.name(3));
console.log(month.number("April"));
*/

let month = (function() {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    return {
        name: function(number) {return months[number]},   
        number: function(name) {return months.indexOf(name)}
    };
})();

console.log(month.name(3));
console.log(month.number("May"));

//10.2 Break up the following into modules if possible
//World Module
World
Wall
charFromElement
elementFromChar
LifelikeWorld
randomElement
View
dirPlus
//Grid Module
Grid
Vector
directions
directionNames
//Characters Module
WallFollower
PlantEater
SmartPlantEater
Tiger
BouncingCritter
Plant

//10.3 Circular dependencies
"Have the require function check newly imported modules for duplication"