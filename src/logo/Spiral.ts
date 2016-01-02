import Tortoise from './Tortoise';
export default class Spiral extends THREE.Line{
  constructor(n,a,s){
    super();
    var tortoise = new Tortoise();
    tortoise.repeat(n,function(){
      tortoise.forward(1);
      tortoise.turn(a);
      tortoise.resize(s);
    })

    this.material = new THREE.MeshLambertMaterial( { color: 0xb00000, wireframe: false } );
    this.geometry = (<any>tortoise).createPointsGeometry();
  }
}
