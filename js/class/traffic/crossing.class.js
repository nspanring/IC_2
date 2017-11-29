const { Entity } = require('../entity.class.js');
class Crossing extends Entity{
	constructor(state, x, y){
		super() // call constructor of Entity
		// postion of the Crossing
		this.x = x;
		this.y = y;

		this.grid_x = Animation.grid.getGrid(this.x, this.y).split(",")[0];
		this.grid_y = Animation.grid.getGrid(this.x, this.y).split(",")[1];

		//[TODO]: (Extra States if implement later): | 2: Up, Left | 3: Up, Right | 4: Left, Up | 5: Left, Down | 6: Right, Up | 7: Right, Down
		this.state = state; // 0: up, down  | 1: left, right
		this.in_use = 0;
		this.switch_state_waittime = 0;
		this.switch_state_waittime_timout = 0;

		this.connections = [/* ID of Street*/]; // all streets conectect to the crossing

		this.group = Animation.addGroup()
		this.crossing_ctx = Animation.addBox(this.group,this.x,0,this.y,50,50,10,0xFFFFFF)

		Animation.grid.addToGrid(this, this.grid_x, this.grid_y);
		// tmp grafikal demo
		this.display();
	}

	// init from the @Street class | never from the @Crossing class !!!
	connect(street){
		if(this.connections.length > 3) return 0;
		this.connections[street.ID] = street;
		return 1;
	}

	// if return 0 than vehicle have to wait 5 sec and try again
	use(state){
		if(this.checkPassable(state)){ // check if state is change able
			if(this.in_use == 1){ // if curently in use wait but the state is secured at least 30sec. for the next use!
				return 0;
			}else{
				this.in_use = 1;
				this.displayUse();
				return 1;
			}
		}else{
			if(this.in_use == 1){ // if curently in use wait
				return 0;
			}else if(this.in_use == 1 && this.state == state){
				this.in_use = 1;
				this.displayUse();
				return 1;
			}else {
				return 0;
			}
		}
	}

	// when the vehicle have passed the Crossing the vehvicle requests an idle state!
	idle(){
		this.in_use = 0;
		this.displayUse();
		return 1;
	}

	checkPassable(state){
		if(this.in_use == 0 && this.state == state){
			return 1;
		}else if(this.in_use == 0){ // curently not used so we can switch the state
			return this.switchState(state);
		}else if(this.switch_state_waittime == 0){ // in use but the waittime is over so we can change its state
			return this.switchState(state);
		}else if(this.state == state){ // in use but the state is the same return 1
			return 1;
		}else{
			return 0;
		}
	}

	switchState(new_state, lane = 1) {
		if(this.switch_state_waittime == 0){
			this.state = new_state;
			// tmp grafikal demo
			this.displayUpdate()

			// set Timeout for waiting time
			this.setSwitchStateWaittime(10 * lane);
			return 1;
		}else{
			return 0;
		}
	}

	// waittime in sec.
	setSwitchStateWaittime(waittime){
		clearTimeout(this.switch_state_waittime_timout);
		this.switch_state_waittime = waittime;
		// tmp grafikal demo
		this.displayLight();

		this.switch_state_waittime_timout = setTimeout(function(tmp_this){
			tmp_this.switch_state_waittime = 0;
			// tmp grafikal demo
			tmp_this.displayLight();
		}, waittime * 1000, this);
	}

	changeText(text){
		this.crossing_ctx.font = 'bold 150px Times New Roman';
    this.crossing_ctx.fillStyle = 'white';
    this.crossing_ctx.fillRect(0, 0, 300, 150);
    this.crossing_ctx.fillStyle = 'black';
    this.crossing_ctx.textAlign = "center";
    this.crossing_ctx.textBaseline = "middle";
    this.crossing_ctx.fillText(text, 300 / 2 , 150 / 2 - 10);
	}

	// tmp grafikal demo
	display(){
		//$('#world').append('<div id="Crossing_'+this.id+'" class="crossing"></div>');
		this.displayUpdate()
	}
	displayUpdate(){
		if(this.state == 0){
			//this.group.children[1].material.color.setHex(0xFFFF00);
			//this.changeText('↕');
		}//↕
		if(this.state == 1){
			//this.group.children[1].material.color.setHex(0x00FFFF);
			//this.changeText('↔');
		}//↔
	}
	displayLight(){
		if(this.in_use == 0){
			if(this.switch_state_waittime == 0) this.group.children[1].material.color.setHex(0x00FF00);
			if(this.switch_state_waittime != 0) this.group.children[1].material.color.setHex(0xFFFF00);
		}else{
			this.group.children[1].material.color.setHex(0xFF0000);
		}
		//if(this.switch_state_waittime == 0) $('#Crossing_'+this.id).css('background-color', 'white');
		//if(this.switch_state_waittime != 0) $('#Crossing_'+this.id).css('background-color', 'lightgreen');
	}
	displayUse(){
		if(this.in_use == 0){
			this.displayLight()
			this.displayUpdate()
		}
		if(this.in_use == 1) this.group.children[1].material.color.setHex(0xFF0000);
	}
}
exports.Crossing = Crossing
