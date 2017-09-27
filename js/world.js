$( document ).ready(function() {
  console.log( "ready fired!" );

  // include a script
  addScript("./class/entity.class.js");
});

function addScript(src){
  $.getScript( src, function( data, textStatus, jqxhr ) {
    console.log( data ); // Data returned
    console.log( textStatus ); // Success
    console.log( jqxhr.status ); // 200
    console.log( "Load was performed." );
  });
}
