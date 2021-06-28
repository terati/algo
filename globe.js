var scene = new THREE.Scene();
// scene.background = 
var camera = new THREE.PerspectiveCamera(
    75, //aspect ratio
    window.innerWidth/window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2;

var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.shadowMap.enabled = true;
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})
//testing

//Circle
// var geometry = new THREE.CircleGeometry(1.6,202);
// var material = new THREE.MeshLambertMaterial( { 
//     emissive: 0x0000ff,
//     skinning: true,
//  } )
// var circle_mesh = new THREE.Mesh( geometry, material );
// circle_mesh.position.set(-0.13,0,-1);
// scene.add( circle_mesh );


// properties
const RADIUS = 1.;
const SEGMENTS = 52;
const RINGS = 52;
// planet Atmosphere
var geometry = new THREE.SphereGeometry( RADIUS, SEGMENTS, RINGS );
const texture = new THREE.TextureLoader().load('images/globe_im.jpg');
const white_base = new THREE.TextureLoader().load('images/white_back.jpg');
const normalmap = new THREE.TextureLoader().load('images/globe_depth.jpg');
const specularmap = new THREE.TextureLoader().load('images/specmap.jpg');
const cloudmap = new THREE.TextureLoader().load('images/cloudmap2.jpg');

var material = new THREE.MeshPhongMaterial({
    map: white_base, 
    alphaMap: cloudmap,
    transparent: true,
    shininess: 10,
});
var atmosphere_mesh = new THREE.Mesh(geometry, material);
atmosphere_mesh.receiveShadow = true;
scene.add(atmosphere_mesh);


// Planet Earth
var geometry = new THREE.SphereGeometry( RADIUS-0.01, SEGMENTS, RINGS );
var material = new THREE.MeshPhongMaterial({
    map: texture, 
    normalMap: normalmap, 
    specularMap: specularmap,
    bumpScale: .5,
    shininess: 10,
});
var planet_mesh = new THREE.Mesh(geometry, material);
planet_mesh.receiveShadow = true;
scene.add(planet_mesh);



// Lighting 
var light = new THREE.PointLight(0xFFFFFF, 3, 100)
light.castShadow = true;
light.shadow.mapSize.width = 2024;
light.shadow.mapSize.height = 2024;
light.shadow.camera.near = 100;
light.shadow.camera.far = 120;
light.position.set(-20,10,20);
scene.add(light);

// test light
var light = new THREE.SpotLight(0xFFFFFF, 10, 100)
light.castShadow = true;
light.shadow.mapSize.width = 2024;
light.shadow.mapSize.height = 2024;
light.shadow.camera.near = 100;
light.shadow.camera.far = 120;
light.position.set(-2,0,0);
scene.add(light);

var render = function() {
    requestAnimationFrame(render);
    planet_mesh.rotation.y += 0.001; // planet rotation
    atmosphere_mesh.rotation.y += 0.003; // cloud rotation
    renderer.render(scene, camera);
}



// this.tl = new TimelineMax({paused: true});
// this.tl.to(this.planet_mesh.scale, .0, {x: 0.5, y: 0.5, z: 0.5, ease: Expo.easeOut})
// this.tl.to(this.atmosphere_mesh.scale, .0, {x: 0.5, y: 0.5, z: 0.5, ease: Expo.easeOut})
// this.tl.to(this.circle_mesh.scale, .0, {x: 0.25, y: 0.25, z: 0.25, ease: Expo.easeOut})
// this.tl.to(this.mesh.scale, .5, {x: .5, ease: Expo.easeOut})

// document.body.addEventListener('click', () => {
//     this.tl.play();
// })


var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// function _onMouseClick(event) {
//     event.preventDefault();
//     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//     raycaster.setFromCamera(mouse, camera);
//     var intersects = raycaster.intersectObjects(scene.children, true);
//     var flag = 0;
//     var counter = 0;
//     if (counter > 0 & counter < 10000){
//         counter++;
//     } else {
//         counter = 0;
//     }
//     if (intersects.length > 0 & flag == 0 & counter == 0) {
//         for ( var i = 0; i < intersects.length; i++ ) {
//             flag = 1;
//             this.t1 = new TimelineMax();
//             this.t1.to(intersects[i].object.scale, 0, {x: 0.9, y: 0.9, z: 0.9, ease: Expo.easeOut})
//             this.t1.to(intersects[i].object.scale, 1, {x: 1, y: 1, z: 1, ease: Expo.easeOut})
//             this.t1.to(intersects[i].object.scale, 1, {x: 0.9, y: 0.9, z: 0.9, ease: Expo.easeOut})
//             flag = 0; 
//         }
//         counter++;
//     }

// }
// window.addEventListener('click', _onMouseClick);
// window.addEventListener('mousemove', onMouseMove);

render();




