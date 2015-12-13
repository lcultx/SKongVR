"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WonderCamera = (function (_super) {
    __extends(WonderCamera, _super);
    function WonderCamera() {
        _super.call(this, 45, window.innerWidth / window.innerHeight, 1, 50 * 1000);
        this.position.set(2860, 3490, 5464);
    }
    return WonderCamera;
})(THREE.PerspectiveCamera);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WonderCamera;
//# sourceMappingURL=WonderCamera.js.map