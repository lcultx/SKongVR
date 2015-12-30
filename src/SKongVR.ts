import SKCamera from './SKCamera';
import SKScene from './SKScene';
import SKRenderer from './SKRenderer';
import SKOperator from './SKOperator';
import MainUI from './MainUI';
var gobal: any = window;


export default class SKongVR{

  scene: SKScene;

  _renderer: THREE.Renderer;
  operator: SKOperator;

  orthoCamera: THREE.OrthographicCamera;
  perspCamera: THREE.PerspectiveCamera;
  canvasRenderer: THREE.CanvasRenderer;
  webglRenderer: THREE.WebGLRenderer;

  public mainUI: MainUI;

  private is2DDrawing: boolean;
  oldCameraPosition:THREE.Vector3;
  //测试

  get camera():SKCamera{
    if(this.is2DDrawing){
      return this.orthoCamera;
    }else{
      return this.perspCamera;
    }
  }

  get renderer(): THREE.Renderer {
    if (this.is2DDrawing) {
      return this.canvasRenderer;
    } else {
      return this.webglRenderer;
    }
  }


  constructor() {

    var groundWidth: number = 16;//unit m;
    var groundWidth: number = 16;//unit m;
    ///	scene.fog = new THREE.Fog( 0xffffff, 1000, 4000 );

    this.perspCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50 * 1000);
    this.perspCamera.position.set(2860, 3490, 5464);
    this.perspCamera.lookAt(new THREE.Vector3(0, 0, 0));
    this.orthoCamera = new THREE.OrthographicCamera(-10 * 1000, 10 * 1000, 10 * 1000, -10 * 1000, 1, 50 * 1000);
    this.orthoCamera.position.set(0, 1000 * 30, 0);
    this.perspCamera.lookAt(new THREE.Vector3(0, 0, 0));
    this.orthoCamera.lookAt(new THREE.Vector3(0, 0, 0));
    console.log(this.orthoCamera.rotation);

    // this.camera = this.perspCamera;
    this.is2DDrawing = false;



    var webglRenderer = new THREE.WebGLRenderer({ antialias: true });
    this.webglRenderer = webglRenderer;
    webglRenderer.setClearColor(0xffffff);
    webglRenderer.setPixelRatio(window.devicePixelRatio);

    webglRenderer.setSize(window.innerWidth, window.innerHeight);

    webglRenderer.gammaInput = true;
    webglRenderer.gammaOutput = true;
    webglRenderer.shadowMap.enabled = true;

    var canvasRenderer = new THREE.CanvasRenderer();
    this.canvasRenderer = canvasRenderer;
    canvasRenderer.setClearColor(0xffffff);
    canvasRenderer.setPixelRatio(window.devicePixelRatio);
    canvasRenderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new SKScene(this);

    this.operator = new SKOperator(this);

    this.mainUI = new MainUI(this);
    gobal.sk = this;

    this.drawRoom();
  }

  //画房间，在二维平面上画出房间结构
  drawRoom() {

    console.log('画房间');

    var scope = this;
    //scope.is2DDrawing = true;
    // setTimeout(function(){
    //   //scope.is2DDrawing = true;
    //   //  scope.orthoCamera.position.set(targetPosition.x, targetPosition.y, targetPosition.z)
    //   //  scope.orthoCamera.lookAt(new THREE.Vector3(0, 0, 0))
    //   //console.log(scope.orthoCamera.rotation)
    //   //scope.scene.initDrawStage();
    // },100);
    //this.is2DDrawing = true;
    //相机移动到顶视图
    var targetPosition = { x: 0, y: 1000*25 , z: 0 };
    var scope = this;
    var count = 0;
    this.oldCameraPosition = this.perspCamera.position;
    var tween = new TWEEN.Tween({ x: 10000, y: 1000 , z: 1000 })
      .to(targetPosition, 1000)
      .onUpdate(function() {
     // console.log(this);
        scope.perspCamera.position.set(this.x, this.y, this.z);
        scope.perspCamera.lookAt(new THREE.Vector3(0, 0, 0));
        // scope.orthoCamera.position.set(this.x, this.y, this.z)
        //  scope.orthoCamera.lookAt(new THREE.Vector3(0, 0, 0))
        //console.log(count++,scope.perspCamera.rotation);
      })
      .onComplete(function() {
        console.log('finish',scope.perspCamera.rotation);

        scope.scene.initDrawStage(); 
      })
      .start();
    //切换WebGLRenderer到CanvasRenderer
    //实际使用CanvasRenderer绘制
  }

  drawScene(){
    var scope = this;
    scope.is2DDrawing = false;
    var tween = new TWEEN.Tween(this.perspCamera.position)
      .to(scope.oldCameraPosition, 1000)
      .onUpdate(function() {
        console.log(this);
        scope.perspCamera.position.set(this.x, this.y, this.z);
      })

      .onComplete(function(){

        //scope.camera.position.set(targetPosition)
          //scope.is2DDrawing = false;

      })
      .start();
  }
  update(delta, clock: THREE.Clock) {
    if(!this.is2DDrawing){
      this.operator.update(delta);
    }
    this.scene.update(delta, clock);

  }


  render() {
    if (this.is2DDrawing) {
      console.log('2d render')
      this.canvasRenderer.render(this.scene, this.orthoCamera);
    } else {
      this.webglRenderer.render(this.scene, this.perspCamera);
    }

  }

  run() {
    var clock = new THREE.Clock();
    var render = (time?: number) => {
      var delta = clock.getDelta();
      TWEEN.update(time);
      //this.transformControls.update();
      requestAnimationFrame(render);
      this.update(delta, clock);
      this.render();
    };

    requestAnimationFrame(render);
  }
}
