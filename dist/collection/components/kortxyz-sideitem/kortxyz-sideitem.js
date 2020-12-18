import { Component, Element, h, Prop } from '@stencil/core';
export class kortxyzSideitem {
  constructor() {
    this.icon = "face";
  }
  render() {
    return [
      h("i", { class: "material-icons" }, this.icon)
    ];
  }
  static get is() { return "kortxyz-sideitem"; }
  static get originalStyleUrls() { return {
    "$": ["kortxyz-sideitem.css"]
  }; }
  static get styleUrls() { return {
    "$": ["kortxyz-sideitem.css"]
  }; }
  static get properties() { return {
    "icon": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "icon",
      "reflect": false,
      "defaultValue": "\"face\""
    }
  }; }
  static get elementRef() { return "sideitemEl"; }
}
