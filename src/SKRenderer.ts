export default class SKRenderer extends THREE.WebGLRenderer{
  constructor(){
    super(( { antialias: true } ));
    this.setClearColor(  0xffffff );
    this.setPixelRatio( window.devicePixelRatio );

    this.setSize( window.innerWidth, window.innerHeight );

    this.gammaInput = true;
    this.gammaOutput = true;
    this.shadowMap.enabled = true;

  }
}
