const { Crossing } = require('./crossing.class.js');
const { Street } = require('./street.class.js');
const { Vehicle } = require('./vehicle.class.js');
class TrafficManager{
	constructor(){
		this.test();
	}

	test(){
		// first
		var position_xy = Animation.grid.getPosition('-1,1');
		this.crossingtest1 = new Crossing(0, position_xy[0], position_xy[1]);

		var position_xy = Animation.grid.getPosition('1,1');
		this.crossingtest2 = new Crossing(0, position_xy[0], position_xy[1]);

		// second
		var position_xy = Animation.grid.getPosition('1,-1');
		this.crossingtest3 = new Crossing(0, position_xy[0], position_xy[1]);

		var position_xy = Animation.grid.getPosition('3,1');
		this.crossingtest4 = new Crossing(0, position_xy[0], position_xy[1]);

		this.first_street1 = new Street(1, 1, [this.crossingtest1, this.crossingtest2]);
		this.first_street2 = new Street(1, 1, [this.crossingtest2, this.crossingtest3]);
		this.first_street3 = new Street(1, 1, [this.crossingtest2, this.crossingtest4]);

		this.firstVehicle = new Vehicle();
		this.firstVehicle.drive(3);
		this.firstVehicle.drive(2);
		this.firstVehicle.drive(1);
		this.firstVehicle.drive(1);
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
