import { Component, Element, } from '@stencil/core';
export class kortxyzEmpty {
  render() {
    return [];
  }
  static get is() { return "kortxyz-empty"; }
  static get originalStyleUrls() { return {
    "$": ["kortxyz-empty.css"]
  }; }
  static get styleUrls() { return {
    "$": ["kortxyz-empty.css"]
  }; }
  static get elementRef() { return "dropzoneEl"; }
}
