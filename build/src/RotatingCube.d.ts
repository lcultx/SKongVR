import * as Type from './Type';
export default class RotatingCube extends THREE.Mesh implements Type.IDynamic {
    constructor(size: any, color: any);
    update(delta?: number): void;
}
