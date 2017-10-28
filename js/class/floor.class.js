const { Entity } = require('./entity.class.js');
class Floor extends Entity {
  constructor(group,number,x,z){
    super() // call constructor of Entity
    this.group = group;
    this.x = x
    this.z = z
    //this.size = size; // The size (m2) of the Building
    Animation.addBox(this.group,this.x,40*(number),this.z,100,100,40,0xffffff)
  }
}
exports.Floor = Floor
