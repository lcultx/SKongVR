import WonderCamera from './WonderCamera';
import WonderScene from './WonderScene';
import WonderRenderer from './WonderRenderer';
export default class WonderVR {
    camera: WonderCamera;
    scene: WonderScene;
    renderer: WonderRenderer;
    cameraControls: any;
    constructor();
    run(): void;
}
