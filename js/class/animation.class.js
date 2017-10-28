var tempThis;
class Animation {
  constructor(){
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    //document.body.appendChild( this.renderer.domElement );

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.z = 400;

    this.scene = new THREE.Scene();
    this.scene.add( new THREE.AmbientLight( 0x888888 ) );
    //scene.add( new THREE.AxisHelper( 20 ) ); // helper
    // controls

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.minDistance = 20;
    this.controls.maxDistance = 500;
    this.controls.maxPolarAngle = Math.PI / 2;

    this.light = new THREE.PointLight( 0xffffff, 1 );
    this.camera.add( this.light );

    this.group = new THREE.Group();
    this.scene.add( this.group );

    this.geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
    this.wireframe = new THREE.WireframeGeometry( this.geometry );
    this.mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
    this.line = new THREE.LineSegments( this.wireframe, this.mat );
    this.line.material.depthTest = false;
    this.line.material.opacity = 0.5;
    this.line.material.transparent = true;
    this.scene.add( this.line );

    this.group.add( this.line );

    window.addEventListener( 'resize', this.onWindowResize, false );

    tempThis = this;
    this.animate();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  animate() {
    requestAnimationFrame( tempThis.animate );

    tempThis.group.rotation.x += 0.00;
    tempThis.group.rotation.y += 0.01;

    tempThis.renderer.render( tempThis.scene, tempThis.camera );
  }

  addGroup(){
    var newgroup = new THREE.Group();
    this.scene.add( newgroup );
    return newgroup;
  }

  addBox(group,x,y,z,width,depth,height,color=0xffffff){
    var geometry = new THREE.BoxBufferGeometry( width, height, depth );
    var wireframe = new THREE.WireframeGeometry( geometry );
    var mat = new THREE.LineBasicMaterial( { color: color, linewidth: 2 } );
    var line = new THREE.LineSegments( wireframe, mat );
    line.material.depthTest = false;
    line.material.opacity = 0.5;
    line.material.transparent = true;
    line.position.x = x;
    line.position.y = y;
    line.position.z = z;
    //this.scene.add( line );
    group.add( line );
  }
}
exports.Animation = new Animation()
