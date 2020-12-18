'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-0806c78b.js');

const kortxyzEmptyCss = "kortxyz-empty{height:100%;width:100%;display:flex;flex:1}";

const kortxyzEmpty = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return [];
  }
  get dropzoneEl() { return index.getElement(this); }
};
kortxyzEmpty.style = kortxyzEmptyCss;

exports.kortxyz_empty = kortxyzEmpty;
