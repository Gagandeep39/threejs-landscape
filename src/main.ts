import './style.css';

import * as THREE from 'three';
import * as dat from 'dat.gui';

const gui = new dat.GUI();
const world = {
  plane: {
    width: 10,
    height: 10,
  },
};
gui.add(world.plane, 'width', 0, 20).onChange(generatePlane);
gui.add(world.plane, 'height', 0, 20).onChange(() => generatePlane());

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
renderer.setPixelRatio(devicePixelRatio); // Smoothens the mesh
document.body.appendChild(renderer.domElement);

camera.position.z = 5; // How far we are from camera
renderer.render(scene, camera);

// Plane Geometry
const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
// Plane Material
// Phong Material needs light o be viewed
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide, // show both side
  flatShading: true, // smooth the mesh
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

// Create light source
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1); // Put it at center of material
scene.add(light);
modifyVertice();

function generatePlane() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    10,
    10
  );
  modifyVertice();
}

function modifyVertice() {
  // Mdfy the vertices
  const array = planeMesh.geometry.attributes.position.array; // Extract the postion array of the geometry, contains vertex position in order x, y, z, x, y, z
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];
    array[i + 2] = z + Math.random(); // Randomly azzing the z value of vertx
  }
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  // move the plane
  // planeMesh.rotation.x += 0.01;
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
