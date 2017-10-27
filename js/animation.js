var camera, scene, renderer;
var mesh;

init();
animate();

function init() {

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 400;

  scene = new THREE.Scene();
  scene.add( new THREE.AmbientLight( 0x888888 ) );
  //scene.add( new THREE.AxisHelper( 20 ) ); // helper
  // controls

  var controls = new OrbitControls( camera, renderer.domElement );
  controls.minDistance = 20;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2;

  var light = new THREE.PointLight( 0xffffff, 1 );
  camera.add( light );

  var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );

  var meshMaterial = new THREE.MeshLambertMaterial( {
    color: 0xffffff,
    opacity: 0.5,
    transparent: true
  } );

  group = new THREE.Group();
  scene.add( group );

  var wireframe = new THREE.WireframeGeometry( geometry );
  var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
  var line = new THREE.LineSegments( wireframe, mat );
  line.color = 0xffffff;
  line.material.depthTest = false;
  line.material.opacity = 0.5;
  line.material.transparent = true;
  scene.add( line );

  for (var x = 10; x > 0; x--) {
    for (var y = 10; y > 0; y--) {
      line2 = line.clone();
      line2.position.x = x*20;
      line2.position.y = y*20;
      scene.add( line2 );
    }
  }

  group.add( line );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );

  group.rotation.x += 0.00;
  group.rotation.y += 0.01;

  renderer.render( scene, camera );

}
