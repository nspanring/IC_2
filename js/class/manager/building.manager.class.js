const { Building } = require('../building/building.class.js')
class BuildingManager extends CityManager{
  constructor(){
    super();
    this.test();
    // North east south west: more as 2 neighbor = Building dies and turns to Crossing
		// Formel: B > 2N -> C > 1N -> S
  }

  test() {
    // tmp: test
    var position_xy = Animation.grid.getPosition('0,0');
    var firstBuilding = new Building(position_xy[0],position_xy[1],5,100)

    var position_xy = Animation.grid.getPosition('2,0');
    var secondBuilding = new Building(position_xy[0],position_xy[1],6,100)

    var position_xy = Animation.grid.getPosition('7,3');
    var secondBuilding = new Building(position_xy[0],position_xy[1],6,100)
    var position_xy = Animation.grid.getPosition('6,3');
    var secondBuilding = new Building(position_xy[0],position_xy[1],6,100)
    var position_xy = Animation.grid.getPosition('5,3');
    var secondBuilding = new Building(position_xy[0],position_xy[1],6,100)
    var position_xy = Animation.grid.getPosition('6,4');
    var secondBuilding = new Building(position_xy[0],position_xy[1],6,100)
  }

}
exports.BuildingManager = new BuildingManager()
