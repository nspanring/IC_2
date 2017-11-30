class Street extends Entity{
	constructor(id, state, lane = 1, connections = undefined){
		super() // call constructor of Entity
		this.ID = id;
		this.state = state; // 0: left, right | 1: up, down
		this.lane = lane;
		this.contacts = []; // max 2 (begin and and of steet can have a connection)
		this.connects_c = 0;
		this.contacts_ID = []; // max 2 (begin and and of steet can have a connection)

		// The position will be calculated from the contacts the Street has
		this.x1 = undefined;
		this.y1 = undefined;
		this.grid_x1 = undefined;
		this.grid_y1 = undefined;
		this.x2 = undefined;
		this.y2 = undefined;
		this.grid_x2 = undefined;
		this.grid_y2 = undefined;

		this.grid_pices = [];

		if(connections != undefined && connections.length == 2){
			this.connect(connections[0]);
			this.connect(connections[1]);
		}

		this.group = Animation.addGroup()

		// standard dimension when
		var newx = this.x1;
		var newy = this.y1;
		var size_w = 50;
		var size_d = 50;
		var gdiff = 0;

		// if vertical connection (2D):
		if(this.x1 == this.x2){
			if(this.y1 < this.y2){ // links nach rechts
				size_d = (this.y2 - this.y1) - 50;
				newy = this.y1 + (this.y2 - this.y1)/2;
				gdiff = this.grid_y2 - this.grid_y1 // diff
				for (var i = 1; i < gdiff; i++) {
					this.testIntersection(this.grid_x1, this.grid_y1+i)
				}
			}
			if(this.y1 > this.y2){ // rechts nach links
				size_d = (this.y1 - this.y2) - 50;
				newy = this.y2 + (this.y1 - this.y2)/2;
				gdiff = this.grid_y1 - this.grid_y2 // diff
				for (var i = 1; i < gdiff; i++) {
					this.testIntersection(this.grid_x1, this.grid_y2 + i)
				}
			}
		}
		// if horizontal connection (2D):
		if(this.y1 == this.y2){
			if(this.x1 < this.x2){ // oben nach unten
				size_w = (this.x2 - this.x1) - 50;
				newx = this.x1 + (this.x2 - this.x1)/2;
				gdiff = this.grid_x2 - this.grid_x1 // diff
				for (var i = 1; i < gdiff; i++) {
					this.testIntersection(this.grid_x1+i, this.grid_y1)
				}
			}
			if(this.x1 > this.x2){ // unten nach oben
				size_w = (this.x1 - this.x2) - 50;
				newx = this.x2 + (this.x1 - this.x2)/2;
				gdiff = this.grid_x1 - this.grid_x2 // diff
				for (var i = 1; i < gdiff; i++) {
					this.testIntersection(this.grid_x2+i, this.grid_y1)
				}
			}
		}
		this.crossing_box = Animation.addMeshBox(this.group,newx,0,newy,size_w,size_d,10,0xCCCCCC)
	}

	testIntersection(grid_x, grid_y){
		if(Animation.grid.grid[grid_x] == undefined || (
			 Animation.grid.grid[grid_x][grid_y] == undefined || (
			 Animation.grid.grid[grid_x][grid_y] !== undefined &&
			 Animation.grid.grid[grid_x][grid_y].constructor.name !== 'Crossing' ))){
				 Animation.grid.addToGrid(this, grid_x, grid_y);
				  this.grid_pices[this.grid_pices.length] = {x: grid_x, y: grid_y};
		}
	}

	//connect the street with a crossing
	connect(crossing, num = undefined){
		if(this.connects_c > 1) return 0;
		this.contacts[crossing.ID] = crossing;
		this.contacts_ID[this.connects_c] = crossing.ID;
		this.connects_c++;

		if(this.connects_c == 2){
			this.calcPosition();
		}
		return crossing.connect(this);
	}

	// calculate the position of the street between the 2 connections
	calcPosition(){
		this.x1 = this.contacts[this.contacts_ID[0]].x
		this.y1 = this.contacts[this.contacts_ID[0]].y
		this.x2 = this.contacts[this.contacts_ID[1]].x
		this.y2 = this.contacts[this.contacts_ID[1]].y

		this.grid_x1 = parseInt(this.contacts[this.contacts_ID[0]].grid_x)
		this.grid_y1 = parseInt(this.contacts[this.contacts_ID[0]].grid_y)
		this.grid_x2 = parseInt(this.contacts[this.contacts_ID[1]].grid_x)
		this.grid_y2 = parseInt(this.contacts[this.contacts_ID[1]].grid_y)
		/*
		if(this.x1 < this.x2){
			var tmp_x1 = this.x1; this.x1 = this.x2; this.x2 = tmp_x1;
		}
		if(this.y1 < this.y2){
			var tmp_y1 = this.y1; this.y1 = this.y2; this.y2 = tmp_y1;
		}
		*/

		return 1;
	}
}
exports.Street = Street
