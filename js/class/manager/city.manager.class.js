/**
 * Parent Class for All Managers
 */
class CityManager {
  constructor() {

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

    if(mode == 1){
      switch (Animation.grid.grid[grid_x][grid_y].constructor.name) {
        case 'Building':
          if(counter['Building'] > 3) // Building tourns to Crossing
          console.log(Animation.grid.grid[grid_x][grid_y], '->', 'Crossing');
          break;
        case 'Crossing':
          if(counter['Crossing'] > 3) // Crossing trouns to Building
          console.log(Animation.grid.grid[grid_x][grid_y], '->', 'Building');
          break;
        case 'Street':
          if(counter['Street'] > 4) // Street tourns to Crossing (makes sense i quess)
          console.log(Animation.grid.grid[grid_x][grid_y], '->', 'Street');
          break;
      }
    }
  }
}
exports.CityManager = CityManager
