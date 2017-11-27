
var DEBUG = 1;

class Crossing {
	constructor(state, x, y){
		// postion of the Crossing
		this.x = x;
		this.y = y;

		this.ID = world_id + 1; world_id++;
		//[TODO]: (Extra States if implement later): | 2: Up, Left | 3: Up, Right | 4: Left, Up | 5: Left, Down | 6: Right, Up | 7: Right, Down
		this.state = state; // 0: up, down  | 1: left, right
		this.in_use = 0;
		this.switch_state_waittime = 0;
		this.switch_state_waittime_timout = 0;

		this.connections = [/* ID of Street*/]; // all streets conectect to the crossing

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
		if(this.check_passable(state)){ // check if state is change able
			if(this.in_use == 1){ // if curently in use wait but the state is secured at least 30sec. for the next use!
				return 0;
			}else{
				this.in_use = 1;
				this.display_use();
				return 1;
			}
		}else{
			if(this.in_use == 1){ // if curently in use wait
				return 0;
			}else if(this.in_use == 1 && this.state == state){
				this.in_use = 1;
				this.display_use();
				return 1;
			}else {
				return 0;
			}
		}
	}

	// when the vehicle have passed the Crossing the vehvicle requests an idle state!
	idle(){
		this.in_use = 0;
		this.display_use();
		return 1;
	}

	check_passable(state){
		if(this.in_use == 0 && this.state == state){
			return 1;
		}else if(this.in_use == 0){ // curently not used so we can switch the state
			return this.switch_state(state);
		}else if(this.switch_state_waittime == 0){ // in use but the waittime is over so we can change its state
			return this.switch_state(state);
		}else if(this.state == state){ // in use but the state is the same return 1
			return 1;
		}else{
			return 0;
		}
	}

	switch_state(new_state, lane = 1) {
		if(this.switch_state_waittime == 0){
			this.state = new_state;
			// tmp grafikal demo
			this.display_update()

			// set Timeout for waiting time
			this.set_switch_state_waittime(10 * lane);
			return 1;
		}else{
			return 0;
		}
	}

	// waittime in sec.
	set_switch_state_waittime(waittime){
		clearTimeout(this.switch_state_waittime_timout);
		this.switch_state_waittime = waittime;
		// tmp grafikal demo
		this.display_light();

		this.switch_state_waittime_timout = setTimeout(function(tmp_this){
			tmp_this.switch_state_waittime = 0;
			// tmp grafikal demo
			tmp_this.display_light();
			// Debug
			if(DEBUG == 1) console.log( "switch_state_waittime: ",  tmp_this.switch_state_waittime);
		}, waittime * 1000, this);
	}

	// tmp grafikal demo
	display(){
		$('#world').append('<div id="Crossing_'+this.id+'" class="crossing"></div>');
		this.display_update()
	}
	display_update(){
		if(this.state == 0) $('#Crossing_'+this.id).text('↕');
		if(this.state == 1) $('#Crossing_'+this.id).text('↔');
	}
	display_light(){
		if(this.switch_state_waittime == 0) $('#Crossing_'+this.id).css('background-color', 'white');
		if(this.switch_state_waittime != 0) $('#Crossing_'+this.id).css('background-color', 'lightgreen');
	}
	display_use(){
		if(this.in_use == 0) $('#Crossing_'+this.id).css('color', 'black');
		if(this.in_use == 1) $('#Crossing_'+this.id).css('color', 'red');
	}
}