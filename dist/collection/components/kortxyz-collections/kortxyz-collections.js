import { Component, Element, Prop, h, Method } from '@stencil/core';
export class kortxyzCollections {
  constructor() {
    this.originalcollections = [];
    this.collections = [];
    this.filterCollections = (event) => {
      const input = event.target.value;
      this.collections = this.originalcollections.filter(collection => Object.values(collection).filter(e => typeof (e) == "string").join("").toLowerCase().includes(input.toLowerCase()));
    };
  }
  async fetchCollections(url) {
    const response = await fetch(url);
    const result = await response.json();
    this.originalcollections = result.collections;
    this.collections = this.originalcollections;
  }
  componentWillLoad() {
    if (location.pathname.includes("/collections")) {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      this.fetchCollections(`${location.origin}/collections?f=json${q ? '&q=' + q : ""}`);
    }
    else {
      this.fetchCollections(location.origin + "/collections?f=json");
    }
  }
  render() {
    return [
      h("header", null, "Collections"),
      h("input", { type: "text", placeholder: "Search", onInput: event => this.filterCollections(event) }),
      h("collectionlist", null, [...new Set(this.collections.map(e => e.group))].map((group) => h("group", null,
        h("input", { id: group, type: "checkbox" }),
        h("label", { htmlFor: group },
          h("i", { class: "material-icons" }, "keyboard_arrow_down"),
          group),
        h("groupcollections", null, this.collections.filter(e => e.group == group).map((collection) => h("kortxyz-collection", { collection: collection }))))))
    ];
  }
  static get is() { return "kortxyz-collections"; }
  static get originalStyleUrls() { return {
    "$": ["kortxyz-collections.css"]
  }; }
  static get styleUrls() { return {
    "$": ["kortxyz-collections.css"]
  }; }
  static get properties() { return {
    "originalcollections": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "Array<any>",
        "resolved": "any[]",
        "references": {
          "Array": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "defaultValue": "[]"
    },
    "collections": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "Array<any>",
        "resolved": "any[]",
        "references": {
          "Array": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "defaultValue": "[]"
    }
  }; }
  static get methods() { return {
    "fetchCollections": {
      "complexType": {
        "signature": "(url: any) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
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
  static get elementRef() { return "collectionsEl"; }
}
