import Tortoise from './Tortoise';
export default class Star extends THREE.Line{
  constructor(sides:number){
    super();
    var tortoise = new Tortoise();
    tortoise.repeat(sides,function(){
      tortoise.forward(1);
      tortoise.turn(4*Math.PI/sides);
    });

    this.material = new THREE.MeshLambertMaterial( { color: 0xb00000, wireframe: false } );
    this.geometry = (<any>tortoise).createPointsGeometry();
  }
}
