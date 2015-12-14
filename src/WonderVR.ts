//WonderVR默认单位 mm
import WonderCamera from './WonderCamera';
import WonderScene from './WonderScene';
import WonderRenderer from './WonderRenderer';


export default class WonderVR{
  camera:WonderCamera;
  scene:WonderScene;
  renderer:WonderRenderer;
  cameraControls;
  constructor(){

    ///	scene.fog = new THREE.Fog( 0xffffff, 1000, 4000 );

    this.camera =new WonderCamera();
    this.scene = new WonderScene();
    this.renderer =  new WonderRenderer();

    var scope = this;

    //this.cameraControls = new THREE.OrbitControls( this.camera, this.renderer.domElement );

    var controls = new THREE.EditorControls( this.camera, this.renderer.domElement );
    controls.addEventListener( 'change', function () {
      transformControls.update();
    } );

    var selectionBox = new THREE.BoxHelper();
    selectionBox.material.depthTest = false;
    selectionBox.material.transparent = true;
    selectionBox.visible = false;

      var transformControls = new THREE.TransformControls( this.camera,  this.renderer.domElement );
      transformControls.addEventListener( 'change',  () =>{

        var object = transformControls.object;

        if ( object !== undefined ) {

          selectionBox.update( object );
        }
        this.render();
      });
      transformControls.addEventListener( 'mouseDown', function () {

        var object = transformControls.object;


        controls.enabled = false;

      } );
      transformControls.addEventListener( 'mouseUp', function () {


        controls.enabled = true;

      } );


      var onDownPosition = new THREE.Vector2();
      var onUpPosition = new THREE.Vector2();

      function getMousePosition( dom, x, y ) {

        var rect = dom.getBoundingClientRect();
        return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];

      };

      var renderer = this.renderer;
      var scene = this.scene;
      var camera = this.camera;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

renderer.domElement.addEventListener( 'mousedown', onMouseDown, false );


        function getIntersects( point, objects ) {

          mouse.set( ( point.x * 2 ) - 1, - ( point.y * 2 ) + 1 );

          raycaster.setFromCamera( mouse, camera );

          return raycaster.intersectObjects( objects ,true);

        };

      function onMouseDown( event ) {
        event.preventDefault();
        var array = getMousePosition( renderer.domElement, event.clientX, event.clientY );
		    onDownPosition.fromArray( array );
        document.addEventListener( 'mouseup', onMouseUp, false );
      };

      function onMouseUp( event ) {
        var array = getMousePosition( renderer.domElement, event.clientX, event.clientY );
		    onUpPosition.fromArray( array );
        handleClick();
        document.removeEventListener( 'mouseup', onMouseUp, false );
      };

      function handleClick() {

      		if ( onDownPosition.distanceTo( onUpPosition ) == 0 ) {

      			var intersects = getIntersects( onUpPosition, scene.children );
      			if ( intersects.length > 0 ) {

      				var object = intersects[ 0 ].object;

      				if ( object.userData.object !== undefined ) {

      					// helper

      					select( object.userData.object );

      				} else {

      					select( object );

      				}

      			} else {

      				select( null );

      			}

      			scope.render();

      		}
      	};

        function select(object){
          var bbHelper = new THREE.BoundingBoxHelper( object, 0xffffff );
          bbHelper.visible = false;
          scene.add( bbHelper );
          bbHelper.update();

          // box helper - doesn't have diagonals
          var boxHelper = new THREE.BoxHelper( bbHelper ); // to remove the diagonals
          (<any>boxHelper).material.color.set( 0xff9000 );
          scene.add( boxHelper );

        }
  }


  update(delta){
    this.scene.update(delta);

  }
  render(){

      this.camera.lookAt( this.scene.position );

      this.renderer.render(this.scene, this.camera);
  }

  run(){
      var clock = new THREE.Clock();
      var render =  ()=> {
        var delta = clock.getDelta();

        //this.cameraControls.update( delta );

        requestAnimationFrame( render );
        this.update(delta);
        this.render();
      };

      render();
  }
}
