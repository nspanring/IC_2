const { Building } = require('./building.class.js')
class BuildingManager {
  constructor(){
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
  }

  getNeighbours(grid_x, grid_y){
    var building_c = 0;
    var crossing_c = 0;
    var street_c = 0;
    for (var x = -1; x <= 1; x++) {
      for (var y = -1; y <= 1; y++) {
        if(y == 0 || x == 0) {// count only direc neighbors
          switch (Animation.grid.grid[grid_x + x][grid_y + y].constructor.name) {
            case 'Building':
                building_c++;
              break;
            case 'Crossing':
                crossing_c++;
              break;
            case 'Street':
                street_c++;
              break;
          }
        }
      }
    }
    switch (Animation.grid.grid[grid_x][grid_y].constructor.name) {
      case 'Building':
        if(building_c > 3) // Building tourns to Crossing
        console.log(Animation.grid.grid[grid_x][grid_y], '->', 'Crossing');
        break;
      case 'Crossing':
        if(crossing_c > 3) // Crossing trouns to Building
        console.log(Animation.grid.grid[grid_x][grid_y], '->', 'Building');
        break;
      case 'Street':
        if(building_c > 4) // Street tourns to Crossing (makes sense i quess)
        console.log(Animation.grid.grid[grid_x][grid_y], '->', 'Street');
        break;
    }
    return 1;
  }
}
exports.BuildingManager = BuildingManager
