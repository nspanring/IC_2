const { Floor } = require('./floor.class.js');
class Building extends Entity {
  constructor(x,y,floors = 1, size = 100){
    super(); // call constructor of Entity
    this.size = size; // The size (m2) of the Building
    this.group = Animation.addGroup();
    this.x = x;
    this.y = y;
    this.grid_x = Animation.grid.getGrid(this.x, this.y).split(",")[0];
		this.grid_y = Animation.grid.getGrid(this.x, this.y).split(",")[1];

    Animation.grid.addToGrid(this,this.grid_x, this.grid_y);
    //Animation.addBox(this.group,0,floors*40/2-20,0,100,100,40*floors,0)
    this.floor = []
    for (var i = 0; i < floors; i++) {
      this.floor[i] = new Floor(this.group,i,this.x,this.y, this.size)
    }
  }
}
exports.Building = Building
