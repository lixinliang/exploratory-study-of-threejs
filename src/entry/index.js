import './sass/index.scss';

if (process.env.NODE_ENV !== 'production') {
    require('../_index.html');
}

import THREE from './modules/three';

if (process.env.NODE_ENV !== 'production') {
    window.THREE = THREE;
    console.warn(`THREE: ${ THREE.REVISION }`);
}

let renderer = new THREE.WebGLRenderer({ antialias : true });

renderer.setPixelRatio(window.devicePixelRatio);

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(60, 1, 0.1, 9000);
if (process.env.NODE_ENV !== 'production') {
    window.camera = camera;
}

scene.add(camera);

function resize () {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize, false);
resize();

let mesh = new THREE.Mesh(new THREE.BoxBufferGeometry( 200, 200, 200 ), new THREE.MeshBasicMaterial( { color : 0xff0000 } ));
scene.add(mesh);
if (process.env.NODE_ENV !== 'production') {
    window.mesh = mesh;
}

document.body.appendChild(renderer.domElement);

let requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || (( fn ) => setTimeout(fn, 1000 / 60));

function animate () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
requestAnimationFrame(animate);
