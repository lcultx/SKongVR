export default class Tortoise{
  forward(length:number){

  }

  turn(angle:number){

  }

  resize(scale:number){

  }

  repeat(times:number,cmd:Function){
    for(var i=0;i<times;i++){
      cmd();
    }
  }
}
