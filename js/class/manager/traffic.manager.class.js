const { Crossing } = require('../traffic/crossing.class.js');
const { Street } = require('../traffic/street.class.js');
const { Vehicle } = require('../traffic/vehicle.class.js');
class TrafficManager extends CityManager{
	constructor(){
		super();

		this.network = []; // all Traffic obj will be stored there exept vehicles
		this.network['Crossing'] = [];
		this.network['Street'] = [];

		this.Vehicles = [];
		// North east south west: more as 1 neighbor = Crossing dies and turns to Street
		// Street more as 5 neighbor Tourns to Crossing
		// Crossing more as 5 neighbor Tourn to Building
		// Formel: B > 2N -> C > 1N -> S > 5N -> C > 5N -> B

		this.test();

	}

	addCrossing(grid_x, grid_y){
		var position_xy = Animation.grid.getPosition(grid_x+','+grid_y);
		this.network['Crossing'][this.network['Crossing'].length] = new Crossing(0, position_xy[0], position_xy[1]);
		return 1;
	}

	checkCrossing(grid_x, grid_y){
		counter = this.countNeighbours(grid_x, grid_y, 1); // get direct Neighbours
    if(counter['Crossing'] > 3) // Crossing trouns to Building
    console.log(Animation.grid.grid[grid_x][grid_y], '->', 'Building');
	}

	addStreet(grid_x, grid_y, lane = 1){
		var neighbors = this.scanNeighbours(grid_x,grid_y); // max dist 10
		var connections = [];
		var state = 0;
		if(neighbors[1] !== undefined && neighbors[3] !== undefined){
			if(neighbors[1].constructor.name == 'Crossing' && neighbors[3].constructor.name == 'Crossing'){
				connections[connections.length] = neighbors[1]; // North ->
				connections[connections.length] = neighbors[3]; // South
				state = 0;
			}
		}else if(neighbors[4] !== undefined && neighbors[2] !== undefined){
			if(neighbors[4].constructor.name == 'Crossing' && neighbors[2].constructor.name == 'Crossing'){
				connections[connections.length] = neighbors[4]; // West ->
				connections[connections.length] = neighbors[2]; // East
				state = 1;
			}
		}
		if(connections.length < 2) return false;
		this.network['Street'][this.network['Street'].length] =this.first_street1 = new Street(state, lane, [connections[0], connections[1]]);
		return 1;
	}

	checkStreet(grid_x, grid_y){
		counter = this.countNeighbours(grid_x, grid_y, 1); // get direct Neighbours
    if(counter['Street'] > 4) // Crossing trouns to Building
    console.log(Animation.grid.grid[grid_x][grid_y], '->', 'Building');
	}

	test(){

		this.addCrossing(-1, -1);
		this.addCrossing(-1, 1);
		this.addCrossing(1, 1);
		this.addCrossing(1, -1);
		this.addCrossing(3, -1);
		this.addCrossing(3, 1);
		this.addCrossing(8, 1);
		this.addCrossing(9, 2);
		this.addCrossing(-1, 2);

		this.addStreet(0, -1);
		this.addStreet(-1, 0);
		this.addStreet(0, 1);
		this.addStreet(1, 0);
		this.addStreet(2, -1);
		this.addStreet(3, 0);
		this.addStreet(2, 1);
		this.addStreet(4, 1);
		this.addStreet(1, 2);

		this.addStreet(-1, 2);

		/*
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
		*/

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
exports.TrafficManager = new TrafficManager()
