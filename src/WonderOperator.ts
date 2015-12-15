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
        this.cameraControls = new THREE.OrbitControls( wonder.camera, wonder.renderer.domElement );

        // var controls = new THREE.EditorControls(wonder.camera, wonder.renderer.domElement);
        // controls.addEventListener('change', function() {
        //     transformControls.update();
        // });

        var selectionBox = new THREE.BoxHelper();
        selectionBox.material.depthTest = false;
        selectionBox.material.transparent = true;
        selectionBox.visible = false;
        wonder.scene.add(selectionBox);
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


            //controls.enabled = false;
        });
        transformControls.addEventListener('mouseUp', function() {
            //controls.enabled = true;
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


        var control:any = transformControls;
        window.addEventListener( 'keydown', function ( event ) {

          switch ( event.keyCode ) {

            case 81: // Q
              control.setSpace( control.space === "local" ? "world" : "local" );
              break;

            case 17: // Ctrl
              control.setTranslationSnap( 100 );
              control.setRotationSnap( THREE.Math.degToRad( 15 ) );
              break;

            case 87: // W
              control.setMode( "translate" );
              break;

            case 69: // E
              control.setMode( "rotate" );
              break;

            case 82: // R
              control.setMode( "scale" );
              break;

            case 187:
            case 107: // +, =, num+
              control.setSize( control.size + 0.1 );
              break;

            case 189:
            case 109: // -, _, num-
              control.setSize( Math.max( control.size - 0.1, 0.1 ) );
              break;

          }

        });

        window.addEventListener( 'keyup', function ( event ) {

          switch ( event.keyCode ) {

            case 17: // Ctrl
              control.setTranslationSnap( null );
              control.setRotationSnap( null );
              break;

          }

        });


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
                var loadObject = this.findLoadParent(object);
                if(loadObject){
                  this.select(loadObject);
                }else{
                  // if (object.userData.object !== undefined) {
                  //     // helper
                  //     this.select(object.userData.object);
                  // } else {
                  //     this.select(object);
                  // }
                }

            } else {
                this.select(null);
            }
        }
    };

    findLoadParent(object){
      var loadParent:THREE.Group;
      var maxDeep = 10;//设置最大查找参数，防止模型错误指向造成死循环
      var deep = 0;
      while(object.parent){
        deep++;
        if(object.parent.name == "WonderObjLoaderObject"){
          loadParent = object.parent;
          break;
        }

        if(deep >= maxDeep){
          break;
        }
        object = object.parent;
      }

      return loadParent;
    }

    select(object) {

        console.log(object);

        var bbHelper = new THREE.BoundingBoxHelper(object, 0xffffff);
        bbHelper.visible = false;

        this.transformControls.detach();

        this.wonder.scene.add(bbHelper);THREE.Group
        bbHelper.update();

        // box helper - doesn't have diagonals
        //var boxHelper = new THREE.BoxHelper(bbHelper); // to remove the diagonals
        this.selectionBox.update(bbHelper);
        this.selectionBox.visible = true;
        (<any>this.selectionBox).material.color.set(0xff9000);
        //this.wonder.scene.add(boxHelper);

        this.transformControls.attach(object);
    }

    update(delta:number){
        this.cameraControls.update( delta );
    }
}
