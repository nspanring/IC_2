const { Entity } = require('../entity.class.js');
class Vehicle extends Entity{
	constructor(grid_x, grid_y){
		super() // call constructor of Entity
		this.x = undefined;
		this.y = undefined;
		this.grid_x = grid_x;
		this.grid_y = grid_y;
		var position_xy = Animation.grid.getPosition(grid_x+','+grid_y);
		this.group = Animation.addGroup()
		Animation.addMeshBox(this.group,position_xy[0],10,position_xy[1],10,10,10,0xffffff)
	}

	drive(grid_id){
		var grid_x_tmp = grid_id.split(",")[0];
		var grid_y_tmp = grid_id.split(",")[0];

		var position_xy = Animation.grid.getPosition(grid_id);
		this.x = position_xy[0];
		this.y = position_xy[0];

		if(Animation.grid.grid[grid_x_tmp] === undefined) return 0;
		if(Animation.grid.grid[grid_x_tmp][grid_y_tmp] === undefined) return 0;
		this.next_obj = Animation.grid.grid[grid_x_tmp][grid_y_tmp];
		if(this.next_obj !== undefined){
			if(this.next_obj.constructor.name == "Building") return 0;
			if(this.next_obj.constructor.name == "Crossing"){
				if(this.next_obj.use()){
						this.group.position.set(position_xy[0] - 50, 0, position_xy[1] - 50);
				}else{
					// set timeout 5 sec.
				}
			}
		}
	}
}
exports.Vehicle = Vehicle
