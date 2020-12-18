import { Component, Element, Event, Host, h } from '@stencil/core';
export class kortxyzDropzone {
  onDragEnter(event) {
    event.preventDefault();
    console.log("kortxyz-dropzone onDragEnter", event.target);
    const dragtriggers = this.dropzoneEl.getElementsByClassName('dragtriggers')[0];
    dragtriggers.style.pointerEvents = "all";
    const ghost = this.dropzoneEl.getElementsByClassName(event.target.className + 'ghost')[0];
    ghost.classList.add("show");
  }
  onDragLeave(event) {
    console.log("onDragLeave", event.target);
    const ghost = this.dropzoneEl.getElementsByClassName(event.target.className + 'ghost')[0];
    ghost.classList.remove("show");
    //const dragtriggers:any = this.dropzoneEl.getElementsByClassName('dragtriggers')[0]
    //dragtriggers.style.pointerEvents = "none";
  }
  onDrop(event) {
    console.log(event);
  }
  render() {
    return (h(Host, { onDragEnter: (event) => this.onDragEnter(event) },
      h("div", { class: "dragtriggers" },
        h("div", { class: "left", onDragEnter: (event) => this.onDragEnter(event), onDragLeave: (event) => this.onDragLeave(event), onDrop: (event) => this.onDrop(event) }),
        h("div", { class: "right", onDragEnter: (event) => this.onDragEnter(event), onDragLeave: (event) => this.onDragLeave(event), onDrop: (event) => this.onDrop(event) }),
        h("div", { class: "top", onDragEnter: (event) => this.onDragEnter(event), onDragLeave: (event) => this.onDragLeave(event), onDrop: (event) => this.onDrop(event) }),
        h("div", { class: "bottom", onDragEnter: (event) => this.onDragEnter(event), onDragLeave: (event) => this.onDragLeave(event), onDrop: (event) => this.onDrop(event) }),
        h("div", { class: "center", onDragEnter: (event) => this.onDragEnter(event), onDragLeave: (event) => this.onDragLeave(event), onDrop: (event) => this.onDrop(event) })),
      h("div", { class: "centerghost" }),
      h("div", { class: "horizontalghost" },
        h("div", { class: "leftghost" }),
        h("div", { class: "rightghost" })),
      h("div", { class: "verticalghost" },
        h("div", { class: "topghost" }),
        h("div", { class: "bottomghost" }))));
  }
  static get is() { return "kortxyz-dropzone"; }
  static get originalStyleUrls() { return {
    "$": ["kortxyz-dropzone.css"]
  }; }
  static get styleUrls() { return {
    "$": ["kortxyz-dropzone.css"]
  }; }
  static get events() { return [{
      "method": "filesDropped",
      "name": "filesDropped",
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
    }, {
      "method": "textDropped",
      "name": "textDropped",
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
  static get elementRef() { return "dropzoneEl"; }
}
