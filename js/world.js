// Require all classes and data files
require('./js/lib/seedrandom.min.js')
const syllables = require('./data/syllables.json')
const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)
var Animation = require('./js/class/animation.class.js').Animation

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
  const { Human } = require('./js/class/human.class.js')
  const { Building } = require('./js/class/building.class.js')

  log(NOTE, "--- START ---")
  log(NOTE, "Node: "+process.versions.node )
  log(NOTE, "Chrome: "+process.versions.chrome )
  log(NOTE, "Electron: "+process.versions.electron )
  Math.random = new Math.seedrandom(seed) // start random seed Math.random()
  //AnimationProcess = new Animation()

  firstHuman = new Human()
  firstBuilding = new Building(20,2)
  console.log(firstHuman)
  console.log(firstBuilding)
})

/**
 * Make a Number from the probabilities
 * @param probabilities [2.2, 40, 70]
 * @return int number
 */
function getNumber(probabilities){
    var rnd = Math.random();
    var total = 0;
    var hit;
    for(var i = 0; i < probabilities.length; i++){
      if(rnd > total && rnd < total + probabilities[i][0]){
           hit = probabilities[i]
      }
      total += probabilities[i][0];
    }
    return Number((hit[1] + (Math.random() * (hit[2] - hit[1]))).toFixed(2));
}

/**
 * sync calls Functions listed in an array can be used only one time!
 * @param func arraz of callfunctions | call_array([["addScript","./class/entity.class.js"],["addScript","./class/human.class.js"]]);
 */
function call_array(func, i = 0){
  $.when(
    window[func[i][0]](func[i][1])
  ).then(function(){
    if(i < func.length - 1){
      call_array(func, ++i)
    }else{
      after_init() // call last function
    }
  }) // then
}

/**
 * Dynamically add a script in the running time to the program
 * @param src string
 * @return errors are printetd in the div.log
 */
function addScript(src){
  $.getScript( src )
    .done(function( data, textStatus, jqxhr ) {
      log(NOTE, src + " Load was performed. ["+ textStatus+" "+jqxhr.status+"]" ) // Success
    })
    .fail(function( jqxhr, settings, exception ) { // show error in div.log
      log(ERROR, " FAIL | world.js | addScript('"+src+"'): [Triggered ajaxError handler]")
  })
}

/**
 * Logs everthing in a file and in the debug console
 * @param level Number
 * @param content string
 */
function log(level, content){
  content = $.now().dateTime() + " | " + content
  if(level <= DEBUG_LEVEL){
    $( "div.log" ).html( $( "div.log" ).html() + "<br>" + content )

    var fs = require('fs')
    fs.appendFile('log/debug.txt', content+"\n", function (err) {
      if (err) alert('Failed to save the file [./log/debug.txt]!')
    })
  }
  console.log(content)
}

/**
 * Change Timestamp to readable time string
 * @return time as String dd.mm.yyyy hh:mm:ss
 */
Number.prototype.dateTime = function () {
    var ndate = new Date(this)
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12']
    var year = ndate.getFullYear()
    var month = months[ndate.getMonth()]
    var date = ndate.getDate(); if(date < 10) date = "0"+date
    var hour = ndate.getHours(); if(hour < 10) hour = "0"+hour
    var min = ndate.getMinutes(); if(min < 10) min = "0"+min
    var sec = ndate.getSeconds(); if(sec < 10) sec = "0"+sec
    var time = date + '.' + month + '.' + year + ' ' + hour + ':' + min + ':' + sec
    return time
}
