const { Building } = require('../building/building.class.js')
class BuildingManager extends CityManager{
  constructor(){
    super();

    this.network['Building'] = [];
    this.network_id_c = 1;

    // North east south west: more as 2 neighbor = Building dies and turns to Crossing
		// Formel: B > 2N -> C > 1N -> S

    this.test();
  }

  addBuilding(grid_x, grid_y, floors = 1, size = 100){
    var position_xy = Animation.grid.getPosition(grid_x+','+grid_y);
    this.network['Building'][this.network_id_c] = new Building(this.network_id_c++, position_xy[0],position_xy[1],floors,size)

    this.checkBuilding(grid_x, grid_y, 1);
  }

  removeBuilding(grid_x, grid_y){
    if(Animation.grid.grid[grid_x][grid_y] !== undefined){
      if(Animation.grid.grid[grid_x][grid_y].constructor.name == 'Building'){
        Animation.scene.remove(Animation.grid.grid[grid_x][grid_y].group);
        this.network['Building'][Animation.grid.grid[grid_x][grid_y].ID] = undefined;
  			Animation.grid.removeFromGrid(grid_x,grid_y)
      }
    }
    this.checkBuilding(grid_x, grid_y, 1);
  }

  checkBuilding(grid_x, grid_y, update = 0){
    var neighbors = this.getNeighbours(grid_x, grid_y, 1);
    if(update == 1){ // trigger to let the buildings around also check their surroundings
      for (var i = 0; i < neighbors.length; i++) {
        if(Animation.grid.grid[grid_x][grid_y] !== undefined){
          if(Animation.grid.grid[grid_x][grid_y].constructor.name == 'Building')
          this.checkBuilding(neighbors[i].grid_x, neighbors[i].grid_y); // without update flag

          if(Animation.grid.grid[grid_x][grid_y].constructor.name == 'Crossing')
          TrafficManager.checkCrossing(neighbors[i].grid_x, neighbors[i].grid_y);
          //if(Animation.grid.grid[grid_x][grid_y].constructor.name == 'Street')
          //TrafficManager.checkCrossing(neighbors[i].grid_x, neighbors[i].grid_y);
        }
      }
    }
    var counter = this.countNeighbours(grid_x, grid_y, 1); // get direct Neighbours
    if(counter['Building'] > 3){

      this.removeBuilding(grid_x, grid_y);
      TrafficManager.addCrossing(grid_x, grid_y);
    }
  }

  test() {
    // tmp: test
    this.addBuilding(0, 0, 2);
    this.addBuilding(2, 0, 2);
    this.addBuilding(7, 3, 2);
    this.addBuilding(6, 3, 2);
    this.addBuilding(5, 3, 2);
    this.addBuilding(6, 4, 2);
  }

}
exports.BuildingManager = new BuildingManager()
