const { Entity } = require('../entity.class.js');
class Vehicle extends Entity{
	constructor(){
		super() // call constructor of Entity

		var position_xy = Animation.grid.getPosition('0,0');
		this.group = Animation.addGroup()
		Animation.addMeshBox(this.group,position_xy[0],10,position_xy[1],10,10,10,0xffffff)
	}

	drive(grid_id){
		var position_xy = Animation.grid.getPosition(grid_id);
		this.group.position.set(position_xy[0] - 50, 0, position_xy[1] - 50);
	}
}
exports.Vehicle = Vehicle
