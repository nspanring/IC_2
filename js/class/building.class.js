const { Entity } = require('./entity.class.js');
const { Floor } = require('./floor.class.js');
class Building extends Entity {
  constructor(size, floors){
    super() // call constructor of Entity
    this.size = size; // The size (m2) of the Building
    this.group = Animation.addGroup();
    Animation.addBox(this.group,0,0,0,100,100,200)

    this.floor = new Floor(this.group);
  }
}
exports.Building = Building
