import { Component, Element, Host, h, State, Prop } from '@stencil/core';
export class kortxyzSidebar {
  constructor() {
    this.closed = true;
    this.onClick = e => {
      const buttonContent = e.target.parentElement.getAttribute("content");
      if (!buttonContent)
        return;
      if (!this.activecontent) {
        this.open(buttonContent);
      }
      else if (this.activecontent == buttonContent) {
        this.close(buttonContent);
      }
      else if (this.activecontent != buttonContent) {
        this.close(this.activecontent);
        this.open(buttonContent);
      }
      ;
    };
    this.doResize = e => {
      if (e.clientX < 240) {
      }
      else if (e.clientX > 740) {
      }
      else {
        this.sidebarEl.style.flex = "0 0 " + e.clientX + "px";
      }
    };
    this.initResize = () => {
      document.body.style.cursor = 'e-resize';
      window.addEventListener('mousemove', this.doResize, false);
      window.addEventListener('mouseup', this.stopResize, false);
    };
    this.stopResize = () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', this.doResize, false);
      window.removeEventListener('mouseup', this.stopResize, false);
    };
  }
  open(content) {
    this.closed = false;
    const button = document.querySelector(`kortxyz-sideitem[content='${content}']`);
    button.classList.add("active");
    const elem = document.createElement(content);
    this.sidebarEl.querySelector("contents").append(elem);
    this.activecontent = content;
  }
  close(content) {
    this.closed = true;
    const button = document.querySelector(`kortxyz-sideitem[content='${content}']`);
    console.log(content, button);
    button.classList.remove("active");
    this.sidebarEl.querySelector("contents>" + this.activecontent).remove();
    this.activecontent = "";
  }
  componentDidLoad() {
    if (this.activecontent)
      this.open(this.activecontent);
  }
  render() {
    return (h(Host, { class: { 'closed': this.closed, } },
      h("icons", { onClick: (event) => this.onClick(event) },
        h("slot", null)),
      h("contents", null),
      h("resizer", { onMouseDown: () => this.initResize() })));
  }
  static get is() { return "kortxyz-sidebar"; }
  static get originalStyleUrls() { return {
    "$": ["kortxyz-sidebar.css"]
  }; }
  static get styleUrls() { return {
    "$": ["kortxyz-sidebar.css"]
  }; }
  static get properties() { return {
    "activecontent": {
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
      "attribute": "activecontent",
      "reflect": false
    }
  }; }
  static get states() { return {
    "closed": {}
  }; }
  static get elementRef() { return "sidebarEl"; }
}
