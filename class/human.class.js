const { Entity } = require('./entity.class.js');
class Human extends Entity {
  constructor(){
    super() // call constructor of Entity
    console.log(this);
  }
}
exports.Human = Human
