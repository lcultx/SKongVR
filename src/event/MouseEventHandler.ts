import SKongVR from '../SKongVR';

import SKMouseEvent from './SKMouseEvent';

export default class MouseEventHandler{

  onDownPosition: THREE.Vector2;
  onUpPosition: THREE.Vector2;
  mouse: THREE.Vector2;
  raycaster: THREE.Raycaster;

  private clickables:Array<THREE.Mesh> = [];
  private domElement:HTMLElement;
  constructor(private sk:SKongVR){

    this.onDownPosition = new THREE.Vector2();
    this.onUpPosition = new THREE.Vector2();

    this.domElement = sk.renderer.domElement;
    this.domElement.addEventListener('mousedown', this.onMouseDown, false);
    this.raycaster = new THREE.Raycaster();
  }

  addClickable(obj:THREE.Mesh){
    this.clickables.push(obj);
  }

  onMouseDown = (event)=>{
    event.preventDefault();
    var array = this.getMousePosition(this.domElement, event.clientX, event.clientY);
    this.onDownPosition.fromArray(array);
    document.addEventListener('mouseup', this.onMouseUp, false);
  }

  onMouseUp = (event)=>{
    var array = this.getMousePosition(this.domElement, event.clientX, event.clientY);
    this.onUpPosition.fromArray(array);
    var intersects = this.getIntersects(this.onUpPosition, this.clickables);
    if (intersects.length > 0) {
        var intersect:THREE.Intersection = intersects[0];
        var object:THREE.Object3D = intersects[0].object;
        object.dispatchEvent({
          type:'mouseup',
          data:new SKMouseEvent().fromIntersection(intersect)
        })
    }
    document.removeEventListener('mouseup', this.onMouseUp, false);
  }



  getMousePosition(dom, x, y) {
      var rect = dom.getBoundingClientRect();
      return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
  };

  getIntersects(point, objects:THREE.Mesh[]):THREE.Intersection[] {
      this.mouse.set((point.x * 2) - 1, - (point.y * 2) + 1);
      this.raycaster.setFromCamera(this.mouse, this.sk.camera);
      return this.raycaster.intersectObjects(objects, true);
  };


}
