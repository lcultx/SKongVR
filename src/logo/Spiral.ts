import Tortoise from './Tortoise';
export default class Spiral extends THREE.Object3D{
  constructor(n,a,s){
    super();
    var tortoise = new Tortoise();
    tortoise.repeat(n,function(){
      tortoise.forward(1);
      tortoise.turn(a);
      tortoise.resize(s);
    })
  }
}
