import WonderVR from'./WonderVR';
var wonder = new WonderVR();
document.body.appendChild(wonder.renderer.domElement );
wonder.run();



  wonder.scene.addObject({
    objUrl:'./resource/obj/wardrobe.obj',
    mtlUrl:'./resource/obj/wardrobe.mtl',
    position:{x:500,y:500,z:500},
    name:'obj1',
    id:'xxxx'
  });
