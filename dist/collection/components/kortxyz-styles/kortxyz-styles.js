import { Component, Element, h } from '@stencil/core';
export class kortxyzStyles {
  render() {
    return [
      h("header", null, "Styles")
    ];
  }
  static get is() { return "kortxyz-styles"; }
  static get originalStyleUrls() { return {
    "$": ["kortxyz-styles.css"]
  }; }
  static get styleUrls() { return {
    "$": ["kortxyz-styles.css"]
  }; }
  static get elementRef() { return "stylesEl"; }
}
