import WonderCamera from './SKCamera';
import WonderScene from './SKScene';
import WonderRenderer from './SKRenderer';
import WonderOperator from './SKOperator';
import MainUI from './MainUI';
var gobal:any = window;
declare var sk:SKongVR;

export default class SKongVR{
  camera:WonderCamera;
  scene:WonderScene;
  renderer:WonderRenderer;
  operator:WonderOperator;

  orthoCamera:THREE.OrthographicCamera;
  perspCamera:THREE.PerspectiveCamera;

  public mainUI:MainUI;

  private _isCanvas2DDrawing:boolean;
  //测试

  set isCanvas2DDrawing(value:boolean){
    this._isCanvas2DDrawing = true;
    if(value == true){
      this.camera = this.orthoCamera;
    }else{
      this.camera = this.perspCamera;
    }

  }

  constructor(){

    var groundWidth:number = 16;//unit m;
    var groundWidth:number = 16;//unit m;
    ///	scene.fog = new THREE.Fog( 0xffffff, 1000, 4000 );

   this.perspCamera =new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 50*1000 );
   this.perspCamera.position.set(2860,3490,5464);
   this.orthoCamera = new THREE.OrthographicCamera(-10*1000,10*1000,10*1000,-10*1000,1,50*1000);
   this.orthoCamera.position.set(0,1000*30,0);


  // this.camera = this.perspCamera;
      this.isCanvas2DDrawing = false;

    this.scene = new WonderScene();
    this.renderer =  new WonderRenderer();
    this.operator = new WonderOperator(this);

    this.mainUI = new MainUI(this);
    gobal.sk = this;

   this.drawRoom();
  }

  //画房间，在二维平面上画出房间结构
  drawRoom(){

    console.log('画房间');

    //相机移动到顶视图
    var targetPosition = { x: 0, y: 1000 * 30 ,z:0};
    var scope = this;

    var oldCamera = scope.camera;
    var tween = new TWEEN.Tween(this.camera.position)
        .to(targetPosition, 1000)
        .onUpdate(function() {
          scope.camera.position.set(this.x,this.y,this.z);
        })
        .onComplete(function(){

          //scope.camera.position.set(targetPosition)
          scope.isCanvas2DDrawing = true;
          scope.orthoCamera.rotation.setFromVector3(new THREE.Vector3(-1.57,0,0))
        })
        .start();
    //切换WebGLRenderer到CanvasRenderer
    //实际使用CanvasRenderer绘制
  }

  update(delta,clock:THREE.Clock){
    this.operator.update(delta);
    this.scene.update(delta,clock);

  }


  render(){
      this.camera.lookAt( this.scene.position );
 this.orthoCamera.rotation.setFromVector3(new THREE.Vector3(-1.57,0,0))
      this.renderer.render(this.scene, this.camera);


  }

  run(){
      var clock = new THREE.Clock();
      var render =  (time?:number)=> {
        var delta = clock.getDelta();
        TWEEN.update(time);
        //this.transformControls.update();
        requestAnimationFrame( render );
        this.update(delta,clock);
        this.render();
      };

      requestAnimationFrame( render );
  }
}
