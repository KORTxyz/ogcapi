import { r as registerInstance, g as getElement } from './index-2c3aeca4.js';

const kortxyzMenuCss = "kortxyz-menu{height:100%;width:100%;display:flex;flex:1}";

const kortxyzMenu = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return [];
  }
  get menuEl() { return getElement(this); }
};
kortxyzMenu.style = kortxyzMenuCss;

export { kortxyzMenu as kortxyz_menu };
