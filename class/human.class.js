const { Entity } = require('./entity.class.js');
class Human extends Entity {
  constructor(){
    super() // call constructor of Entity
    console.log(this);
    this.psy_x = (Math.floor(Math.random() * 100) + 1 )
    this.psy_y = (Math.floor(Math.random() * 100) + 1 )
  }
}
exports.Human = Human
