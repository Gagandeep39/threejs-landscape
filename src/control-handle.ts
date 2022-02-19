import * as dat from 'dat.gui';
import { generatePlane } from './plane';
import { world } from './plane-structure';

export const createControls = () => {
  const gui = new dat.GUI();
  gui.add(world.plane, 'width', 0, 20).onChange(generatePlane);
  gui.add(world.plane, 'height', 0, 20).onChange(generatePlane);
  gui.add(world.plane, 'heightSegments', 0, 50).onChange(generatePlane);
  gui.add(world.plane, 'widthSegments', 0, 50).onChange(() => generatePlane());
};
