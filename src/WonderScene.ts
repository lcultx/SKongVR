import RotatingCube from './RotatingCube';
import * as type from './type';
import WonderObjLoader from './WonderObjLoader';
var a = {
  a:1
}



export default class WonderScene extends THREE.Scene{
  constructor(){
    super();
//环境光
    	this.add( new THREE.AmbientLight( 0x222222 ) );
//平行光
      var light = new THREE.DirectionalLight( 0xffffff, 2.25 );
      light.position.set( 200, 450, 500 );
      light.castShadow = true;
      light.shadowMapWidth = 1024;
      light.shadowMapHeight = 1024;
      (<any>light).shadowMapDarkness = 0.95;
      (<any>light).shadowCameraVisible = true;
      light.shadowCameraNear = 100;
      light.shadowCameraFar = 1200;
      light.shadowCameraTop = 350;
      light.shadowCameraBottom = -350;
      light.shadowCameraRight = 1000;
      light.shadowCameraLeft = -1000;
      this.add( light );
//图片工具集
      var gt = THREE.ImageUtils.loadTexture( "./resource/textures/terrain/1.jpg" );
      var gg = new THREE.PlaneBufferGeometry( 16000, 16000 );

      var gm = new THREE.MeshPhongMaterial( { color: 0xffffff, map: gt } );
      var ground = new THREE.Mesh( gg, gm );
      ground.rotation.x = - Math.PI / 2;
      //材质对象material()
      (<any>ground).material.map.repeat.set( 16,16 );
      (<any>ground).material.map.wrapS = THREE.RepeatWrapping;
      (<any>ground).material.map.wrapT = THREE.RepeatWrapping;
      // note that because the ground does not cast a shadow, .castShadow is left false
      ground.receiveShadow = true;
      ground.name = 'ground'
      this.add( ground );

      //this.add( new RotatingCube(1*1000,0x00ff00) );

      var objLoader = new WonderObjLoader();


      objLoader.load({
        objUrl:'./resource/desk/desk.obj',
        mtlUrl:'./resource/desk/desk.mtl'
      },(obj)=>{
        this.add(obj);
      });

      // objLoader.load({
      //   objUrl:'./resource/cabinet/cabinet.obj',
      //   mtlUrl:'./resource/cabinet/cabinet.mtl'
      // },(obj)=>{
      //   this.add(obj);
      // });

  }
  //3D对象基类 
  add(object: THREE.Object3D): void{
    super.add(object);
  };

  dynamic:type.IDynamic[] = [];
  addDynamic(object:  type.IDynamic):void{
    this.dynamic.push(object);
    this.add(object);
  }




  update(delta:number){
    for(var i in this.dynamic){
      var obj = this.dynamic[i];
      obj.update();
    }
  }
}
