import { r as registerInstance, g as getElement } from './index-2c3aeca4.js';

const kortxyzEmptyCss = "kortxyz-empty{height:100%;width:100%;display:flex;flex:1}";

const kortxyzEmpty = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return [];
  }
  get dropzoneEl() { return getElement(this); }
};
kortxyzEmpty.style = kortxyzEmptyCss;

export { kortxyzEmpty as kortxyz_empty };
