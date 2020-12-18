'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-0806c78b.js');

const kortxyzMenuCss = "kortxyz-menu{height:100%;width:100%;display:flex;flex:1}";

const kortxyzMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return [];
  }
  get menuEl() { return index.getElement(this); }
};
kortxyzMenu.style = kortxyzMenuCss;

exports.kortxyz_menu = kortxyzMenu;
