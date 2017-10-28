const { Entity } = require('./entity.class.js');
class Floor extends Entity {
  constructor(group){
    super() // call constructor of Entity
    this.group = group;
    //this.size = size; // The size (m2) of the Building
    Animation.addBox(this.group,0,0,0,100,100,30,0xff0000)
  }
}
exports.Floor = Floor
