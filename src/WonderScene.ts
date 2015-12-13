export default class WonderScene extends THREE.Scene{
  constructor(){
    super();
    	this.add( new THREE.AmbientLight( 0x222222 ) );

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

      var gt = THREE.ImageUtils.loadTexture( "./resource/textures/terrain/1.jpg" );
      var gg = new THREE.PlaneBufferGeometry( 16000, 16000 );
      var gm = new THREE.MeshPhongMaterial( { color: 0xffffff, map: gt } );
      var ground = new THREE.Mesh( gg, gm );
      ground.rotation.x = - Math.PI / 2;
      (<any>ground).material.map.repeat.set( 16,16 );
      (<any>ground).material.map.wrapS = THREE.RepeatWrapping;
      (<any>ground).material.map.wrapT = THREE.RepeatWrapping;
      // note that because the ground does not cast a shadow, .castShadow is left false
      ground.receiveShadow = true;
      this.add( ground );



  }

  add(object: THREE.Object3D): void{
    super.add(object);
  };



  update(delta:number){
    for(var i in this.children){
      var obj:any = this.children[i];
      if(typeof obj.update == 'function'){
        obj.update(delta);
      }
    }
  }
}
