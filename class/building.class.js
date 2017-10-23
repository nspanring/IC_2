const { Entity } = require('./entity.class.js');
class Building extends Entity {
  constructor(size){
    super() // call constructor of Entity
    this.size = size; // The size (m2) of the Building
     
  }
}
