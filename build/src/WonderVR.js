"use strict";
var WonderCamera_1 = require('./WonderCamera');
var WonderScene_1 = require('./WonderScene');
var WonderRenderer_1 = require('./WonderRenderer');
var RotatingCube_1 = require('./RotatingCube');
var Desk_1 = require('./Desk');
var WonderVR = (function () {
    function WonderVR() {
        var scene = new WonderScene_1.default();
        var camera = new WonderCamera_1.default();
        var renderer = new WonderRenderer_1.default();
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        scene.add(new RotatingCube_1.default(1 * 1000, 0x00ff00));
        new Desk_1.default().load(function (desk) {
            scene.add(desk);
        });
        this.cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    }
    WonderVR.prototype.run = function () {
        var _this = this;
        var clock = new THREE.Clock();
        var render = function () {
            var delta = clock.getDelta();
            _this.cameraControls.update(delta);
            requestAnimationFrame(render);
            _this.scene.update(delta);
            _this.camera.lookAt(_this.scene.position);
            _this.renderer.render(_this.scene, _this.camera);
        };
        render();
    };
    return WonderVR;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WonderVR;
//# sourceMappingURL=WonderVR.js.map