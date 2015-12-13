import WonderScene from './WonderScene';
import * as Type from './Type';
export default class Desk extends THREE.Object3D implements Type.AsyncLoadable{
  constructor(){
    super();
  }



  load(callback){
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
      };
    var loader1 = new THREE.ImageLoader( manager );
    loader1.load( 'resource/textures/UV_Grid_Sm.jpg', function ( image ) {

    texture.image = image;
    texture.needsUpdate = true;

    } );

    var loader2 = new (<any>THREE).OBJLoader( manager );
    loader2.load( './resource/desk/redsymbzone_mebler.obj', function ( object ) {

    object.traverse( function ( child ) {

      if ( child instanceof THREE.Mesh ) {

        child.material.map = texture;

      }

    } );
    object.position.x = 0;
    object.position.y = 0;
    object.position.z = 0;
    object.name = 'Desk';
    callback(object);

    }, onProgress, onError );
  }


}
