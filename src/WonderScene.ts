import RotatingCube from './RotatingCube';
import CustomShaderRotatingCube from './CustomShaderRotatingCube';
import SofaShaderSphere from './SofaShaderSphere';
import VaseShaderSphere from './VaseShaderSphere';
import MultiMaterialObject from './MultiMaterialObject';
import Sofa from './Sofa';
import * as type from './type';
import WonderObjLoader from './WonderObjLoader';


declare var OIMO;

export default class WonderScene extends THREE.Scene{


  private oimoWorld;

  private bodys = [];
  private meshs = [];
  constructor(){
    super();



    var timestep = 1/60;

// Algorithm used for collision
// 1: BruteForceBroadPhase  2: sweep and prune  3: dynamic bounding volume tree
// default is 2 : best speed and lower cpu use.
var boardphase = 2;

// The number of iterations for constraint solvers : default 8.
var Iterations = 8;

// calculate statistique or not
var noStat = false;

// create oimo world contains all rigidBodys and joint.
var world = new OIMO.World( timestep, boardphase, Iterations, noStat );

// you can choose world gravity
world.gravity = new OIMO.Vec3(0, -9.8, 0);

// Oimo Physics use international system units 0.1 to 10 meters max for dynamique body.
// for three.js i use by default *100  so object is between 10 to 10000 three unit.
// big object give better precision try change value 10 , 1 ...
world.worldscale(1000);


     this.oimoWorld = world;
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
      var ground2 = new OIMO.Body({
          size: [16000, 1, 16000],
          pos: [0, -1000, 0],
          world: world
      });
      //材质对象material()
      (<any>ground).material.map.repeat.set( 16,16 );
      (<any>ground).material.map.wrapS = THREE.RepeatWrapping;
      (<any>ground).material.map.wrapT = THREE.RepeatWrapping;
      // note that because the ground does not cast a shadow, .castShadow is left false
      ground.receiveShadow = true;
      ground.name = 'ground'
      this.add( ground );

        this.drawLine(0,0,10000,10000);
        this.drawCurve({x:0,y:0},{x:-500,y:-500},{x:-1000,y:1000})
    //  var objLoader = new WonderObjLoader();
    //    objLoader.load({
    //      objUrl:'./resource/obj/wardrobe.obj',
    //      mtlUrl:'./resource/obj/wardrobe.mtl'
    //    },(obj)=>{
    //      obj.position.set(500,500,500);
    //      this.add(obj);
    //      var box = new THREE.Box3().setFromObject(obj);
    //      var sizeVector = box.size();
    //      this.bodys.push(new OIMO.Body({
    //         type: 'box',
    //         size: [sizeVector.x,sizeVector.y,sizeVector.z],
    //         pos: [0,500,0],
    //         move: true,
    //         world: world
    //     }));
    //     this.meshs.push(obj);
    //    });


      // objLoader.load({
      //   objUrl:'./resource/obj/vase.obj',
      //   mtlUrl:'./resource/obj/vase.mtl'
      // },(obj)=>{
      //   this.add(obj);
      // });

      //this.addDynamic(new CustomShaderRotatingCube(1*1000,0x00ff00));

      // objLoader.load({
      //   objUrl:'./resource/desk/desk.obj',
      //   mtlUrl:'./resource/desk/desk.mtl'
      // },(obj)=>{
      //   this.add(obj);
      // });

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

  drawLine(x1,y1,x2,y2){
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(x1, 0, y1));
    geometry.vertices.push(new THREE.Vector3(x2, 0, y2));
    var material = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 500 } );
    var line = new THREE.Line(geometry, material);
    console.log(line);
    this.add(line);
  }

 addObject(obj:{
   objUrl:string,
   mtlUrl:string,
   position:{x:number,y:number,z:number},
   name:string,
   id:string
 }){
   var objLoader = new WonderObjLoader();
     objLoader.load({
       objUrl:obj.objUrl,
       mtlUrl:obj.mtlUrl,
     },(obj)=>{
       obj.position.set(obj.position.x,obj.position.y,obj.position.z);
       this.add(obj);
      //  var box = new THREE.Box3().setFromObject(obj);
      //  var sizeVector = box.size();
      //  this.bodys.push(new OIMO.Body({
      //     type: 'box',
      //     size: [sizeVector.x,sizeVector.y,sizeVector.z],
      //     pos: [0,500,0],
      //     move: true,
      //     world: world
      // }));
      //this.meshs.push(obj);
     });

 }
  drawCurve(p1,p2,p3){
    var SUBDIVISIONS = 20;
    var geometry = new THREE.Geometry();
    var curve = new (<any>THREE).QuadraticBezierCurve3();
    curve.v0 = new THREE.Vector3(p1.x, 0, p1.y);
    curve.v1 = new THREE.Vector3(p2.x, 0, p2.y);
    curve.v2 = new THREE.Vector3(p3.x, 0, p3.y);
    for (var j = 0; j < SUBDIVISIONS; j++) {
      geometry.vertices.push( curve.getPoint(j / SUBDIVISIONS) )
    }
    var material = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 20 } );
    material.linewidth = 200;
    var line = new THREE.Line(geometry, material);
    this.add(line);
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
      this.oimoWorld.step();
     var mtx = new THREE.Matrix4();

     var i = this.bodys.length;
     while (i--) {
       var body = this.bodys[i].body;
       var mesh = this.meshs[i];

        if (!body.sleeping) {
            var m = body.getMatrix();
            mtx.fromArray(m);
            mesh.position.setFromMatrixPosition(mtx);
            mesh.rotation.setFromRotationMatrix(mtx);

        }
     }



    for(var j in this.dynamic){
      var obj = this.dynamic[j];
      obj.update(delta,clock);
    }
  }
}
