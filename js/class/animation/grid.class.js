/**
 * The Grid class seperates the world into a simple grid/chunks where the Entitys can be placed
 */
class Grid {
  constructor(gridsize = 100) {
    this.gridsize = gridsize;
    this.grid = [];
  }

  getGridArray() {
    return $.extend(true, [], this.grid);;
  }

  getGrid(x, y){
    var grid_x = Math.round((x - 0.01) / this.gridsize);
    var grid_y = Math.round((y - 0.01) / this.gridsize);
    // grid id = x + "" + y (as string because ther a no posible duplicates of id's)
    return grid_x + "," + grid_y;
  }

  getPosition(grid_id){
    var grid_xy = grid_id.split(",");
    var x = parseInt(grid_xy[0]) * this.gridsize + (this.gridsize / 2);
    var y = parseInt(grid_xy[1]) * this.gridsize + (this.gridsize / 2);
    return [x,y];
  }

  getCoordinates(grid_x, grid_y){
    var x = parseInt(grid_x) * this.gridsize + (this.gridsize / 2);
    var y = parseInt(grid_y) * this.gridsize + (this.gridsize / 2);
    return [x,y];
  }

  addToGrid(obj, x, y){
    if(this.grid[x] == undefined) this.grid[x] = [];
    this.grid[x][y] = obj;
  }
  removeFromGrid(x, y){
    if(this.grid[x] == undefined) this.grid[x] = [];
    this.grid[x][y] = undefined;
  }
}
exports.Grid=Grid
