//WonderVR默认单位 mm
import WonderCamera from './WonderCamera';
import WonderScene from './WonderScene';
import WonderRenderer from './WonderRenderer';
import WonderOperator from './WonderOperator';

export default class WonderVR{
  camera:WonderCamera;
  scene:WonderScene;
  renderer:WonderRenderer;
  operator:WonderOperator;


  constructor(){

    ///	scene.fog = new THREE.Fog( 0xffffff, 1000, 4000 );

    this.camera =new WonderCamera();
    this.scene = new WonderScene();
    this.renderer =  new WonderRenderer();
    this.operator = new WonderOperator(this);

  }


  update(delta){
    this.operator.update(delta);
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

      
        //this.transformControls.update();
        requestAnimationFrame( render );
        this.update(delta);
        this.render();
      };

      render();
  }
}
