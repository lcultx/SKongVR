import RotatingCube from './RotatingCube';
import CustomShaderRotatingCube from './CustomShaderRotatingCube';
import SofaShaderSphere from './SofaShaderSphere';
import VaseShaderSphere from './VaseShaderSphere';
import MultiMaterialObject from './MultiMaterialObject';
import Sofa from './Sofa';
import * as type from './type';
import WonderObjLoader from './WonderObjLoader';



var vertexShader = `
      varying vec2 vUv;

      void main()
      {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
      }
`;

var fragmentShader= `

      uniform float time;
			uniform vec2 resolution;

			uniform sampler2D map;

			varying vec2 vUv;

			void main( void ) {
        vec4 texel = texture2D( map, vUv );
        gl_FragColor = texel;
			}
`



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

      // var sofaShaderSphere = new SofaShaderSphere(1000);
      // sofaShaderSphere.position.setY(1500);
      // this.addDynamic(sofaShaderSphere);
      // var vaseShaderSphere = new VaseShaderSphere(1000);
      // vaseShaderSphere.position.setX(-3000);
      // vaseShaderSphere.position.setY(1500);
      // this.addDynamic(vaseShaderSphere);
      // this.addDynamic( new RotatingCube(1*1000,0x00ff00) );

      // var sofa = new Sofa();
      // this.add(sofa);

      var uniforms = {
          time: { type: "f", value: 1.0 },
          resolution: { type: "v2", value: new THREE.Vector2() },
          map: { type: "t", value: THREE.ImageUtils.loadTexture( "resource/textures/T_Couch_Mask.jpg" ) }
      };
      //uniforms.texture.value.wrapS = uniforms.texture.value.wrapT = THREE.RepeatWrapping;




      // var objLoader = new (<any>THREE).OBJLoader();
      // this.name = 'WonderObjLoaderObject';
      // objLoader.load('resource/sofa/sofa.obj', ( object )=> {
      //   var geometry = object.children[0].geometry;
      //   console.log(geometry)
      //
      //   var sofa = new THREE.Mesh(geometry,new THREE.MeshPhongMaterial({
      //     //color: 0xffffff,
      //     map:THREE.ImageUtils.loadTexture( "resource/textures/T_Couch_Mask.jpg" ),
      //   //  normalMap:THREE.ImageUtils.loadTexture( "resource/textures/T_Couch_N.jpg" )
      //   }));
      //   sofa.position.set(0,0,0);
      //   this.add(sofa);
      //
      //   var sofa2 = new THREE.Mesh(geometry,new THREE.ShaderMaterial( {
      //   	uniforms: uniforms,
      //   	vertexShader: vertexShader,
      //   	fragmentShader: fragmentShader
      //   } ))
      //   sofa2.position.set(2000,0,0);
      //   this.add(sofa2);
      // });


     var objLoader = new WonderObjLoader();
       objLoader.load({
         objUrl:'./resource/obj/wardrobe.obj',
         mtlUrl:'./resource/obj/wardrobe.mtl'
       },(obj)=>{
         this.add(obj);
       });
     //
    //   objLoader.load({
    //     objUrl:'./resource/obj/vase.obj',
    //     mtlUrl:'./resource/obj/vase.mtl'
    //   },(obj)=>{
    //     this.add(obj);
    //   });

      //this.addDynamic(new CustomShaderRotatingCube(1*1000,0x00ff00));

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
      // var jsonLoader = new THREE.JSONLoader();
      // jsonLoader.load('resource/obj/test.json',(geometry: THREE.Geometry, materials: THREE.Material[])=>{
      //   console.log(geometry,materials);
      //
      //   var obj = new MultiMaterialObject(geometry,materials);
      //   obj.position.set(0,0,0);
      //   this.add(obj);
      // })
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

  update(delta:number,clock:THREE.Clock){
    for(var i in this.dynamic){
      var obj = this.dynamic[i];
      obj.update(delta,clock);
    }
  }
}
