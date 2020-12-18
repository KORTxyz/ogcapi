import { Component, Element, Prop, Host, h } from '@stencil/core';
export class kortxyzCollection {
  onDragStart(event) {
    const json = {
      type: 'collection',
      data: {
        collection: this.collection
      }
    };
    event.dataTransfer.setData('text/plain', JSON.stringify(json));
  }
  async addLayer() {
    await document.querySelector("kortxyz-tabbar").addTab(this.collection);
  }
  render() {
    return (h(Host, { draggable: "true", onclick: () => this.addLayer(), ondragstart: event => this.onDragStart(event) },
      h("collectionName", null,
        this.collection.title,
        " ",
        h("i", { class: "material-icons" }, "more_vert")),
      h("collectionDesc", null, this.collection.description ? this.collection.description != this.collection.title ? this.collection.description : 'No Description' : 'No Description'),
      h("collectionAuthor", null, this.collection.group ? this.collection.group : '  ')));
  }
  static get is() { return "kortxyz-collection"; }
  static get originalStyleUrls() { return {
    "$": ["kortxyz-collection.css"]
  }; }
  static get styleUrls() { return {
    "$": ["kortxyz-collection.css"]
  }; }
  static get properties() { return {
    "collection": {
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
      "attribute": "collection",
      "reflect": false
    }
  }; }
  static get elementRef() { return "collectionEl"; }
}
