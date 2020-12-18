import { Component, Element, Prop, Host, h, Method, Event, Listen, State } from '@stencil/core';
import mapboxgl from 'mapbox-gl';
import ResizeObserver from "resize-observer-polyfill";
export class kortxyzMapbox {
  constructor() {
    this.mapstyle = { "version": 8, "name": "Empty", "metadata": { "mapbox:autocomposite": true }, "sources": {}, "layers": [] };
    this.bbox = [-180.000000, -85, 180.703125, 85];
    this.inFocus = true;
    this.popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });
  }
  handleScroll(ev) {
    // if(!this.inFocus) this.map.fitBounds(ev.detail)
    if (!this.inFocus)
      this.map.jumpTo(ev.detail);
  }
  async initResizeObsersver() {
    this.ro = new ResizeObserver(() => this.map.resize());
    this.ro.observe(this.mapEl);
  }
  componentDidLoad() {
    if (this.accesstoken)
      mapboxgl.accessToken = this.accesstoken;
    this.map = new mapboxgl.Map({
      container: this.mapEl,
      attributionControl: false,
      style: this.mapstyle,
      bounds: this.bbox,
      maxZoom: 17,
    });
    this.mapEl.getElementsByClassName("mapboxgl-control-container")[0].remove();
    this.map.on('dataloading', () => this.mapEl.classList.add("loading"));
    this.map.on('idle', () => this.mapEl.classList.remove("loading"));
    this.initResizeObsersver();
    this.map.on('mouseover', () => this.inFocus = true);
    this.map.on('mouseout', () => this.inFocus = false);
    this.map.on('move', e => {
      //const bounds = e.target.getBounds().toArray()
      //if(this.inFocus) this.mapMoved.emit(bounds);
      if (this.inFocus)
        this.mapMoved.emit({
          center: e.target.getCenter().toArray(),
          zoom: e.target.getZoom(),
          pitch: e.target.getPitch(),
          bearing: e.target.getBearing()
        });
    });
    this.map.on('click', e => {
      var features = this.map.queryRenderedFeatures(e.point);
      if (features.length > 0) {
        this.popup.setLngLat(e.lngLat)
          .setHTML(this.renderPopup(features))
          .addTo(this.map);
      }
      else {
        this.popup.remove();
      }
    });
    this.map.on('mousemove', e => {
      var features = this.map.queryRenderedFeatures(e.point);
      this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
      if (features.length > 0 && features[0].id) { /*Find en måde at understøtte features uden ID fx fra OGR2OGR. this.hover.id.includes(features[0].layer.id)*/
        if (this.hover)
          this.map.setFeatureState({ source: this.hover.layer.source, sourceLayer: this.hover.layer["source-layer"], id: this.hover.id }, { hover: false });
        this.hover = { id: features[0].id, layer: features[0].layer };
        this.map.setFeatureState({ source: this.hover.layer.source, sourceLayer: this.hover.layer["source-layer"], id: this.hover.id }, { hover: true });
      }
      else {
        if (this.hover)
          this.map.setFeatureState({ source: this.hover.layer.source, sourceLayer: this.hover.layer["source-layer"], id: this.hover.id }, { hover: false });
        this.hover = null;
      }
    });
  }
  renderPopup(features) {
    const feature = features[0];
    const content = `
          <div class="popup-header">#${feature.layer.id}</div>
          <div class="popup-properties">
            ${Object.entries(feature.properties).map(property => `<b>${property[0]}</b> ${property[1]}<br> `).join('')}
          </div>
         `;
    return content;
  }
  disconnectedCallback() {
    this.ro.disconnect();
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "kortxyz-mapbox"; }
  static get originalStyleUrls() { return {
    "$": ["kortxyz-mapbox.css"]
  }; }
  static get styleUrls() { return {
    "$": ["kortxyz-mapbox.css"]
  }; }
  static get properties() { return {
    "map": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "mapboxgl.Map",
        "resolved": "Map",
        "references": {
          "mapboxgl": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      }
    },
    "mapstyle": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "mapstyle",
      "reflect": false,
      "defaultValue": "{ \"version\": 8, \"name\": \"Empty\", \"metadata\": { \"mapbox:autocomposite\": true }, \"sources\": {}, \"layers\": [] }"
    },
    "bbox": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "bbox",
      "reflect": false,
      "defaultValue": "[-180.000000, -85, 180.703125, 85]"
    },
    "accesstoken": {
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
      "attribute": "accesstoken",
      "reflect": false
    },
    "inFocus": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "in-focus",
      "reflect": false,
      "defaultValue": "true"
    }
  }; }
  static get states() { return {
    "hover": {}
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
  static get methods() { return {
    "initResizeObsersver": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "mapEl"; }
  static get listeners() { return [{
      "name": "mapMoved",
      "method": "handleScroll",
      "target": "window",
      "capture": false,
      "passive": false
    }]; }
}
