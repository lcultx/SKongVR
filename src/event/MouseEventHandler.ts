import SKongVR from '../SKongVR';

import SKMouseEvent from './SKMouseEvent';

export default class MouseEventHandler{

  onDownPosition: THREE.Vector2;
  onUpPosition: THREE.Vector2;
  onMovePosition:THREE.Vector2;
  onContextMenuPosition:THREE.Vector2;
  mouse: THREE.Vector2;
  raycaster: THREE.Raycaster;

  private clickables:Array<THREE.Object3D> = [];
  private domElement:HTMLElement;
  constructor(private sk:SKongVR){

    this.onDownPosition = new THREE.Vector2();
    this.onUpPosition = new THREE.Vector2();
    this.onMovePosition = new THREE.Vector2();
    this.onContextMenuPosition = new THREE.Vector2();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.domElement = sk.renderer.domElement;
    this.domElement.addEventListener('mousedown', this.onMouseDown, false);
    this.domElement.addEventListener('mousemove',this.onMouseMove,false);

    this.raycaster = new THREE.Raycaster();
  }

  addClickable(obj:THREE.Object3D){
    this.clickables.push(obj);
  }

  onMouseDown = (event)=>{
    event.preventDefault();

    if(event.button == 2){
      var array = this.getMousePosition(this.domElement, event.clientX, event.clientY);
      this.onContextMenuPosition.fromArray(array);
      var intersects = this.getIntersects(this.onContextMenuPosition, this.clickables);
      if (intersects.length > 0) {
          var intersect:THREE.Intersection = intersects[0];
          var object:THREE.Object3D = intersects[0].object;

          object.dispatchEvent({
            type:'contextmenu',
            data:new SKMouseEvent().fromIntersection(intersect)
          })

      }
    }else{
      var array = this.getMousePosition(this.domElement, event.clientX, event.clientY);
      this.onDownPosition.fromArray(array);
      var intersects = this.getIntersects(this.onDownPosition, this.clickables);
      if (intersects.length > 0) {
          var intersect:THREE.Intersection = intersects[0];
          var object:THREE.Object3D = intersects[0].object;

          object.dispatchEvent({
            type:'mousedown',
            data:new SKMouseEvent().fromIntersection(intersect)
          })

      }
      document.addEventListener('mouseup', this.onMouseUp, false);
    }



  }

  onMouseMove = (event)=>{
    event.preventDefault();
    var array = this.getMousePosition(this.domElement, event.clientX, event.clientY);
    this.onMovePosition.fromArray(array);
    var intersects = this.getIntersects(this.onMovePosition, this.clickables);
    if (intersects.length > 0) {
        var intersect:THREE.Intersection = intersects[0];
        var object:THREE.Object3D = intersects[0].object;

        object.dispatchEvent({
          type:'mousemove',
          data:new SKMouseEvent().fromIntersection(intersect)
        })

    }
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

  getIntersects(point:THREE.Vector2, objects:THREE.Object3D[]):THREE.Intersection[] {
      this.mouse.set((point.x * 2) - 1, - (point.y * 2) + 1);
      this.raycaster.setFromCamera(this.mouse, this.sk.camera);
      return this.raycaster.intersectObjects(objects, true);
  };


}
