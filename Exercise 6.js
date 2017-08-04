//6.1 Create a smarter plant eater that reprouces slower and allows the plants to never leave.
//Create a target property of the plant eater, slightly reduced intial reproduction energy.
/*
function SmartPlantEater() {
    this.energy = 30;
    this.target = "n";
}

//Using standard plant eater act method with the modification that
//planteaters are allowed to eat only if the plant it is targeting has more than 1 nearby plant
//planteaters also require more energy to reproduce
SmartPlantEater.prototype.act = function(view) {
    var space = view.find(" ");
    if (this.energy > 90 && space) 
      return {type: "reproduce", direction: space};
    var plant = view.find("*");
    var endangered = false;
    if (plant) {
        this.target = view.vector.plus(directions[plant]);
        let plantView = new View(view.world, this.target)
        if (plantView.findAll("*").length <= 2) {
            endangered = true;
        }
    }
    if (plant && !endangered)
      return {type: "eat", direction: plant};
    if (space)
      return {type: "move", direction: space};
}
*/
//6.2 Create a predator for the plantEater called Tiger
/*
function SmartPlantEater() {
    this.energy = 30;
    this.target = "n";
}

//Using standard plant eater act method with the modification that
//planteaters are allowed to eat only if the plant it is targeting has more than 1 nearby plant
//planteaters also require more energy to reproduce
SmartPlantEater.prototype.act = function(view) {
    var space = view.find(" ");
    if (this.energy > 65 && space) //decrease starting energy
      return {type: "reproduce", direction: space};
    var plant = view.find("*");
    var endangered = false;
    if (plant) {
        this.target = view.vector.plus(directions[plant]);
        let plantView = new View(view.world, this.target)
        if (plantView.findAll("*").length <= 1) { //Remove picky eating requirment to stop from only eating the last plant in a bush
            endangered = true;
        }
    }
    if (plant && !endangered)
      return {type: "eat", direction: plant};
    if (space)
      return {type: "move", direction: space};
}
function Tiger() {
    this.energy = 120;
}

Tiger.prototype.act = function(view) {
    var space = view.find(" ");
    if (this.energy > 240 && space) //hard time surviving reproduction!
        return {type: "reproduce", direction: space};
    var plantEater = view.find("O");
    if (plantEater)
        var attackHit = false;
        if (Math.random() > .75) //slippery plantEaters!
            return {type: "eat", direction: plantEater};
    if (space)
        return {type: "move", direction: space};
  }
}

*/