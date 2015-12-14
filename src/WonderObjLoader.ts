export default class WonderObjLoader{
  constructor(){

  }

  load(loadInfo:{
    objUrl:string,
    mtlUrl?:string,
    uvUrl?:string
  },callback:(obj:THREE.Object3D)=>void){
    var manager = new THREE.LoadingManager();

    manager.onProgress = function ( item, loaded, total ) {
      console.log( item, loaded, total );
    };

    var texture = new (<any>THREE).Texture();
    var onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete) + '% downloaded' );
      }
    };

    var onError = function ( xhr ) {
      console.log('load error: ',loadInfo);
    };
    var imageLoader = new THREE.ImageLoader( manager );
    imageLoader.load( loadInfo.uvUrl, function ( image ) {
      texture.image = image;
      texture.needsUpdate = true;
    });

    var objLoader = new (<any>THREE).OBJLoader( manager );
    objLoader.load( loadInfo.objUrl, function ( object ) {
      object.traverse( function ( child ) {
        if(child instanceof THREE.Mesh){
          child.material.map = texture;
        }
      });
      object.position.x = 0;
      object.position.y = 0;
      object.position.z = 0;
      object.name = 'WonderObjLoaderObject';
      callback(object);

    }, onProgress, onError );
  }
}
