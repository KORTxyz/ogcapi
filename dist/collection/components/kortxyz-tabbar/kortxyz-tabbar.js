import { Component, Element, Method, h } from '@stencil/core';
import { styleFromCollection, readFiles } from '../../utils/utils';
export class kortxyzTabbar {
  async setActiveTab(tab) {
    if (this.activetab && this.tabs.children[this.activetab]) {
      const tab = this.tabs.children[this.activetab];
      tab.active = false;
      const content = this.contents.children[this.activetab];
      content.style.display = "none";
    }
    this.activetab = tab.id;
    tab.active = true;
    const content = this.contents.children[tab.id];
    content.style.display = "flex";
  }
  async getActiveTab() {
    return this.tabs.children[this.activetab];
  }
  async addTab(collection, index = null) {
    if (!index && index !== 0)
      index = this.tabs.childElementCount - 1;
    const id = new Date().getTime();
    let tab = document.createElement("kortxyz-tab");
    tab.id = id;
    tab.icon = "layers";
    tab.name = collection.name;
    tab.collection = collection;
    this.tabs.insertBefore(tab, this.tabs.children[index]);
    let mapbox = document.createElement("kortxyz-mapbox");
    mapbox.id = id;
    mapbox.mapstyle = styleFromCollection(collection);
    mapbox.bbox = collection.extent.spatial;
    this.contents.append(mapbox);
    this.setActiveTab(tab);
    document.querySelectorAll("kortxyz-mapbox").forEach(e => {
      e.inFocus = false;
    });
  }
  async removeTab(tab) {
    const active = tab.active;
    let tabCount = this.contents.childElementCount;
    if (active && tabCount > 1) {
      const next = tab.nextElementSibling;
      if (next.droparea) {
        this.setActiveTab(tab.previousElementSibling);
      }
      else {
        this.setActiveTab(tab.nextElementSibling);
      }
    }
    tab.remove();
    this.contents.children[tab.id].remove();
    if (tabCount == 1) {
      const tabbarParent = this.tabbarEl.parentElement;
      if (tabbarParent.tagName == "KORTXYZ-SPLITVIEW") {
        // remove tab, resizer, splitview and add remaining tab to parent
        const resizer = this.tabbarEl.slot == "first" ? this.tabbarEl.nextElementSibling : this.tabbarEl.previousElementSibling;
        const tab = this.tabbarEl.slot == "first" ? resizer.nextElementSibling : resizer.previousElementSibling;
        this.tabbarEl.remove();
        resizer.remove();
        if (tabbarParent.parentElement.firstChild == tabbarParent)
          tabbarParent.parentElement.prepend(tab);
        else
          tabbarParent.parentElement.append(tab);
        tabbarParent.remove();
        document.querySelectorAll("kortxyz-mapbox").forEach(e => e.initResizeObsersver());
      }
    }
    document.querySelectorAll("kortxyz-mapbox").forEach(e => {
      e.inFocus = false;
    });
  }
  async onDrop(event) {
    const tabs = document.querySelectorAll("kortxyz-tab");
    tabs.forEach(tab => tab.style.background = "");
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const files = await readFiles(droppedFiles);
      console.log(files);
    }
    else {
      const droppedText = event.dataTransfer.getData("text/plain");
      let droppedJSON;
      try {
        droppedJSON = JSON.parse(droppedText);
      }
      catch (err) {
        console.error(err);
      }
      const targetTab = event.target.parentElement;
      const targetTabbar = targetTab.parentElement;
      const targetIndex = [...targetTabbar.children].findIndex(tab => tab.id == targetTab.id);
      if (droppedJSON.type == "tab") {
        this.addTab(droppedJSON.data.collection, targetIndex);
        const droppedTab = document.querySelector("#" + CSS.escape(droppedJSON.data.id));
        droppedTab.removeTab();
      }
      if (droppedJSON.type == "collection") {
        this.addTab(droppedJSON.data.collection, targetIndex);
      }
    }
  }
  render() {
    return [
      h("tabs", { ref: el => this.tabs = el, ondrop: (event) => this.onDrop(event) },
        h("kortxyz-tab", { droparea: true })),
      h("contents", { ref: el => this.contents = el, ondrop: (event) => this.onDrop(event) })
    ];
  }
  static get is() { return "kortxyz-tabbar"; }
  static get originalStyleUrls() { return {
    "$": ["kortxyz-tabbar.css"]
  }; }
  static get styleUrls() { return {
    "$": ["kortxyz-tabbar.css"]
  }; }
  static get methods() { return {
    "setActiveTab": {
      "complexType": {
        "signature": "(tab: any) => Promise<void>",
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
    },
    "getActiveTab": {
      "complexType": {
        "signature": "() => Promise<any>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<any>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "addTab": {
      "complexType": {
        "signature": "(collection: any, index?: any) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }, {
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
    },
    "removeTab": {
      "complexType": {
        "signature": "(tab: any) => Promise<void>",
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
  static get elementRef() { return "tabbarEl"; }
}
