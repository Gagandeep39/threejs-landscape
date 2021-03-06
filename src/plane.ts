import * as THREE from 'three';
import { createControls } from './control-handle';
import { originalColor } from './plane-color';
import { world } from './plane-structure';

createControls();

// Plane Geometry
const planeGeometry = new THREE.PlaneGeometry(
  world.plane.width,
  world.plane.height,
  world.plane.widthSegments,
  world.plane.heightSegments
);
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
  const array: any = planeMesh.geometry.attributes.position.array; // Extract the postion array of the geometry, contains vertex position in order x, y, z, x, y, z
  const randonValues = [];
  for (let i = 0; i < array.length; i++) {
    if (i % 3 === 0) {
      const x = array[i];
      const y = array[i + 1];
      const z = array[i + 2];
      array[i] = x + (Math.random() - 0.5) * 3;
      array[i + 1] = y + (Math.random() - 0.5) * 3;
      array[i + 2] = z + Math.random() * 3; // Randomly azzing the z value of vertx
    }

    randonValues.push(Math.random() * Math.PI - 0.5);
  }

  // Mdfy the orignal object and add a postion array that changes

  (<any>planeMesh.geometry.attributes.position).originalPosition =
    planeMesh.geometry.attributes.position.array;

  (<any>planeMesh.geometry.attributes.position).randomValues = randonValues;
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
