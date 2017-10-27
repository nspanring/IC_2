const { Entity } = require('./entity.class.js');
class Room extends Entity {
  constructor(size){
    super() // call constructor of Entity
    this.size = size; // The size (m2) of the Building

  }
}
exports.Room = Room
