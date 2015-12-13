//WonderVR默认单位 mm
import WonderCamera from './WonderCamera';
import WonderScene from './WonderScene';
import WonderRenderer from './WonderRenderer';
import RotatingCube from './RotatingCube';
import Desk from './Desk';

export default class WonderVR{
  camera:WonderCamera;
  scene:WonderScene;
  renderer:WonderRenderer;
  cameraControls;
  constructor(){
    var scene = new WonderScene();
    ///	scene.fog = new THREE.Fog( 0xffffff, 1000, 4000 );
    var camera = new WonderCamera();

    var renderer = new WonderRenderer();

    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;



    scene.add( new RotatingCube(1*1000,0x00ff00) );

    new Desk().load((desk:Desk)=>{
      scene.add(desk);
    });



    this.cameraControls = new THREE.OrbitControls( camera, renderer.domElement );

  }

  run(){
      var clock = new THREE.Clock();
      var render =  ()=> {
        var delta = clock.getDelta();

        this.cameraControls.update( delta );

        requestAnimationFrame( render );

        this.scene.update(delta);
        this.camera.lookAt( this.scene.position );

        this.renderer.render(this.scene, this.camera);
      };

      render();
  }
}
