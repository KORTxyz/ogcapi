import { Component, Element, Host, Listen, h } from '@stencil/core';
import formatcoords from 'formatcoords';
export class kortxyzCoordinates {
  handleScroll(ev) {
    this.coordinatesEl.innerHTML = formatcoords(ev.detail.center, true).format("f");
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "kortxyz-coordinates"; }
  static get originalStyleUrls() { return {
    "$": ["kortxyz-coordinates.css"]
  }; }
  static get styleUrls() { return {
    "$": ["kortxyz-coordinates.css"]
  }; }
  static get elementRef() { return "coordinatesEl"; }
  static get listeners() { return [{
      "name": "mapMoved",
      "method": "handleScroll",
      "target": "window",
      "capture": false,
      "passive": false
    }]; }
}
