//WonderVR默认单位 mm
import WonderCamera from './WonderCamera';
import WonderScene from './WonderScene';
import WonderRenderer from './WonderRenderer';
import WonderOperator from './WonderOperator';
import MainUI from './MainUI';
var gobal:any = window;
export default class WonderVR{
  camera:WonderCamera;
  scene:WonderScene;
  renderer:WonderRenderer;
  operator:WonderOperator;
  public mainUI:MainUI;
  //测试
  constructor(){

    ///	scene.fog = new THREE.Fog( 0xffffff, 1000, 4000 );

    this.camera =new WonderCamera();
    this.scene = new WonderScene();
    this.renderer =  new WonderRenderer();
    this.operator = new WonderOperator(this);
    this.mainUI = new MainUI(this);
    (<any>window).wr = this;
  }

  drawRoom(){
    console.log('画房间');
  }

  update(delta,clock:THREE.Clock){
    this.operator.update(delta);
    this.scene.update(delta,clock);

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
        this.update(delta,clock);
        this.render();
      };

      render();
  }
}
