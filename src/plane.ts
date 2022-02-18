import * as THREE from 'three';
import { createControls } from './control-handle';
import { world } from './plane-structure';

createControls();

// Plane Geometry
const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
// Plane Material
// Phong Material needs light o be viewed
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide, // show both side
  flatShading: true, // smooth the mesh
});
export const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

export function generatePlane() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  );
  modifyVertice();
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
