import * as Type from './type';
export default class RotatingCube extends THREE.Mesh implements Type.IDynamic{

  constructor(size,color){
    var geometry = new THREE.BoxGeometry( size, size, size );
    var material = new THREE.MeshBasicMaterial( { color: color } );
    super( geometry, material );
  }
  update(delta?:number){
    this.rotation.x += 0.1;
    this.rotation.y += 0.1;
  };
}
