import Tortoise from './Tortoise';
export default class Star extends THREE.Object3D{
  constructor(sides:number){
    super();
    var tortoise = new Tortoise();
    tortoise.repeat(sides,function(){
      tortoise.forward(1);
      tortoise.turn(4*Math.PI/sides);
    });
  }
}
