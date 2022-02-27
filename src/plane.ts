import * as THREE from 'three';
import { createControls } from './control-handle';
import { originalColor } from './plane-color';
import { world } from './plane-structure';

createControls();

// Plane Geometry
const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
// Plane Material
// Phong Material needs light o be viewed
const planeMaterial = new THREE.MeshPhongMaterial({
  // color: 0xff0000,
  side: THREE.DoubleSide, // show both side
  flatShading: true, // smooth the mesh
  vertexColors: true,
});
export const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
generatePlane();
export function generatePlane() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  );
  modifyVertice();
  addColors();
}

export function modifyVertice() {
  // Mdfy the vertices
  const array = planeMesh.geometry.attributes.position.array; // Extract the postion array of the geometry, contains vertex position in order x, y, z, x, y, z
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];
    array[i + 2] = z + Math.random(); // Randomly azzing the z value of vertx
  }
}

export function addColors() {
  // idividually set clor for each vertex and store in array
  const colors = [];
  for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
    const { r, g, b } = originalColor;
    colors.push(r, g, b);
  }

  // Assign colors to the plane
  planeMesh.geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(new Float32Array(colors), 3)
  );
  // item size consists of length of each group
  // Its 3 coz r, g, b, r, g, b
}
