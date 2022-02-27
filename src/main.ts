import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { planeMesh } from './plane';
import { hoverColor, originalColor } from './plane-color';
import './style.css';

// Laser pointer dot relative to the scene
const rayCaster = new THREE.Raycaster();
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

new OrbitControls(camera, renderer.domElement);

camera.position.z = 5; // How far we are from camera
renderer.render(scene, camera);

scene.add(planeMesh);

// Create light source
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1); // Put it at center of material
scene.add(light);

// Create light source behind
const behindLight = new THREE.DirectionalLight(0xffffff, 1);
behindLight.position.set(0, 0, -1); // Put it at center of material
scene.add(behindLight);

const mouse = {
  x: 0,
  y: 0,
};

let frame = 0;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // Creates a ray from camera to mouse
  rayCaster.setFromCamera(mouse, camera);
  frame += 0.01;
  const { array, originalPosition, randomValues } = planeMesh.geometry
    .attributes.position as any;
  for (let i = 0; i < array.length; i += 3) {
    array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.003;
    array[i + 1] =
      originalPosition[i + 1] + Math.cos(frame + randomValues[i + 1]) * 0.003;
  }
  planeMesh.geometry.attributes.position.needsUpdate = true;

  // Returns an aray of points where ray nintecets ith the plane
  const intersecting = rayCaster.intersectObject(planeMesh);

  // Checksif the intersection hs chnged and update accordinly
  if (intersecting.length > 0 && intersecting[0].object instanceof THREE.Mesh) {
    const geometry: THREE.BufferGeometry = intersecting[0].object.geometry;
    const { color } = geometry.attributes;
    const { r, g, b } = hoverColor;
    updateVertexColor(color, intersecting[0].face!, r, g, b);

    const tempHoverColor = { ...hoverColor };

    // Fade and reset to original color
    gsap.to(tempHoverColor, {
      r: originalColor.r,
      g: originalColor.g,
      b: originalColor.b,
      onUpdate: () => {
        updateVertexColor(
          color,
          intersecting[0].face!,
          tempHoverColor.r,
          tempHoverColor.g,
          tempHoverColor.b
        );
      },
    });
  }
}

function updateVertexColor(
  vertex: THREE.BufferAttribute | THREE.InterleavedBufferAttribute,
  face: THREE.Face,
  r: number,
  g: number,
  b: number
) {
  // Vertice 1
  vertex.setX(face!.a, r);
  vertex.setY(face!.a, g);
  vertex.setZ(face!.a, b);

  // Vertice 2
  vertex.setX(face!.b, r);
  vertex.setY(face!.b, g);
  vertex.setZ(face!.b, b);

  // Vertice 3
  vertex.setX(face!.c, r);
  vertex.setY(face!.c, g);
  vertex.setZ(face!.c, b);
  vertex.needsUpdate = true;
}

animate();

addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
  // modify suc that center is 0, 0
});
/**
 * 1. Create a scene
 * 2. Create an object
 * 3. Create object material
 * 4. Create a mesh -> bject of a specific material
 * 5. Add mesh to scene
 * 6. Position camera
 * 7. Render scene
 */
