import { Component, Element, State, Event, Listen, h, } from '@stencil/core';
export class kortxyzGps {
  constructor() {
    this.state = "gps_off"; //gps_fixed, gps_not_fixed, gps_off
    this.onPosition = (pos) => {
      this.mapMoved.emit({
        center: [pos.coords.longitude, pos.coords.latitude],
      });
    };
  }
  notFixed() {
    if (this.state == "gps_fixed") {
      this.stopGPS();
      this.state = "gps_not_fixed";
      this.icon.innerHTML = this.state;
    }
  }
  stopGPS() {
    navigator.geolocation.clearWatch(this.navigator);
  }
  startGPS() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    this.navigator = navigator.geolocation.watchPosition(this.onPosition, err => console.error(err), options);
  }
  toogle() {
    if (this.state != "gps_fixed") {
      this.state = "gps_fixed";
      this.startGPS();
    }
    else {
      this.state = "gps_off";
      this.stopGPS();
    }
    this.icon.innerHTML = this.state;
  }
  render() {
    return [
      h("i", { class: "material-icons", ref: el => this.icon = el, onClick: () => this.toogle() }, "gps_off")
    ];
  }
  static get is() { return "kortxyz-gps"; }
  static get originalStyleUrls() { return {
    "$": ["kortxyz-gps.css"]
  }; }
  static get styleUrls() { return {
    "$": ["kortxyz-gps.css"]
  }; }
  static get states() { return {
    "state": {},
    "navigator": {}
  }; }
  static get events() { return [{
      "method": "mapMoved",
      "name": "mapMoved",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get elementRef() { return "gpsEl"; }
  static get listeners() { return [{
      "name": "mapMoved",
      "method": "notFixed",
      "target": "window",
      "capture": false,
      "passive": false
    }]; }
}
