"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WonderRenderer = (function (_super) {
    __extends(WonderRenderer, _super);
    function WonderRenderer() {
        _super.call(this, ({ antialias: true }));
        this.setClearColor(0xffffff);
        this.setPixelRatio(window.devicePixelRatio);
        this.setSize(window.innerWidth, window.innerHeight);
        this.gammaInput = true;
        this.gammaOutput = true;
        this.shadowMap.enabled = true;
    }
    return WonderRenderer;
})(THREE.WebGLRenderer);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WonderRenderer;
//# sourceMappingURL=WonderRenderer.js.map