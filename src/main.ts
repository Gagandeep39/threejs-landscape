import './style.css';

import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer to render 3d UI
const renderer = new THREE.WebGLRenderer();
// Size of canvas
// window.innerWidth === innerWidth
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Create a plane

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Object material
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 5;
renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
}

animate();

/**
 * 1. Create a scene
 * 2. Create an object
 * 3. Create object material
 * 4. Create a mesh -> bject of a specific material
 * 5. Add mesh to scene
 * 6. Position camera
 * 7. Render scene
 */
