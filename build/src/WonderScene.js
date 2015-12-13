"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WonderScene = (function (_super) {
    __extends(WonderScene, _super);
    function WonderScene() {
        _super.call(this);
        this.add(new THREE.AmbientLight(0x222222));
        var light = new THREE.DirectionalLight(0xffffff, 2.25);
        light.position.set(200, 450, 500);
        light.castShadow = true;
        light.shadowMapWidth = 1024;
        light.shadowMapHeight = 1024;
        light.shadowMapDarkness = 0.95;
        light.shadowCameraVisible = true;
        light.shadowCameraNear = 100;
        light.shadowCameraFar = 1200;
        light.shadowCameraTop = 350;
        light.shadowCameraBottom = -350;
        light.shadowCameraRight = 1000;
        light.shadowCameraLeft = -1000;
        this.add(light);
        var gt = THREE.ImageUtils.loadTexture("./resource/textures/terrain/1.jpg");
        var gg = new THREE.PlaneBufferGeometry(16000, 16000);
        var gm = new THREE.MeshPhongMaterial({ color: 0xffffff, map: gt });
        var ground = new THREE.Mesh(gg, gm);
        ground.rotation.x = -Math.PI / 2;
        ground.material.map.repeat.set(16, 16);
        ground.material.map.wrapS = THREE.RepeatWrapping;
        ground.material.map.wrapT = THREE.RepeatWrapping;
        ground.receiveShadow = true;
        this.add(ground);
    }
    WonderScene.prototype.add = function (object) {
        _super.prototype.add.call(this, object);
    };
    ;
    WonderScene.prototype.update = function (delta) {
        for (var i in this.children) {
            var obj = this.children[i];
            if (typeof obj.update == 'function') {
                obj.update(delta);
            }
        }
    };
    return WonderScene;
})(THREE.Scene);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WonderScene;
//# sourceMappingURL=WonderScene.js.map