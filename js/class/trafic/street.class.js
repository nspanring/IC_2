
class Street {
	constructor(state, lane = 1, connections = undefined){

		this.ID = world_id + 1; world_id++;
		this.state = state; // 0: left, right | 1: up, down
		this.lane = lane;
		this.contacts = []; // max 2 (begin and and of steet can have a connection)
		this.connects_c = 0;
		this.contacts_ID = []; // max 2 (begin and and of steet can have a connection)

		// The position will be calculated from the contacts the Street has
		this.x1 = undefined;
		this.y1 = undefined;
		this.x2 = undefined;
		this.y2 = undefined;

		if(connections != undefined && connections.length == 2){
			this.connect(connections[0]);
			this.connect(connections[1]);
		}
	}

	//connect the street with a crossing
	connect(crossing, num = undefined){
		if(this.connects_c > 1) return 0;
		this.contacts[crossing.ID] = crossing;
		this.contacts_ID[this.connects_c] = crossing.ID;
		this.connects_c++;

		if(this.connects_c == 2){
			this.calc_position();
		}
		return crossing.connect(this);
	}

	// calculate the position of the street between the 2 connections
	calc_position(){
		this.x1 = this.contacts[this.contacts_ID[0]].x
		this.y1 = this.contacts[this.contacts_ID[0]].y
		this.x2 = this.contacts[this.contacts_ID[1]].x
		this.y2 = this.contacts[this.contacts_ID[1]].y
		return 1;
	}
}
exports.Street = Street
