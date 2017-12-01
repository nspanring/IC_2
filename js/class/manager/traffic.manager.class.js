const { Crossing } = require('../traffic/crossing.class.js');
const { Street } = require('../traffic/street.class.js');
const { Vehicle } = require('../traffic/vehicle.class.js');
class TrafficManager extends CityManager{
	constructor(){
		super();

		this.network['Crossing'] = [];
		this.network['Street'] = [];
		this.network_id_c = 1;

		this.Vehicles = [];
		// North east south west: more as 1 neighbor = Crossing dies and turns to Street
		// Street more as 5 neighbor Tourns to Crossing
		// Crossing more as 5 neighbor Tourn to Building
		// Formel: B > 2N -> C > 1N -> S > 5N -> C > 5N -> B

		this.test();

	}

	addCrossing(grid_x, grid_y){
		var position_xy = Animation.grid.getPosition(grid_x+','+grid_y);
		this.network['Crossing'][this.network_id_c] = new Crossing(this.network_id_c++, 0, position_xy[0], position_xy[1]);

		var neighbors = this.scanNeighbours(grid_x,grid_y, 15, 1); // max dist 10
		for (var i = 1; i <= neighbors.length; i++) {
			if(neighbors[i] !== undefined) if(neighbors[i].constructor.name == 'Crossing'){ // add street
				this.addStreet(grid_x, grid_y);
				if(i == 1) this.addStreet(grid_x, grid_y - 1);
				if(i == 2) this.addStreet(grid_x + 1, grid_y);
				if(i == 3) this.addStreet(grid_x, grid_y + 1);
				if(i == 4) this.addStreet(grid_x - 1, grid_y);
			}
		}

		this.checkCrossing(grid_x, grid_y, 1);
		return 1;
	}

	removeCrossing(grid_x, grid_y){
		Animation.scene.remove(Animation.grid.grid[grid_x][grid_y].group);
		var connectedStreets = Animation.grid.grid[grid_x][grid_y].connections;
		this.network['Crossing'][Animation.grid.grid[grid_x][grid_y].ID] = undefined
		Animation.grid.removeFromGrid(grid_x,grid_y)

		for (var i = 0; i < connectedStreets.length; i++) {
			if(connectedStreets[i] !== undefined)
			this.removeStreet(connectedStreets[i]);
		}
		this.checkCrossing(grid_x, grid_y, 1);
		return 1;
	}

	checkCrossing(grid_x, grid_y, update = 0){
		//var neighbors = this.getNeighbours(grid_x, grid_y, 1);
		/*
		if(update == 1){
			this.getNeighbours(grid_x, grid_y, 1, function(neighbors) {
				for (var i = 0; i < neighbors.length; i++) {
					if(Animation.grid.grid[grid_x][grid_y] !== undefined){
						if(Animation.grid.grid[grid_x][grid_y].constructor.name == 'Building')
						BuildingManager.checkBuilding(neighbors[i].grid_x, neighbors[i].grid_y); // without update flag

						if(Animation.grid.grid[grid_x][grid_y].constructor.name == 'Crossing')
						this.checkCrossing(neighbors[i].grid_x, neighbors[i].grid_y);
						//if(Animation.grid.grid[grid_x][grid_y].constructor.name == 'Street')
						//TrafficManager.checkCrossing(neighbors[i].grid_x, neighbors[i].grid_y);
					}
				}
			});
		}
		*/
		var counter = this.countNeighbours(grid_x, grid_y, 1); // get direct Neighbours
		if(counter['Crossing'] > 3){
			this.removeCrossing(grid_x, grid_y);
			BuildingManager.addBuilding(grid_x, grid_y);
		}
		return 1;
	}

	addStreet(grid_x, grid_y, lane = 1){
		var neighbors = this.scanNeighbours(grid_x,grid_y); // max dist 10
		var connections = [];
		var state = 0;
		if(neighbors[1] !== undefined && neighbors[3] !== undefined && neighbors[1].constructor.name == 'Crossing' && neighbors[3].constructor.name == 'Crossing'){
			connections[connections.length] = neighbors[1]; // North ->
			connections[connections.length] = neighbors[3]; // South
			state = 0;
			this.network['Street'][this.network_id_c] = new Street(this.network_id_c++, state, lane, [connections[0], connections[1]]);
		}
		connections = [];
		if(neighbors[4] !== undefined && neighbors[2] !== undefined && neighbors[4].constructor.name == 'Crossing' && neighbors[2].constructor.name == 'Crossing'){
			connections[connections.length] = neighbors[4]; // West ->
			connections[connections.length] = neighbors[2]; // East
			state = 1;
			this.network['Street'][this.network_id_c] = new Street(this.network_id_c++, state, lane, [connections[0], connections[1]]);
		}
		return 1;
	}

	removeStreet(street){
		for (var i = 0; i < street.grid_pices.length; i++) {
			if(Animation.grid.grid[street.grid_pices[i].x][street.grid_pices[i].y] !== undefined)
			if(Animation.grid.grid[street.grid_pices[i].x][street.grid_pices[i].y].constructor.name === 'Street'){
				Animation.grid.removeFromGrid(street.grid_pices[i].x,street.grid_pices[i].y)
			}
		}
		Animation.scene.remove(street.group);
		this.network['Street'][street.ID] = undefined;
		return 1;
	}

	checkStreet(grid_x, grid_y, update = 0){
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

		this.firstVehicle = new Vehicle(-1,-1);
	}
}
exports.TrafficManager = new TrafficManager()
