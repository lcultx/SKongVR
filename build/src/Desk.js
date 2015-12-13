"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Desk = (function (_super) {
    __extends(Desk, _super);
    function Desk() {
        _super.call(this);
    }
    Desk.prototype.load = function (callback) {
        var manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };
        var texture = new THREE.Texture();
        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete) + '% downloaded');
            }
        };
        var onError = function (xhr) {
        };
        var loader1 = new THREE.ImageLoader(manager);
        loader1.load('resource/textures/UV_Grid_Sm.jpg', function (image) {
            texture.image = image;
            texture.needsUpdate = true;
        });
        var loader2 = new THREE.OBJLoader(manager);
        loader2.load('./resource/desk/redsymbzone_mebler.obj', function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                }
            });
            object.position.x = 0;
            object.position.y = 0;
            object.position.z = 0;
            callback(object);
        }, onProgress, onError);
    };
    return Desk;
})(THREE.Object3D);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Desk;
//# sourceMappingURL=Desk.js.map