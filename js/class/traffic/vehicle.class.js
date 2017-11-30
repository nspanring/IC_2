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

		if(this.queue.length == 0) this.queue = this.findShortestPath(x,y);
		if(this.queue == false) return this.queue;

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
		if(Animation.grid.grid[grid_x] === undefined) return 0;
		if(Animation.grid.grid[grid_x][grid_y] === undefined) return 0;

		this.next_obj = Animation.grid.grid[grid_x][grid_y];

		if(this.next_obj.constructor.name == "Building") return this.useBuilding();
		if(this.next_obj.constructor.name == "Crossing") return this.useCrossing(this);
		if(this.next_obj.constructor.name == "Street") return this.useStreet();

		this.queue = []; // Path blocked so we need a new path (clear queue)
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
		this.queue.shift();
	}

/*
	setNewScanPosition(grid_x, grid_y){
		this.scan.position.set(grid_x, 0, grid_y);
	}
*/
	// Start location will be in the following format:
	// [x, y]
	findShortestPath(x2,y2){
		var grid = Animation.grid.getGridArray(); // Animation class -> Grid Class -> grid array
		grid[x2][y2] = "Goal";
		var distanceFromLeft = this.grid_x;
		var distanceFromTop = this.grid_y;

		// Each "location" will store its coordinates
		// and the shortest path required to arrive there
		var location = {
			distanceFromTop: distanceFromTop,
			distanceFromLeft: distanceFromLeft,
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
					return newLocation.path;
				} else if (newLocation.status === 'Valid') {
					queue.push(newLocation);
				}
			}
		}

		// No valid path found
		return false;
	}

	// This function will check a location's status
	// (a location is "valid" if it is on the grid, is not an "obstacle",
	// and has not yet been visited by our algorithm)
	// Returns "Valid", "Invalid", "Blocked", or "Goal"
	locationStatus(location, grid, state, currentLocation){
		var gridSizex = grid.length;
		if (grid[dfl] !== undefined) var gridSizey = grid[dfl].length;
		else var gridSizey = grid.length;
		var dft = location.distanceFromTop;
		var dfl = location.distanceFromLeft;

		if (location.distanceFromLeft <= (-1) * gridSizex ||
		location.distanceFromLeft >= gridSizex ||
		location.distanceFromTop < (-1) * gridSizey ||
		location.distanceFromTop >= gridSizey) {
			// location is not on the grid--return false
			return 'Invalid';
		} else if (grid[dfl] === undefined){
			return 'Blocked';
		}	else if (grid[dfl][dft] === undefined || Animation.grid.grid[dfl][dft].constructor.name == 'Building'){
			return 'Blocked';
		}	else if (Animation.grid.grid[dfl][dft].constructor.name == 'Street' && Animation.grid.grid[dfl][dft].state !== state){
			return 'Blocked';
		} else if( // if currentLocation is a street and its not leading to the same state we are goining to than BLOCK
			Animation.grid.grid[currentLocation.distanceFromLeft][currentLocation.distanceFromTop].constructor.name == 'Street' &&
			Animation.grid.grid[currentLocation.distanceFromLeft][currentLocation.distanceFromTop].state !== state
		){
			return 'Blocked';
		} else if (grid[dfl][dft] === 'Goal') {
			return 'Goal';
		} else {
			return 'Valid';
		}
	}


	// Explores the grid from the given location in the given
	// direction
	exploreInDirection(currentLocation, direction, grid) {
		var newPath = currentLocation.path.slice();

		var dft = currentLocation.distanceFromTop;
		var dfl = currentLocation.distanceFromLeft;
		var state = 0; // 0 up <-> down| 1: right <-> left
		if (direction === 1) {
			dft -= 1;
			state = 0;
		} else if (direction === 2) {
			dfl += 1;
			state = 1;
		} else if (direction === 3) {
			dft += 1;
			state = 0;
		} else if (direction === 4) {
			dfl -= 1;
			state = 1;
		}
		newPath.push(direction);

		var newLocation = {
			distanceFromTop: dft,
			distanceFromLeft: dfl,
			path: newPath,
			status: 'Unknown'
		};
		newLocation.status = this.locationStatus(newLocation, grid, state, currentLocation);

		// If this new location is valid, mark it as 'Visited'
		if (newLocation.status === 'Valid') {
			grid[newLocation.distanceFromLeft][newLocation.distanceFromTop] = 'Visited';
		}

		return newLocation;
	}

}
exports.Vehicle = Vehicle
