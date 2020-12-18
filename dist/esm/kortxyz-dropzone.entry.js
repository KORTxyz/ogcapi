import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2c3aeca4.js';

const kortxyzDropzoneCss = "kortxyz-dropzone{height:100%;width:100%;display:flex}.dragtriggers{flex:1;display:grid;grid-template-columns:0.5fr 2fr 0.5fr;grid-template-rows:0.5fr 2fr 0.5fr;gap:0px 0px;grid-template-areas:\"Left Top Right\"\n      \"Left Center Right\"\n      \"Left Bottom Right\";margin-left:-100%;pointer-events:none}.left{grid-area:Left}.right{grid-area:Right}.top{grid-area:Top}.bottom{grid-area:Bottom}.center{grid-area:Center}.centerghost{display:flex;flex:1;margin-left:-100%;pointer-events:none}.horizontalghost{display:flex;flex:1;margin-left:-100%;pointer-events:none}.leftghost{flex:1}.rightghost{flex:1}.verticalghost{display:flex;flex:1;margin-left:-100%;pointer-events:none;flex-direction:column}.topghost{flex:1}.bottomghost{flex:1}.show{background-color:rgba(245, 245, 245, 0.316)}";

const kortxyzDropzone = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.filesDropped = createEvent(this, "filesDropped", 7);
    this.textDropped = createEvent(this, "textDropped", 7);
  }
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
    return (h(Host, { onDragEnter: (event) => this.onDragEnter(event) }, h("div", { class: "dragtriggers" }, h("div", { class: "left", onDragEnter: (event) => this.onDragEnter(event), onDragLeave: (event) => this.onDragLeave(event), onDrop: (event) => this.onDrop(event) }), h("div", { class: "right", onDragEnter: (event) => this.onDragEnter(event), onDragLeave: (event) => this.onDragLeave(event), onDrop: (event) => this.onDrop(event) }), h("div", { class: "top", onDragEnter: (event) => this.onDragEnter(event), onDragLeave: (event) => this.onDragLeave(event), onDrop: (event) => this.onDrop(event) }), h("div", { class: "bottom", onDragEnter: (event) => this.onDragEnter(event), onDragLeave: (event) => this.onDragLeave(event), onDrop: (event) => this.onDrop(event) }), h("div", { class: "center", onDragEnter: (event) => this.onDragEnter(event), onDragLeave: (event) => this.onDragLeave(event), onDrop: (event) => this.onDrop(event) })), h("div", { class: "centerghost" }), h("div", { class: "horizontalghost" }, h("div", { class: "leftghost" }), h("div", { class: "rightghost" })), h("div", { class: "verticalghost" }, h("div", { class: "topghost" }), h("div", { class: "bottomghost" }))));
  }
  get dropzoneEl() { return getElement(this); }
};
kortxyzDropzone.style = kortxyzDropzoneCss;

export { kortxyzDropzone as kortxyz_dropzone };
