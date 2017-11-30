/**
 * Parent Class for All Managers
 */
class CityManager {
  constructor() {

    this.network = []; // all Traffic obj will be stored there exept vehicles
  }

  // mode 1: do not add own position
  scanNeighbours(grid_x, grid_y, max_distance = 15, mode=0){
    var neighbors = [];

    if(Animation.grid.grid[grid_x] !== undefined)
    if(Animation.grid.grid[grid_x][grid_y] !== undefined && mode == 0){
      neighbors[1] = Animation.grid.grid[grid_x][grid_y];
      neighbors[2] = Animation.grid.grid[grid_x][grid_y];
      neighbors[3] = Animation.grid.grid[grid_x][grid_y];
      neighbors[4] = Animation.grid.grid[grid_x][grid_y];
    }

    for (var y = -1; y > grid_y - max_distance; y--) { // north
      if(Animation.grid.grid[grid_x] !== undefined)
      if(Animation.grid.grid[grid_x][grid_y + y] !== undefined){
        neighbors[1] = Animation.grid.grid[grid_x][grid_y + y];
        break;
      }
    }
    for (var x = 1; x < grid_x + max_distance; x++) { // east
      if(Animation.grid.grid[grid_x + x] !== undefined)
      if(Animation.grid.grid[grid_x + x][grid_y] !== undefined){
        neighbors[2] = Animation.grid.grid[grid_x + x][grid_y];
        break;
      }
    }
    for (var y = 1; y < grid_y + max_distance; y++) { // south
      if(Animation.grid.grid[grid_x] !== undefined)
      if(Animation.grid.grid[grid_x][grid_y + y] !== undefined){
        neighbors[3] = Animation.grid.grid[grid_x][grid_y + y];
        break;
      }
    }
    for (var x = -1; x > grid_x - max_distance; x--) { // west
      if(Animation.grid.grid[grid_x + x] !== undefined)
      if(Animation.grid.grid[grid_x + x][grid_y] !== undefined){
        neighbors[4] = Animation.grid.grid[grid_x + x][grid_y];
        break;
      }
    }

    return neighbors;
  }

  getNeighbours(grid_x, grid_y, mode = 0){
    var neighbors = [];
    for (var x = -1; x <= 1; x++) { // left right scan
      for (var y = -1; y <= 1; y++) { // up down scan
        if(y == 0 || x == 0 || mode == 0) { // count all neighbors or mode 1 only Direct neighbors
          if(Animation.grid.grid[grid_x + x] !== undefined) // check if array exsist
          if(Animation.grid.grid[grid_x + x][grid_y + y] !== undefined) // check if array exsist
          neighbors[neighbors.length] = Animation.grid.grid[grid_x + x][grid_y + y]; // add to neighbors
        }
      }
    }

    return neighbors;
  }

  // mode: 0 = all Neighbours | mode: 1 = Direct Neighbours up,down,left,right
  // return new state
  countNeighbours(grid_x, grid_y, mode = 0){
    var counter = [];
    var neighbors = this.getNeighbours(grid_x, grid_y, mode);
    // count all neighbors obj and save them with ther class name (like: Buildin, Crossing, Street)
    for (var i = 0; i < neighbors.length; i++) {
      var name = String(neighbors[i].constructor.name);
      if(counter[name] == undefined) counter[name] = 0;
      counter[name]++;
    }

    return counter;
  }
}
exports.CityManager = CityManager
