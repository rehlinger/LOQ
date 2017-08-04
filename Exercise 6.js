//Create a smarter plant eater that reprouces slower and allows the plants to never leave.
//Create a target property of the plant eater, slightly reduced intial reproduction energy.
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
    var cluster = false;
    if (plant) {
        this.target = view.vector.plus(directions[plant]);
        let plantView = new View(view.world, this.target)
        if (plantView.findAll("*").length <= 2) {
            cluster = true;
        }
    }
    if (plant && !cluster)
      return {type: "eat", direction: plant};
    if (space || cluster)
      return {type: "move", direction: space};
}
