const { Crossing } = require('./crossing.class.js');
const { Street } = require('./street.class.js');
const { Vehicle } = require('./vehicle.class.js');
class TrafficManager{
	constructor(){
		this.test();
	}

	test(){

		var position_xy = Animation.grid.getPosition('-1,-1');
		this.crossingtest0 = new Crossing(0, position_xy[0], position_xy[1]);

		// first
		var position_xy = Animation.grid.getPosition('-1,1');
		this.crossingtest1 = new Crossing(0, position_xy[0], position_xy[1]);

		var position_xy = Animation.grid.getPosition('1,1');
		this.crossingtest2 = new Crossing(0, position_xy[0], position_xy[1]);

		// second
		var position_xy = Animation.grid.getPosition('1,-1');
		this.crossingtest3 = new Crossing(0, position_xy[0], position_xy[1]);

		var position_xy = Animation.grid.getPosition('3,-1');
		this.crossingtest5 = new Crossing(0, position_xy[0], position_xy[1]);

		var position_xy = Animation.grid.getPosition('3,1');
		this.crossingtest4 = new Crossing(0, position_xy[0], position_xy[1]);

		var position_xy = Animation.grid.getPosition('8,1');
		this.crossingtestfaraway = new Crossing(0, position_xy[0], position_xy[1]);

		var position_xy = Animation.grid.getPosition('8,2');
		this.crossingtestfaraway2 = new Crossing(0, position_xy[0], position_xy[1]);

		var position_xy = Animation.grid.getPosition('-1,2');
		this.crossingtest6 = new Crossing(0, position_xy[0], position_xy[1]);

		this.first_street1 = new Street(1, 1, [this.crossingtest1, this.crossingtest2]);
		this.first_street2 = new Street(1, 1, [this.crossingtest2, this.crossingtest3]);
		this.first_street3 = new Street(1, 1, [this.crossingtest2, this.crossingtest4]);

		this.first_street4 = new Street(1, 1, [this.crossingtest1, this.crossingtest0]);
		this.first_street5 = new Street(1, 1, [this.crossingtest0, this.crossingtest3]);
		this.first_street6 = new Street(1, 1, [this.crossingtest3, this.crossingtest5]);
		this.first_street7 = new Street(1, 1, [this.crossingtest5, this.crossingtest4]);
		this.first_street7 = new Street(1, 1, [this.crossingtest4, this.crossingtestfaraway]);
		this.first_street7 = new Street(1, 1, [this.crossingtestfaraway, this.crossingtestfaraway2]);
		this.first_street7 = new Street(1, 1, [this.crossingtestfaraway2, this.crossingtest6]);
		this.first_street7 = new Street(1, 1, [this.crossingtest6, this.crossingtest1]);

		this.firstVehicle = new Vehicle(-1,-1);
		//this.firstVehicle.drive(3,1);
/*
		crossingtest1.use(1);
		crossingtest1.idle(1);
		crossingtest2.use(0);
		crossingtest2.idle(1);
		crossingtest4.use(1);
		crossingtest4.idle(1);
*/
	}
}
exports.TrafficManager = TrafficManager
