class Vehicle extends Entity{
	constructor(grid_x = 0, grid_y = 0){
		super() // call constructor of Entity
		this.x = undefined;
		this.y = undefined;
		this.grid_x = grid_x;
		this.grid_y = grid_y;
		this.waiting = 0;
		this.timeout = 0;
		this.queue = [];
		var position_xy = Animation.grid.getPosition(grid_x+','+grid_y);
		this.group = Animation.addGroup()
		//this.scan = Animation.addGroup()
		this.group.position.set(position_xy[0], 0, position_xy[1])
		//this.scan.position.set(position_xy[0], 0, position_xy[1])
		Animation.addMeshBox(this.group,position_xy[0] + (Animation.grid.gridsize/2),10,position_xy[1] + (Animation.grid.gridsize/2),10,10,10,0xffffff)
		//Animation.addMeshBox(this.scan,position_xy[0] + (Animation.grid.gridsize/2),10,position_xy[1] + (Animation.grid.gridsize/2),10,10,10,0x0000ff)
		this.last_obj = Animation.grid.grid[grid_x][grid_y];
	}

	// direction: 1: N|Up, 2: O|Right, 3: S|Down, 4: W|Left
	drive(x,y){
		if(this.waiting == 1) return 0; // Vehicle can't drive if it is waiting

		if(this.queue.length == 0){
			this.findShortestPath(x,y, this, function(tmpthis, queue){
				tmpthis.queue = queue;
				return tmpthis.drive_queue()
			});
		}else{ // queue ist allready calculated
			if(this.queue === false){
				this.queue = []; // Path blocked so we need a new path (clear queue)
				return false;
			}
			if(this.drive_queue() == false){
				this.queue = []; // Path blocked so we need a new path (clear queue)
				return false; // if every check failed
			}else{
				return true;
			}
		}
	}

	drive_queue(){
		var grid_x = this.grid_x;
		var grid_y = this.grid_y;
		this.direction = this.queue[0];
		switch (this.direction) {
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
		if(Animation.grid.grid[grid_x] === undefined){
			this.queue = [];
			return 0;
		}
		if(Animation.grid.grid[grid_x][grid_y] === undefined){
			this.queue = [];
			return 0;
		}

		this.next_obj = Animation.grid.grid[grid_x][grid_y];

		if(this.next_obj.constructor.name == "Building") return this.useBuilding();
		if(this.next_obj.constructor.name == "Crossing") return this.useCrossing(this);
		if(this.next_obj.constructor.name == "Street") return this.useStreet();
		return false; // if no valid path!
	}

	// TODO: Parking on/in Buildings!
	useBuilding(){
		return 0; // a vehicle is not alowed on buildings (jet)
	}

	// if the obj is a Crossing than use it or else wait 5 sec.
	useCrossing(tmpThis){
		if(tmpThis.next_obj.use(this.state)){ // use the new Crossing
			if(tmpThis.last_obj !== undefined) if(tmpThis.last_obj.constructor.name == "Crossing") tmpThis.last_obj.idle(); // set the crossing free
			tmpThis.setNewPosition();
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
		this.setNewPosition();
	}

	setNewPosition(){
		this.last_obj = this.next_obj;
		this.group.position.set(this.x, 0, this.y);
		this.grid_x = this.grid_x_tmp;
		this.grid_y = this.grid_y_tmp;
		if(this.queue !== false) this.queue.shift();
	}

/*
	setNewScanPosition(grid_x, grid_y){
		this.scan.position.set(grid_x, 0, grid_y);
	}
*/

	// Start location will be in the following format:
	// [x, y]
	findShortestPath(x2,y2, tmpthis, callback = undefined){
		var grid = Animation.grid.getGridArray(); // Animation class -> Grid Class -> grid array
		if(grid[x2] == undefined){  callback(tmpthis, false); return false; }
		grid[x2][y2] = "Goal";
		var x = this.grid_x;
		var y = this.grid_y;

		// Each "location" will store its coordinates
		// and the shortest path required to arrive there
		var location = {
			y: y,
			x: x,
			path: [],
			status: 'Start'
		};

		// Initialize the queue with the start location already inside
		var queue = [location];

		// Loop through the grid searching for the goal
		while (queue.length > 0) {
			// Take the first location off the queue
			var currentLocation = queue.shift();

			for (var i = 1; i <= 4; i++) {
				// Explore North
				var newLocation = this.exploreInDirection(currentLocation, i, grid);
				if (newLocation.status === 'Goal') {
					if(callback != undefined) callback(tmpthis, newLocation.path);
					return newLocation.path;
				} else if (newLocation.status === 'Valid') {
					queue.push(newLocation);
				}
			}
		}

		// No valid path found
		if(callback != undefined) callback(tmpthis, false);
		return false;
	}

	// This function will check a location's status
	// (a location is "valid" if it is on the grid, is not an "obstacle",
	// and has not yet been visited by our algorithm)
	// Returns "Valid", "Invalid", "Blocked", or "Goal"
	locationStatus(location, grid, state, currentLocation){
		var gridSizex = grid.length;
		if (grid[x] !== undefined) var gridSizey = grid[x].length;
		else var gridSizey = grid.length;
		var y = location.y;
		var x = location.x;

		// needs a try catch element

		if (location.x <= (-1) * gridSizex ||
		location.x >= gridSizex ||
		location.y < (-1) * gridSizey ||
		location.y >= gridSizey) {
			// location is not on the grid--return false
			return 'Invalid';
		} else if (grid[x] === undefined){
			return 'Blocked';
		}	else if (grid[x][y] === undefined || Animation.grid.grid[x][y].constructor.name == 'Building'){
			return 'Blocked';
		}	else if (Animation.grid.grid[x][y].constructor.name == 'Street' && Animation.grid.grid[x][y].state !== state){
			return 'Blocked';
		} else if( // if currentLocation is a street and its not leading to the same state we are goining to than BLOCK
			Animation.grid.grid[currentLocation.x][currentLocation.y].constructor.name == 'Street' &&
			Animation.grid.grid[currentLocation.x][currentLocation.y].state !== state
		){
			return 'Blocked';
		} else if (grid[x][y] === 'Visited') {
			return 'Blocked';
		} else if (grid[x][y] === 'Goal') {
			return 'Goal';
		} else {
			return 'Valid';
		}
	}


	// Explores the grid from the given location in the given
	// direction
	exploreInDirection(currentLocation, direction, grid) {
		var newPath = currentLocation.path.slice();

		var x = currentLocation.x;
		var y = currentLocation.y;

		var state = 0; // 0 up <-> down| 1: right <-> left
		if (direction === 1) {
			y -= 1;
			state = 0;
		} else if (direction === 2) {
			x += 1;
			state = 1;
		} else if (direction === 3) {
			y += 1;
			state = 0;
		} else if (direction === 4) {
			x -= 1;
			state = 1;
		}
		newPath.push(direction);

		var newLocation = {
			y: y,
			x: x,
			path: newPath,
			status: 'Unknown'
		};
		newLocation.status = this.locationStatus(newLocation, grid, state, currentLocation);

		// If this new location is valid, mark it as 'Visited'
		if (newLocation.status === 'Valid') {
			grid[newLocation.x][newLocation.y] = 'Visited';
		}

		return newLocation;
	}

}
exports.Vehicle = Vehicle
