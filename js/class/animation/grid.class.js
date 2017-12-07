/**
 * The Grid class seperates the world into a simple grid/chunks where the Entitys can be placed
 */
class Grid {
  constructor(gridsize = 100) {
    this.gridsize = gridsize;
    this.grid = [];
    this.value = [];
  }

  getValueArray(){
    return $.extend(true, [], this.value);;
  }

  getValue(x,y){
    if(this.value[x] == undefined) return false;
    if(this.value[x][y] == undefined) return false;
    return this.value[x][y];
  }

  addValue(x,y,value){
    if(this.value[x] == undefined) this.value[x] = [];
    this.value[x][y] = value;
    return this.getValue(x,y);
  }

  changeValue(x,y,value){
    return this.addValue(x,y,value);
  }

  // create a random Value gird
  createRandValueGrid(max_dot, val = 4, size = this.gridsize){
    var x = 0;
    var y = 0;
    var value = 0;
    var max_dens = max_dot / val;
    for (var i = 0; i < size; i++) {
      x = (Math.floor(Math.random() * max_dot) + 0 );
      y = (Math.floor(Math.random() * max_dot) + 0 );
      this.addValue(x,y,val);
    }
    return this.getValueArray();
  }
  /*
  calcValueGrid(){
    var points = this.getValueArray();
    for (var x = 0; x < points.length; x++) {
      if(points[x] !== undefined){
        for (var y = 0; y < points[x].length; y++) {

          for (var x1 = -1; x1 <= 1; x1++) {
            for (var y1 = -1; y1 <= 1; y1++) {
              this.value[x1][y1] = points[x][y] - 1;
            }
          }
        }
      }
    }
  }
*/
  getGridArray(){
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
