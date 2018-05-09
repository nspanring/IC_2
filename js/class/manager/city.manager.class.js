/**
 * Parent Class for All Managers
 */
class CityManager {
  constructor() {

    this.network = []; // all Traffic obj will be stored there exept vehicles

    //build grid value to simulate the worth of a grid place:
    Animation.grid.createRandValueGrid(50);
  }

  // mode 1: do not add own position
  // mode 2: do overwrite all arrays first with own postion
  scanNeighbours(grid_x, grid_y, max_distance = 15, mode=0, callback = undefined){
    var neighbors = [];

    if(Animation.grid.grid[grid_x] !== undefined)
    if(Animation.grid.grid[grid_x][grid_y] !== undefined && mode == 0){
      neighbors[0] = Animation.grid.grid[grid_x][grid_y];
    }

    if(Animation.grid.grid[grid_x] !== undefined)
    if(Animation.grid.grid[grid_x][grid_y] !== undefined && mode == 1){
      // do nothing ... now
    }

    if(Animation.grid.grid[grid_x] !== undefined)
    if(Animation.grid.grid[grid_x][grid_y] !== undefined && mode == 2){
      neighbors[1] = Animation.grid.grid[grid_x][grid_y];
      neighbors[2] = Animation.grid.grid[grid_x][grid_y];
      neighbors[3] = Animation.grid.grid[grid_x][grid_y];
      neighbors[4] = Animation.grid.grid[grid_x][grid_y];
    }

    for (var i = 1; i <= max_distance; i++) { // north
      if(Animation.grid.grid[grid_x] !== undefined)
      if(Animation.grid.grid[grid_x][grid_y - i] !== undefined){
        neighbors[1] = Animation.grid.grid[grid_x][grid_y - i];
        break;
      }
    }
    for (var i = 1; i <= max_distance; i++) { // east
      if(Animation.grid.grid[grid_x + i] !== undefined)
      if(Animation.grid.grid[grid_x + i][grid_y] !== undefined){
        neighbors[2] = Animation.grid.grid[grid_x + i][grid_y];
        break;
      }
    }
    for (var i = 1; i <= max_distance; i++) { // south
      if(Animation.grid.grid[grid_x] !== undefined)
      if(Animation.grid.grid[grid_x][grid_y + i] !== undefined){
        neighbors[3] = Animation.grid.grid[grid_x][grid_y + i];
        break;
      }
    }
    for (var i = 1; i <= max_distance; i++) { // west
      if(Animation.grid.grid[grid_x - i] !== undefined)
      if(Animation.grid.grid[grid_x - i][grid_y] !== undefined){
        neighbors[4] = Animation.grid.grid[grid_x - i][grid_y];
        break;
      }
    }

    if(callback !== undefined){
      log(NOTE, "getNeighbours | callback")
      callback(neighbors); // this will "return" the value to the original caller
    }

    return neighbors;
  }

  getNeighbours(grid_x, grid_y, mode = 0, callback = undefined){
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

    if(callback !== undefined){
      log(NOTE, "getNeighbours | callback")
      callback(neighbors); // this will "return" the value to the original caller
    }
    return neighbors;
  }

  // mode: 0 = all Neighbours and it self | mode: 1 = Direct Neighbours up,down,left,right and not it self || mode: 2 = not usefull here
  countNeighbours(grid_x, grid_y, mode = 0, tmpthis, callback = undefined){
    var counter = [];
    return this.scanNeighbours(grid_x, grid_y, 1, mode, function(neighbors) {
      // count all neighbors obj and save them with ther class name (like: Buildin, Crossing, Street)
      for (var i = 0; i < neighbors.length; i++) {
        if(neighbors[i] !== undefined){
          var name = String(neighbors[i].constructor.name);
          if(counter[name] == undefined) counter[name] = 0;
          counter[name]++;
          log(NOTE, "countNeighbours | "+grid_x+" | "+grid_y+" | "+name+" | "+counter[name])
        }
      }

      if(callback !== undefined){
        log(NOTE, "countNeighbours | callback")
        callback(tmpthis, counter); // this will "return" the value to the original caller
      }
      return counter;
    });
  }
}
exports.CityManager = CityManager
