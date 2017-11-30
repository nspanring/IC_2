const { Building } = require('../building/building.class.js')
class BuildingManager extends CityManager{
  constructor(){
    super();
    this.test();
    // North east south west: more as 2 neighbor = Building dies and turns to Crossing
		// Formel: B > 2N -> C > 1N -> S
  }

  checkBuilding(grid_x, grid_y){
    counter = this.countNeighbours(grid_x, grid_y, 1); // get direct Neighbours

    if(counter['Building'] > 3)console.log(Animation.grid.grid[grid_x][grid_y], '->', 'Crossing');
  }

  test() {
    // tmp: test
    var position_xy = Animation.grid.getPosition('0,0');
    var firstBuilding = new Building(position_xy[0],position_xy[1],1,100)

    var position_xy = Animation.grid.getPosition('2,0');
    var secondBuilding = new Building(position_xy[0],position_xy[1],1,100)

    var position_xy = Animation.grid.getPosition('7,3');
    var secondBuilding = new Building(position_xy[0],position_xy[1],1,100)
    var position_xy = Animation.grid.getPosition('6,3');
    var secondBuilding = new Building(position_xy[0],position_xy[1],1,100)
    var position_xy = Animation.grid.getPosition('5,3');
    var secondBuilding = new Building(position_xy[0],position_xy[1],1,100)
    var position_xy = Animation.grid.getPosition('6,4');
    var secondBuilding = new Building(position_xy[0],position_xy[1],1,100)
  }

}
exports.BuildingManager = new BuildingManager()
