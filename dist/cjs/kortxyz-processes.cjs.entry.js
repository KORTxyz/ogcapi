'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-0806c78b.js');

const kortxyzProcessesCss = "kortxyz-processes{height:100%;width:100%;display:flex;flex:1}kortxyz-processes>header{font-family:'Roboto Mono', monospace;font-weight:bold;font-size:12px;color:#BBBBBB;line-height:30px;padding-left:12px;margin:0;width:calc(100% - 12px)}";

const kortxyzProcesses = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return [
      index.h("header", null, "Processes")
    ];
  }
  get processesEl() { return index.getElement(this); }
};
kortxyzProcesses.style = kortxyzProcessesCss;

exports.kortxyz_processes = kortxyzProcesses;
