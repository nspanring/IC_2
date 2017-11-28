const { Entity } = require('../entity.class.js');
class Vehicle extends Entity{
	constructor(grid_x = 0, grid_y = 0){
		super() // call constructor of Entity
		this.x = undefined;
		this.y = undefined;
		this.grid_x = grid_x;
		this.grid_y = grid_y;
		this.waiting = 0;
		this.timeout = 0;
		var position_xy = Animation.grid.getPosition(grid_x+','+grid_y);
		this.group = Animation.addGroup()
		Animation.addMeshBox(this.group,position_xy[0],10,position_xy[1],10,10,10,0xffffff)
		this.last_obj = Animation.grid.grid[grid_x][grid_y];
	}

	// direction: 1: N|Up, 2: O|Right, 3: S|Down, 4: W|Left
	drive(direction){
		if(this.waiting == 1) return 0; // Vehicle can't drive if it is waiting
		var grid_x = this.grid_x;
		var grid_y = this.grid_y;
		this.direction = direction;
		switch (direction) {
			case 1:
				grid_y--;
				this.state = 0;
				break;
			case 2:
				grid_x++;
				this.state = 1;
				break;
			case 3:
				grid_y++;
				this.state = 0;
				break;
			case 4:
				grid_x--;
				this.state = 1;
					break;
			default:
		}

		var position_xy = Animation.grid.getCoordinates(grid_x, grid_y);
		this.x = position_xy[0];
		this.y = position_xy[1];
		this.grid_x_tmp = grid_x;
		this.grid_y_tmp = grid_y;

		// if the possition is not set reutrn false
		if(Animation.grid.grid[grid_x] === undefined) return 0;
		if(Animation.grid.grid[grid_x][grid_y] === undefined) return 0;

		this.next_obj = Animation.grid.grid[grid_x][grid_y];

		if(this.next_obj.constructor.name == "Building") return this.useBuilding();
		if(this.next_obj.constructor.name == "Crossing") return this.useCrossing(this);
		if(this.next_obj.constructor.name == "Street") return this.useStreet();

		return 0; // if every check failed
	}

	// TODO: Parking on/in Buildings!
	useBuilding(){
		 return 0; // a vehicle is not alowed on buildings (jet)
	}

	// if the obj is a Crossing than use it or else wait 5 sec.
	useCrossing(tmpThis){
		if(tmpThis.next_obj.use(this.state)){ // use the new Crossing
			if(tmpThis.last_obj !== undefined) if(tmpThis.last_obj.constructor.name == "Crossing") tmpThis.last_obj.idle(); // set the crossing free
			tmpThis.last_obj = tmpThis.next_obj;
			tmpThis.group.position.set(tmpThis.x - 50, 0, tmpThis.y - 50);
			tmpThis.grid_x = tmpThis.grid_x_tmp;
			tmpThis.grid_y = tmpThis.grid_y_tmp;

			tmpThis.waiting = 0;
			clearTimeout(tmpThis.timeout);
		}else{
			// set timeout 5 sec.
			this.waiting = 1;
			console.log("Vehicle is waiting on:", tmpThis.next_obj);
			this.timeout = setTimeout(tmpThis.useCrossing, 5000, tmpThis);
		}
	}
	// TODO: Animate
	useStreet(){
		if(this.last_obj.constructor.name == "Crossing") this.last_obj.idle(); // set the crossing free
		this.last_obj = this.next_obj;
		this.group.position.set(this.x - 50, 0, this.y - 50);
		this.grid_x = this.grid_x_tmp;
		this.grid_y = this.grid_y_tmp;
	}

}
exports.Vehicle = Vehicle
