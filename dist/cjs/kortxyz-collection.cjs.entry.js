'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-0806c78b.js');

const kortxyzCollectionCss = "kortxyz-collection{height:100%;display:flex;flex-direction:column;padding:5px 5px 5px 10px;cursor:pointer}kortxyz-collection:hover{background:#333}collectionName{font-family:'Roboto Mono', monospace;font-weight:bold;font-size:14px;letter-spacing:-0.045em;padding-bottom:0.2em;color:#ccc}collectionName>.material-icons{float:right;font-size:12px}collectionName>.material-icons:hover{color:#FFF}collectionDesc{font-family:'Roboto Condensed', Verdana, sans-serif;font-size:9px;padding-bottom:0.2em;color:#a7a7a7}collectionAuthor{font-family:'Roboto Mono', monospace;font-weight:normal;font-size:9px;color:#838383;letter-spacing:0.05em}";

const kortxyzCollection = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
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
    return (index.h(index.Host, { draggable: "true", onclick: () => this.addLayer(), ondragstart: event => this.onDragStart(event) }, index.h("collectionName", null, this.collection.title, " ", index.h("i", { class: "material-icons" }, "more_vert")), index.h("collectionDesc", null, this.collection.description ? this.collection.description != this.collection.title ? this.collection.description : 'No Description' : 'No Description'), index.h("collectionAuthor", null, this.collection.group ? this.collection.group : '  ')));
  }
  get collectionEl() { return index.getElement(this); }
};
kortxyzCollection.style = kortxyzCollectionCss;

exports.kortxyz_collection = kortxyzCollection;
