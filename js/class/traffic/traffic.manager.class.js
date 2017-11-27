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
		var crossingtest1 = new Crossing(0, position_xy[0], position_xy[1]);

		var position_xy = Animation.grid.getPosition('1,1');
		var crossingtest2 = new Crossing(0, position_xy[0], position_xy[1]);

		// second
		var position_xy = Animation.grid.getPosition('1,-1');
		var crossingtest3 = new Crossing(0, position_xy[0], position_xy[1]);

		var position_xy = Animation.grid.getPosition('3,1');
		var crossingtest4 = new Crossing(0, position_xy[0], position_xy[1]);

		var first_street = new Street(1, 1, [crossingtest1, crossingtest2]);
		var first_street = new Street(1, 1, [crossingtest2, crossingtest3]);
		var first_street = new Street(1, 1, [crossingtest2, crossingtest4]);

		this.firstVehicle = new Vehicle(-1,1);

		crossingtest1.use(1);
		crossingtest1.idle(1);
		crossingtest1.use(1);
		crossingtest2.use(0);
		crossingtest4.use(1);
		crossingtest4.idle(1);
	}
}
exports.TrafficManager = TrafficManager
