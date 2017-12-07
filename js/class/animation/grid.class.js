/**
 * The Grid class seperates the world into a simple grid/chunks where the Entitys can be placed
 */
class Grid {
  constructor(gridsize = 100) {
    this.gridsize = gridsize;
    this.grid = [];
    this.points = [];
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

  addPoint(x,y,value){
    if(this.points[x] == undefined) this.points[x] = [];
    this.points[x][y] = value;
    return this.points[x][y];
  }

  // create a random Value gird
  createRandValueGrid(max_dot, val = 5, size = this.gridsize){
    var x = 0;
    var y = 0;
    var value = 0;
    var size_dobl = size * 2;
    var size_half = size / 2;
    for (var i = 0; i < max_dot; i++) {
      x = (Math.floor(Math.random() * size_dobl) - size_half );
      y = (Math.floor(Math.random() * size_dobl) - size_half );
      this.addPoint(x,y,val);
    }
    return this.points;
  }

  calcValueGrid(max = 4){
    for (var x = 0; x < this.points.length; x++) {
      if(this.points[x] !== undefined){
        for (var y = 0; y < this.points[x].length; y++) {
          if(this.points[x][y] !== undefined){
            this.addValue(x, y, this.points[x][y]); // add point as value

            /*
            for (var x1 = -1; x1 <= 1; x1++) { for (var y1 = -1; y1 <= 1; y1++) {
              if(x1 !== 0 && y1 !== 0) this.addValue(x + x1,y + y1,this.points[x][y] - 1) // first circle
            } }
            */
            var i_c = 1;
            for (var i = max; i > 0; i--) {
              for (var x1 = -i_c; x1 <= i_c; x1++) { for (var y1 = -i_c; y1 <= i_c; y1++) {
                if((~(x1)+1) > i_c || (~(y1)+1) > i_c )
                this.addValue(x + x1,y + y1, i)
              } }
              i_c++;
            }
          }
        }
      }
    }
  }

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
