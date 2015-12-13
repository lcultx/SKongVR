export default class WonderCamera extends THREE.PerspectiveCamera{
  constructor(){
    super(45, window.innerWidth/window.innerHeight, 1, 50*1000 );
    this.position.set(2860,3490,5464);
  }
}
