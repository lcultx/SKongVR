export default class SKMouseEvent {

  distance: number;
  point: THREE.Vector3;
  face: THREE.Face3;
  object: THREE.Object3D;
    constructor(){

    }

    fromIntersection(intersect:THREE.Intersection):SKMouseEvent{
  		this.distance = intersect.distance;
  		this.point = intersect.point;
  		this.face = intersect.face;
  		this.object = intersect.object;
      return this;
    }
}
