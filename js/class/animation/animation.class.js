var tempThis;
const { Grid } = require('../animation/grid.class.js');
class Animation {
  constructor(){
    this.renderer = new THREE.WebGLRenderer( { antialias: true, logarithmicDepthBuffer: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    //document.body.appendChild( this.renderer.domElement );

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
    this.camera.position.z = 400;

    this.scene = new THREE.Scene();
    this.scene.add( new THREE.AmbientLight( 0xFFFFFF ) );
    //this.scene.add( new THREE.AxisHelper( 100 ) ); // helper
    // controls

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.minDistance = 10;
    this.controls.maxDistance = 1000;
    this.controls.maxPolarAngle = Math.PI / 2;

    this.light = new THREE.PointLight( 0xffffff, 1 );
    this.camera.add( this.light );

    window.addEventListener( 'resize', this.onWindowResize, false );

    this.grid = new Grid();
    this.showGrid();

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

    //tempThis.group.rotation.x += 0.00;
    //tempThis.group.rotation.y += 0.01;

    tempThis.renderer.render( tempThis.scene, tempThis.camera );
  }

  addGroup(){
    var newgroup = new THREE.Group();
    this.scene.add( newgroup );
    return newgroup;
  }

  addMeshBox(group,x,y,z,width,depth,height,color=0xffffff, opacity=0.7){
    var geometry = new THREE.BoxBufferGeometry( width, height, depth );
    var wireframe = new THREE.EdgesGeometry( geometry );
    var mat = new THREE.LineBasicMaterial( { color: color, linewidth: 1 } );
    var line = new THREE.LineSegments( wireframe, mat );
    line.material.depthTest = false;
    line.material.opacity = opacity;
    line.material.transparent = true;
    line.position.x = x;
    line.position.y = y;
    line.position.z = z;
    //this.scene.add( line );
    group.add( line );
    return group;
  }

  addBox(group,x,y,z,width,depth,height,color=0xffffff, opacity=0.5){
    var geometry = new THREE.BoxBufferGeometry( width, height, depth );
    var wireframe = new THREE.EdgesGeometry( geometry );
    var material = new THREE.MeshBasicMaterial( {color: color} );
    var mat = new THREE.LineBasicMaterial( { color: color, linewidth: 1 } );
    var line = new THREE.LineSegments( wireframe, mat );
    var cube = new THREE.Mesh( geometry, material );
    line.material.depthTest = false;
    line.position.x = x;
    line.position.y = y;
    line.position.z = z;

    cube.material.depthTest = false;
    cube.material.opacity = opacity;
    cube.material.transparent = true;
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    //this.scene.add( line );
    group.add( line );
    group.add( cube );
    return group;
  }

  addBoxWithText(group,text,x,y,z,width,depth,height,color=0xffffff, opacity=0.5){
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    ctx.font = 'bold 150px Times New Roman';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 300,150);
    ctx.fillStyle = 'black';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 300 / 2 , 150 / 2 - 10);
    var texture = new THREE.Texture(canvas);
    texture.minFilter = THREE.LinearFilter;

    var geometry = new THREE.BoxBufferGeometry( width, height, depth );
    var material = new THREE.MeshBasicMaterial( {map: texture, transparent: true, color: color} );
    material.map.needsUpdate = true;
    var cube = new THREE.Mesh( geometry, material );
    cube.material.depthTest = false;
    cube.material.opacity = opacity;
    cube.material.transparent = true;
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    var wireframe = new THREE.EdgesGeometry( geometry );
    var mat = new THREE.LineBasicMaterial( { color: color, linewidth: 1 } );
    var line = new THREE.LineSegments( wireframe, mat );
    line.material.depthTest = false;
    line.position.x = x;
    line.position.y = y;
    line.position.z = z;


    //this.scene.add( line );
    group.add( line );
    group.add( cube );
    return ctx;
  }

  addPlane(group,x,y,width,height,color=0xffff00){
    var geometry = new THREE.PlaneGeometry( width, height );
    var material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotateX(Math.PI / 2)
    plane.position.x = x;
    plane.position.z = y;
    group.add(plane)
  }

  showGrid(size = 1000){
    var gridHelper = new THREE.GridHelper( this.grid.gridsize * size, size, 0x0000ff );
    this.scene.add( gridHelper );
  }

  showValue(size = this.grid.gridsize){
    var size_half = size / 2;

    if(this.grid.value !== undefined){
      var value_group = this.addGroup()
      var coord = [];
      var v = 0;
      var color = 0x000000;
      for (var x = -size_half; x < size_half; x++) {
        for (var y = -size_half; y < size_half; y++) {
          if(this.grid.value[x] !== undefined) if(this.grid.value[x][y] !== undefined){
            coord = this.grid.getCoordinates(x, y);
            v = this.grid.value[x][y];
            color = parseInt('0x'+v+''+v+''+v+''+v+''+v+''+v);
            this.addPlane(value_group,coord[0],coord[1],100,100,color);
          }
        }
      }
    }
  }
}
exports.Animation = new Animation()
