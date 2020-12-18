import { Component, Element, h } from '@stencil/core';
export class kortxyzFooter {
  render() {
    return [
      h("filler", null),
      h("kortxyz-coordinates", null),
      h("kortxyz-gps", null),
      h("filler", null)
    ];
  }
  static get is() { return "kortxyz-footer"; }
  static get originalStyleUrls() { return {
    "$": ["kortxyz-footer.css"]
  }; }
  static get styleUrls() { return {
    "$": ["kortxyz-footer.css"]
  }; }
  static get elementRef() { return "footerEl"; }
}
