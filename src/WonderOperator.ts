import WonderVR from './WonderVR';


export default class WonderOperator {
    cameraControls: THREE.OrbitControls;
    transformControls: THREE.TransformControls;

    onDownPosition: THREE.Vector2;
    onUpPosition: THREE.Vector2;
    mouse: THREE.Vector2;
    raycaster: THREE.Raycaster;

    selectionBox: THREE.BoxHelper;
    constructor(private wonder: WonderVR) {
        //this.cameraControls = new THREE.OrbitControls( this.camera, this.renderer.domElement );

        var controls = new THREE.EditorControls(wonder.camera, wonder.renderer.domElement);
        controls.addEventListener('change', function() {
            transformControls.update();
        });

        var selectionBox = new THREE.BoxHelper();
        selectionBox.material.depthTest = false;
        selectionBox.material.transparent = true;
        selectionBox.visible = false;
        this.selectionBox = selectionBox;

        var transformControls = new THREE.TransformControls(wonder.camera, wonder.renderer.domElement);
        this.transformControls = transformControls;
        wonder.scene.add(transformControls);

        transformControls.addEventListener('change', () => {

            var object = transformControls.object;

            if (object !== undefined) {

                selectionBox.update(object);
            }
            wonder.render();
        });
        transformControls.addEventListener('mouseDown', function() {

            var object = transformControls.object;


            controls.enabled = false;
        });
        transformControls.addEventListener('mouseUp', function() {
            controls.enabled = true;
        });


        this.onDownPosition = new THREE.Vector2();
        this.onUpPosition = new THREE.Vector2();

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        var scope = this;
        wonder.renderer.domElement.addEventListener('mousedown', onMouseDown, false);

        function onMouseDown(event) {
            event.preventDefault();
            var array = scope.getMousePosition(wonder.renderer.domElement, event.clientX, event.clientY);
            scope.onDownPosition.fromArray(array);
            document.addEventListener('mouseup', onMouseUp, false);
        };

        function onMouseUp(event) {
            var array = scope.getMousePosition(wonder.renderer.domElement, event.clientX, event.clientY);
            scope.onUpPosition.fromArray(array);
            scope.handleClick();
            document.removeEventListener('mouseup', onMouseUp, false);
        };




    }

    getMousePosition(dom, x, y) {

        var rect = dom.getBoundingClientRect();
        return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];

    };

    getIntersects(point, objects) {
        this.mouse.set((point.x * 2) - 1, - (point.y * 2) + 1);
        this.raycaster.setFromCamera(this.mouse, this.wonder.camera);
        return this.raycaster.intersectObjects(objects, true);
    };

    handleClick() {
        if (this.onDownPosition.distanceTo(this.onUpPosition) == 0) {
            var intersects = this.getIntersects(this.onUpPosition, this.wonder.scene.children);
            if (intersects.length > 0) {
                var object = intersects[0].object;
                if (object.userData.object !== undefined) {
                    // helper
                    this.select(object.userData.object);
                } else {
                    this.select(object);
                }
            } else {
                this.select(null);
            }
        }
    };


    select(object) {
        var bbHelper = new THREE.BoundingBoxHelper(object, 0xffffff);
        bbHelper.visible = false;

        this.transformControls.detach();

        this.wonder.scene.add(bbHelper);
        bbHelper.update();

        // box helper - doesn't have diagonals
        var boxHelper = new THREE.BoxHelper(bbHelper); // to remove the diagonals
        (<any>boxHelper).material.color.set(0xff9000);
        this.wonder.scene.add(boxHelper);

        this.transformControls.attach(object);
    }
}
