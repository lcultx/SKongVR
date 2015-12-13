"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RotatingCube = (function (_super) {
    __extends(RotatingCube, _super);
    function RotatingCube(size, color) {
        var geometry = new THREE.BoxGeometry(size, size, size);
        var material = new THREE.MeshBasicMaterial({ color: color });
        _super.call(this, geometry, material);
    }
    RotatingCube.prototype.update = function (delta) {
        this.rotation.x += 0.1;
        this.rotation.y += 0.1;
    };
    ;
    return RotatingCube;
})(THREE.Mesh);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RotatingCube;
//# sourceMappingURL=RotatingCube.js.map