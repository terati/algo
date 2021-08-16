
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
// renderer.setSize(window.innerWidth,500);

var tmp = document.getElementById('globeDiv');
console.log(tmp);
tmp.appendChild(renderer.domElement);

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
const RADIUS = 0.5;
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
var light1 = new THREE.SpotLight(0xFFFFFF, 10, 100)
light1.castShadow = true;
light1.shadow.mapSize.width = 2024;
light1.shadow.mapSize.height = 2024;
light1.shadow.camera.near = 100;
light1.shadow.camera.far = 120;
light1.position.set(-2,0,0);
scene.add(light1);

planet_mesh.x += 1000;



// $( document ).ready(function() {


//     clock = new THREE.Clock;
//     var t = 0;
//     var divd = 3;
//     while (t < divd){
//         // console.log(t);
//         t = clock.getElapsedTime();
//         // planet_mesh.scale.set(t/3.0,t/3.0,t/3.0);
        
//         planet_mesh.scale.set(t/divd, t/divd, t/divd);
//         atmosphere_mesh.scale.set(t/divd, t/divd, t/divd);
//         // planet_mesh.scale.set(10,10,10);
//         // atmosphere_mesh.scale.set(10,10,10);
//     }
//     render();
// });

clock = new THREE.Clock;
var t = 0;
var flag = 0;
var TL = new TimelineMax({paused: true});
TL.to(atmosphere_mesh.scale, 8.0, {x: 2, y: 2, z: 2, ease: Expo.easeOut});
TL.to(planet_mesh.scale, 8.0, {x: 2.035, y: 2.035, z: 2.035, ease: Expo.easeOut}, 0);

var TL1 = new TimelineMax({paused: true});
TL1 = TL1.to(atmosphere_mesh.position, 2, {x: -1, z: -0.5, ease: Expo.easeOut});
TL1 = TL1.to(planet_mesh.position, 2, {x: -1, z: -0.5, ease: Expo.easeOut}, 0);
TL1 = TL1.to(light.position, 2, {x: -3, ease: Expo.easeOut}, 0);
TL1 = TL1.to(light1.position, 2, {x: -3, ease: Expo.easeOut}, 0);
var counter = 0
var render = function() {
    
    requestAnimationFrame(render);
    //triggers the zooming in at the beginning.
    if(flag == 0){
        TL.play();
        // TL1.play();
        flag = 1;
    }
    // atmosphere_mesh.scale.set(0.5, 0.5, 0.5);
    // planet_mesh.scale.set(0.5, 0.5, 0.5);
    // var divd = 5;
    
    // while (t < divd){
    //     t = clock.getElapsedTime();
    //     if (counter >= 1000_0000_000){
    //         planet_mesh.scale.set(t/divd, t/divd, t/divd);
    //         atmosphere_mesh.scale.set(t/divd, t/divd, t/divd);
    //         counter = 0;
    //     } else {
    //         counter++;
    //     }
        
    // }
        
        // planet_mesh.scale.set(10,10,10);
        // atmosphere_mesh.scale.set(10,10,10);
    // }
    planet_mesh.rotation.y += 0.001; // planet rotation
    atmosphere_mesh.rotation.y += 0.003; // cloud rotation
    renderer.render(scene, camera);
}
// var tmp = document.getElementById('globeDiv');
// tmp.style.left = '-200px';
render();
// this.tl = new TimelineMax({paused: true});
// this.tl.to(this.atmosphere_mesh.scale, .0, {x: 0.5, y: 0.5, z: 0.5, ease: Expo.easeOut})
// this.tl.to(this.circle_mesh.scale, .0, {x: 0.25, y: 0.25, z: 0.25, ease: Expo.easeOut})
// this.tl.to(this.mesh.scale, .5, {x: .5, ease: Expo.easeOut})

// window.onload = (e) => {

    // this.tl.to(this.planet_mesh.scale, .0, {x: 0.5, y: 0.5, z: 0.5, ease: Expo.easeOut})
    // this.t1.play;
// } 

// document.body.addEventListener('load', () => {
//     TL.play();
// })


// var raycaster = new THREE.Raycaster();
// var mouse = new THREE.Vector2();

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


$(window).resize(function() {
    var offset = $(window).width();
    rect.style.marginLeft = 1*offset/3+"px";
    console.log('offset: '+offset )
});

var rect = document.getElementById('rect');
console.log('rect: '+rect)









