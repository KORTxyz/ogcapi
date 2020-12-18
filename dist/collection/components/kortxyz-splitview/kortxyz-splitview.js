import { Component, Element, h } from '@stencil/core';
export class kortxyzSplitview {
  constructor() {
    this.initResize = () => {
      this.splitviewEl.addEventListener('mousemove', this.Resize, false);
      window.addEventListener('mouseup', this.stopResize, false);
    };
    this.Resize = event => {
      const dif = (event.clientX - this.splitviewEl.offsetLeft) / (this.splitviewEl.clientWidth);
      this.splitviewEl.style.gridTemplateColumns = `${dif}fr 2px ${1 - dif}fr`;
    };
    this.stopResize = () => {
      document.body.style.cursor = null;
      this.splitviewEl.removeEventListener('mousemove', this.Resize, false);
      window.removeEventListener('mouseup', this.stopResize, false);
    };
  }
  componentWillUpdate() {
    console.log("updating splitview");
  }
  render() {
    return [
      h("slot", { name: 'first' }),
      h("resizer", { class: "resizer", onmousedown: () => this.initResize() }),
      h("slot", { name: 'second' })
    ];
  }
  static get is() { return "kortxyz-splitview"; }
  static get originalStyleUrls() { return {
    "$": ["kortxyz-splitview.css"]
  }; }
  static get styleUrls() { return {
    "$": ["kortxyz-splitview.css"]
  }; }
  static get elementRef() { return "splitviewEl"; }
}
