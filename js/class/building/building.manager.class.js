const { Building } = require('./building.class.js')
class BuildingManager {
  constructor(){
    this.test();
  }

  test() {
    // tmp: test
    var position_xy = Animation.grid.getPosition('0,0');
    var firstBuilding = new Building(position_xy[0],position_xy[1],5,100)

    var position_xy = Animation.grid.getPosition('2,0');
    var secondBuilding = new Building(position_xy[0],position_xy[1],6,100)

    var position_xy = Animation.grid.getPosition('7,3');
    var secondBuilding = new Building(position_xy[0],position_xy[1],6,100)
  }
}
exports.BuildingManager = BuildingManager
