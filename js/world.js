// DEBUG LEVELS
const ERROR = 1;
const WARNING = 2;
const INFO = 3;
const NOTE = 4;
const DEBUG_LEVEL = ERROR; // set minimal debug level

// used for names and stuff
const syllables;

// Start ID
var world_id = 1;
// seed for random functions
var seed = "cybot007";

$( document ).ready(function() {
  log(NOTE, "--- START ---");
  log(NOTE, "Node: "+process.versions.node );
  log(NOTE, "Chrome: "+process.versions.chrome );
  log(NOTE, "Electron: "+process.versions.electron );

  // include scripts
  syllables = require('./data/syllables.json');

  $.when(
    addScript("./js/seedrandom.min.js") // first
  ).then(function(){ // #1
    Math.random = new Math.seedrandom(seed); // start random seed Math.random()
    console.log(Math.random());

    $.when(
      addScript("./class/entity.class.js") // second
    ).then(function(){ // #2
      $.when(
        addScript("./class/human.class.js") // last
      ).then(function(){ // #3
        firstHuman = new Human();
        console.log(firstHuman.name);
      }); // #3
    }); // #2
  }); // #1
});

/**
 * sync calls Functions listed in an array
 * @param func arraz of callfunctions
 */
function call_array(func){
  
}

/**
 * Dynamically add a script in the running time to the program
 * @param src string
 * @return errors are printetd in the div.log
 */
function addScript(src){
  $.getScript( src )
    .done(function( data, textStatus, jqxhr ) {
      log(NOTE, src + " Load was performed. ["+ textStatus+" "+jqxhr.status+"]" ); // Success
    })
    .fail(function( jqxhr, settings, exception ) { // show error in div.log
      log(ERROR, " FAIL | world.js | addScript('"+src+"'): [Triggered ajaxError handler]");

  });
}

/**
 * Logs everthing in a file and in the debug console
 * @param level Number
 * @param content string
 */
function log(level, content){
  content = $.now().dateTime() + " | " + content;
  if(level <= DEBUG_LEVEL){
    $( "div.log" ).html( $( "div.log" ).html() + "<br>" + content );

    var fs = require('fs');
    fs.appendFile('log/debug.txt', content+"\n", function (err) {
      if (err) alert('Failed to save the file [./log/debug.txt]!');;
    });
  }
  console.log(content);
}

/**
 * Change Timestamp to readable time string
 * @return time as String dd.mm.yyyy hh:mm:ss
 */
Number.prototype.dateTime = function () {
    var ndate = new Date(this);
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var year = ndate.getFullYear();
    var month = months[ndate.getMonth()];
    var date = ndate.getDate(); if(date < 10) date = "0"+date;
    var hour = ndate.getHours(); if(hour < 10) hour = "0"+hour;
    var min = ndate.getMinutes(); if(min < 10) min = "0"+min;
    var sec = ndate.getSeconds(); if(sec < 10) sec = "0"+sec;
    var time = date + '.' + month + '.' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}
