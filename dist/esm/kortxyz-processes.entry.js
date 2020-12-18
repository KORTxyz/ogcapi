import { r as registerInstance, h, g as getElement } from './index-2c3aeca4.js';

const kortxyzProcessesCss = "kortxyz-processes{height:100%;width:100%;display:flex;flex:1}kortxyz-processes>header{font-family:'Roboto Mono', monospace;font-weight:bold;font-size:12px;color:#BBBBBB;line-height:30px;padding-left:12px;margin:0;width:calc(100% - 12px)}";

const kortxyzProcesses = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return [
      h("header", null, "Processes")
    ];
  }
  get processesEl() { return getElement(this); }
};
kortxyzProcesses.style = kortxyzProcessesCss;

export { kortxyzProcesses as kortxyz_processes };
