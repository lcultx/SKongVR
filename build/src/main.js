var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50 * 1000);
scene.add(new THREE.AmbientLight(0x222222));
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
scene.add(light);
var gt = THREE.ImageUtils.loadTexture("./resource/textures/terrain/1.jpg");
var gg = new THREE.PlaneBufferGeometry(16000, 16000);
var gm = new THREE.MeshPhongMaterial({ color: 0xffffff, map: gt });
var ground = new THREE.Mesh(gg, gm);
ground.rotation.x = -Math.PI / 2;
ground.material.map.repeat.set(16, 16);
ground.material.map.wrapS = THREE.RepeatWrapping;
ground.material.map.wrapT = THREE.RepeatWrapping;
ground.receiveShadow = true;
scene.add(ground);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xffffff);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
var geometry = new THREE.BoxGeometry(1 * 1000, 1 * 1000, 1 * 1000);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.set(2860, 3490, 5464);
var cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
cameraControls.target.set(1, 1, 1);
var clock = new THREE.Clock();
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
    scene.add(object);
}, onProgress, onError);
var render = function () {
    var delta = clock.getDelta();
    cameraControls.update(delta);
    requestAnimationFrame(render);
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    console.log(camera.position);
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
};
render();
//# sourceMappingURL=main.js.map