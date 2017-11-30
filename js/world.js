/**
 * Settings
 */

// DEBUG LEVELS
const ERROR = 1
const WARNING = 2
const INFO = 3
const NOTE = 4
const DEBUG_LEVEL = ERROR // set minimal debug level

// Start ID
var world_id = 0
// seed for random functions
var seed = "5345345"

/**
 * Requires
 */

// Require all classes and data files
require('./js/lib/seedrandom.min.js');
require('./js/lib/functions.lib.js')(); // the "()" activates the functions in the library and puts them into the global functions
const syllables = require('./data/syllables.json')
const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)

const { Entity } = require('./js/class/entity.class.js');
const { CityManager } = require('./js/class/manager/city.manager.class.js');

// Directly init this Classes Global!
var Animation = require('./js/class/animation/animation.class.js').Animation
var BuildingManager = require('./js/class/manager/building.manager.class.js').BuildingManager
var TrafficManager = require('./js/class/manager/traffic.manager.class.js').TrafficManager

/**
 * View
 */

// Fires when document is loaded
$( document ).ready(function() {
  document.body.appendChild( Animation.renderer.domElement );
  const { Human } = require('./js/class/human/human.class.js')

  log(NOTE, "--- START ---")
  log(NOTE, "Node: "+process.versions.node )
  log(NOTE, "Chrome: "+process.versions.chrome )
  log(NOTE, "Electron: "+process.versions.electron )
  Math.random = new Math.seedrandom(seed) // start random seed Math.random()

  firstHuman = new Human()

  $('html').keydown(function(e){
     switch (e.which) {
       case 38:
         TrafficManager.firstVehicle.drive(1)
         break;
       case 39:
         TrafficManager.firstVehicle.drive(2)
        break;
       case 40:
         TrafficManager.firstVehicle.drive(3)
        break;
       case 37:
         TrafficManager.firstVehicle.drive(4)
        break;
     }
  });

  console.log(firstHuman)
})
