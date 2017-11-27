// Require all classes and data files
require('./js/lib/seedrandom.min.js');
require('./js/lib/functions.lib.js')(); // the "()" activates the functions in the library and puts them into the global functions
const syllables = require('./data/syllables.json')
const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)
var Animation = require('./js/class/animation/animation.class.js').Animation

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

// Fires when document is loaded
$( document ).ready(function() {
  document.body.appendChild( Animation.renderer.domElement );
  const { Human } = require('./js/class/human/human.class.js')
  const { Building } = require('./js/class/building/building.class.js')

  log(NOTE, "--- START ---")
  log(NOTE, "Node: "+process.versions.node )
  log(NOTE, "Chrome: "+process.versions.chrome )
  log(NOTE, "Electron: "+process.versions.electron )
  Math.random = new Math.seedrandom(seed) // start random seed Math.random()
  //AnimationProcess = new Animation()

  firstHuman = new Human()
  firstBuilding = new Building(20,10,0,0)
  firstBuilding = new Building(20,7,150,0)
  firstBuilding = new Building(20,8,300,0)
  firstBuilding = new Building(20,6,450,0)
  firstBuilding = new Building(20,4,600,0)

  console.log(firstHuman)
  console.log(firstBuilding)
})
