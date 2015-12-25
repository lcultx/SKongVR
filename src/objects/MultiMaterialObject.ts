export default class MultiMaterialObject extends THREE.Group{
  constructor(geometry:THREE.Geometry, materials:Array<THREE.Material>){
    super();
    if(materials){
      for ( var i = 0, l = materials.length; i < l; i ++ ) {
        this.add( new THREE.Mesh( geometry, materials[ i ] ) );
      }

    }else{
        this.add( new THREE.Mesh( geometry ) );
    }

  }
}
