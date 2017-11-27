const { Entity } = require('../entity.class.js');
const { Floor } = require('./floor.class.js');
class Building extends Entity {
  constructor(size,floors,x,z){
    super() // call constructor of Entity
    this.size = size // The size (m2) of the Building
    this.group = Animation.addGroup()
    this.x = x
    this.z = z
    //Animation.addBox(this.group,0,floors*40/2-20,0,100,100,40*floors,0)
    this.floor = []
    for (var i = 0; i < floors; i++) {
      this.floor[i] = new Floor(this.group,i,this.x,this.z)
    }
  }
}
exports.Building = Building
