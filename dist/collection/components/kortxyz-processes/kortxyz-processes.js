import { Component, Element, h } from '@stencil/core';
export class kortxyzProcesses {
  render() {
    return [
      h("header", null, "Processes")
    ];
  }
  static get is() { return "kortxyz-processes"; }
  static get originalStyleUrls() { return {
    "$": ["kortxyz-processes.css"]
  }; }
  static get styleUrls() { return {
    "$": ["kortxyz-processes.css"]
  }; }
  static get elementRef() { return "processesEl"; }
}
