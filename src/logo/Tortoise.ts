export default class Tortoise extends THREE.Shape{

  private tPoint = new THREE.Vector2(0,0);
  private tTotalTrunAngle = 0;
  private tScale = 1;

  constructor(){
    super();
    this.moveTo(0,0)
  }

  forward(length:number){
    this.tPoint.x += length * this.tScale * Math.cos(this.tTotalTrunAngle);
    this.tPoint.y += length * this.tScale * Math.sin(this.tTotalTrunAngle);
    console.log(this.tPoint)
    this.lineTo(this.tPoint.x , this.tPoint.y);

  }

  turn(angle:number){
    this.tTotalTrunAngle += angle
  }

  resize(scale:number){
    this.tScale *= scale;
  }

  repeat(times:number,cmd:Function){
    for(var i=0;i<times;i++){
      cmd();
    }
  }
}
