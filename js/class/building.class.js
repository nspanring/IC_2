const { Entity } = require('./entity.class.js');
//const { Floor } = require('./floor.class.js');
class Building extends Entity {
  constructor(size, floors){
    super() // call constructor of Entity
    this.size = size; // The size (m2) of the Building
    //this.floor = new Floor();

  }
}
exports.Building = Building
