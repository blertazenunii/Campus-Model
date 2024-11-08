import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';

//Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 

// Grass
const groundGeometry = new THREE.PlaneGeometry(30, 20);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Roads
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
const roadGeometryHorizontal = new THREE.PlaneGeometry(30, 2);
const roadHorizontal = new THREE.Mesh(roadGeometryHorizontal, roadMaterial);
roadHorizontal.rotation.x = -Math.PI / 2;
roadHorizontal.position.y = 0.01;
scene.add(roadHorizontal);

const roadGeometryVertical = new THREE.PlaneGeometry(2, 20);
const roadVertical = new THREE.Mesh(roadGeometryVertical, roadMaterial);
roadVertical.rotation.x = -Math.PI / 2;
roadVertical.position.y = 0.01;
roadVertical.position.x = 8;
scene.add(roadVertical);

const roadGeometryVertical2 = new THREE.PlaneGeometry(2, 9);
const roadVertical2 = new THREE.Mesh(roadGeometryVertical2, roadMaterial);
roadVertical2.rotation.x = -Math.PI / 2;
roadVertical2.position.x = -3;
roadVertical2.position.y = 0.01;
roadVertical2.position.z = 5.5;
scene.add(roadVertical2);

// Buildings
const buildingMaterialWhite = new THREE.MeshBasicMaterial({ color: 0xffffff });
const buildingMaterialBlue = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const buildingMaterialOrange = new THREE.MeshBasicMaterial({ color: 0xfcba03 });
const buildingMaterialRed = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Building 1 (White) 304-305
const building1Geometry = new THREE.BoxGeometry(5, 2, 4);
const building1 = new THREE.Mesh(building1Geometry, buildingMaterialWhite);
building1.position.set(3, 1, -3.5);
scene.add(building1);

// Building 2 (White) 304-305
const building2Geometry = new THREE.BoxGeometry(5, 2, 4);
const building2 = new THREE.Mesh(building2Geometry, buildingMaterialWhite);
building2.position.set(12, 1, -3.5);
scene.add(building2);

// Building 3 (Blue) 814
const building3Geometry = new THREE.BoxGeometry(3, 1.3, 7);
const building3 = new THREE.Mesh(building3Geometry, buildingMaterialBlue);
building3.position.set(11.5, 0.5, 5);
scene.add(building3);

// Building 4 (Blue)
const building4Geometry = new THREE.BoxGeometry(7, 1.3, 3);
const building4 = new THREE.Mesh(building4Geometry, buildingMaterialBlue);
building4.position.set(3, 0.5, 8);
scene.add(building4);

// Building 5 (Orange) Byfe
const building5Geometry = new THREE.BoxGeometry(7, 1.3, 7);
const building5 = new THREE.Mesh(building5Geometry, buildingMaterialOrange);
building5.position.set(-8, 0.5, 6);
scene.add(building5);

// Building 6 (Red) Inspire
const building6Geometry = new THREE.BoxGeometry(8.5, 1.3, 7);
const building6 = new THREE.Mesh(building6Geometry, buildingMaterialRed);
building6.position.set(-9, 0.5, -6);
scene.add(building6);

// Animated Object - representing the moving person
const personGroup = new THREE.Group();

// Head
const headGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.y = 2;
personGroup.add(head);

// Body
const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 32);
const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = 1;
personGroup.add(body);

// Arms
const armGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 32);
const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
leftArm.position.set(-0.3, 1, 0);
leftArm.rotation.z = Math.PI / 4;
personGroup.add(leftArm);

const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
rightArm.position.set(0.3, 1, 0);
rightArm.rotation.z = -Math.PI / 4;
personGroup.add(rightArm);

// Legs
const legGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1, 32);
const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
leftLeg.position.set(-0.15, 0.2, 0);
leftLeg.rotation.x = Math.PI / 12;
personGroup.add(leftLeg);

const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
rightLeg.position.set(0.15, 0.2, 0);
rightLeg.rotation.x = -Math.PI / 12;
personGroup.add(rightLeg);


personGroup.position.set(-3, 0.5, 0);
scene.add(personGroup);

// GSAP Animation for the "person" walking
function animatePerson() {
  gsap.to(personGroup.position, {
    x: 14, 
    duration: 10, 
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
  });

  
  gsap.to(leftArm.rotation, {
    z: Math.PI / 2,
    duration: 1, 
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
  });
  gsap.to(rightArm.rotation, {
    z: -Math.PI / 2,
    duration: 1, 
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
  });
  gsap.to(leftLeg.rotation, {
    x: -Math.PI / 12,
    duration: 1, 
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
  });
  gsap.to(rightLeg.rotation, {
    x: Math.PI / 12,
    duration: 1, 
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
  });
}
animatePerson();

// Camera 
camera.position.set(20, 20, 20);
camera.lookAt(0, 0, 0);


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();


window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
