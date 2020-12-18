import { Component, Element, Prop, Host, h, Method } from '@stencil/core';
export class kortxyzTab {
  constructor() {
    this.droparea = false;
    this.dragCounter = 0;
  }
  async setActive() {
    const tabbar = this.tabEl.parentElement.parentElement;
    await tabbar.setActiveTab(this.tabEl);
  }
  async removeTab() {
    const tabbar = this.tabEl.parentElement.parentElement;
    await tabbar.removeTab(this.tabEl);
  }
  onauxclick(e) {
    if (e.button == 1)
      this.removeTab();
    else if (e.button == 2)
      console.log("contextmenu");
  }
  onDragStart(event) {
    console.log(this.collection);
    const json = {
      type: 'tab',
      data: {
        id: this.tabEl.id,
        collection: this.collection
      }
    };
    event.dataTransfer.setData("text/plain", JSON.stringify(json));
  }
  onDragEnter() {
    this.dragCounter++;
    this.tabEl.style.background = "#555";
  }
  onDragLeave() {
    this.dragCounter--;
    if (this.dragCounter == 0)
      this.tabEl.style.background = "";
  }
  async splitView() {
    const tabbar = this.tabEl.parentElement.parentElement;
    const tabbarParent = tabbar.parentElement;
    let splitView = document.createElement("kortxyz-splitview");
    splitView.setAttribute("slot", tabbar.slot);
    let newTabbar = document.createElement("kortxyz-tabbar");
    if (tabbar.slot == "first" && tabbarParent.tagName != "ROW")
      tabbarParent.prepend(splitView);
    else
      tabbarParent.append(splitView);
    tabbar.setAttribute("slot", "first");
    splitView.appendChild(tabbar);
    newTabbar.setAttribute("slot", "second");
    splitView.appendChild(newTabbar);
    const activeTab = await tabbar.getActiveTab();
    newTabbar.addTab(activeTab.collection);
    if (tabbar.children.length > 1)
      tabbar.removeTab(activeTab);
    document.querySelectorAll("kortxyz-mapbox").forEach(e => {
      e.initResizeObsersver();
      e.inFocus = false;
    });
  }
  render() {
    if (this.droparea) {
      return h(Host, { class: "droparea", onDragEnter: () => this.onDragEnter(), ondragleave: () => this.onDragLeave() },
        h("i", { class: "material-icons", onClick: () => this.splitView() }, "horizontal_distribute"));
    }
    else {
      return (h(Host, { class: this.active ? "active" : "", draggable: "true", onauxclick: event => this.onauxclick(event), ondragstart: event => this.onDragStart(event), onDragEnter: () => this.onDragEnter(), ondragleave: () => this.onDragLeave() },
        h("i", { class: "material-icons", onClick: () => this.setActive() }, this.icon),
        h("header", { title: this.name, onClick: () => this.setActive() }, this.name.split(":").pop()),
        h("i", { class: "material-icons", onClick: () => this.removeTab() }, "close")));
    }
  }
  static get is() { return "kortxyz-tab"; }
  static get originalStyleUrls() { return {
    "$": ["kortxyz-tab.css"]
  }; }
  static get styleUrls() { return {
    "$": ["kortxyz-tab.css"]
  }; }
  static get properties() { return {
    "tabid": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "tabid",
      "reflect": false
    },
    "active": {
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
      "attribute": "active",
      "reflect": false
    },
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
      "reflect": false
    },
    "name": {
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
      "attribute": "name",
      "reflect": false
    },
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
    },
    "droparea": {
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
      "attribute": "droparea",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get methods() { return {
    "removeTab": {
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
  static get elementRef() { return "tabEl"; }
}
