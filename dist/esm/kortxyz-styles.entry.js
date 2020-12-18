import { r as registerInstance, h, g as getElement } from './index-2c3aeca4.js';

const kortxyzStylesCss = "kortxyz-styles{height:100%;width:100%;display:flex;flex:1}kortxyz-styles>header{font-family:'Roboto Mono', monospace;font-weight:bold;font-size:12px;color:#BBBBBB;line-height:30px;padding-left:12px;margin:0;width:calc(100% - 12px)}";

const kortxyzStyles = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return [
      h("header", null, "Styles")
    ];
  }
  get stylesEl() { return getElement(this); }
};
kortxyzStyles.style = kortxyzStylesCss;

export { kortxyzStyles as kortxyz_styles };
