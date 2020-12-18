import { r as registerInstance, h, g as getElement } from './index-2c3aeca4.js';

const kortxyzCollectionsCss = "kortxyz-collections{height:100%;width:100%;display:flex;flex:1;flex-direction:column;user-select:none;max-height:100%}kortxyz-collections>header{font-family:'Roboto Mono', monospace;font-weight:bold;font-size:12px;color:#BBB;line-height:30px;padding-left:12px;margin:0;width:calc(100% - 12px)}kortxyz-collections>input[type=text]{background:#3C3C3C;padding:5px;border:0;line-height:20px;border-radius:0;margin:0 5px 5px 5px;outline:none;color:rgb(218, 218, 218);font-family:'Roboto Mono', monospace;font-size:10px}kortxyz-collections>input[type=text]:focus{border:0}kortxyz-collections>collectionlist{overflow:auto}group>input{display:none}group>input:checked~groupcollections{display:flex}group>input:checked~label>.material-icons{transform:rotate(0deg)}group>label{font-family:'Roboto Mono', monospace;display:flex;font-size:12px;height:20px;line-height:20px;width:calc(100% - 4px);color:#ddd;cursor:pointer;margin-left:4px}group>label:hover{background:#333}group>label>.material-icons{transform:rotate(-90deg);font-size:14px;line-height:20px}group>groupcollections{display:none;flex-direction:column}";

const kortxyzCollections = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
      h("collectionlist", null, [...new Set(this.collections.map(e => e.group))].map((group) => h("group", null, h("input", { id: group, type: "checkbox" }), h("label", { htmlFor: group }, h("i", { class: "material-icons" }, "keyboard_arrow_down"), group), h("groupcollections", null, this.collections.filter(e => e.group == group).map((collection) => h("kortxyz-collection", { collection: collection }))))))
    ];
  }
  get collectionsEl() { return getElement(this); }
};
kortxyzCollections.style = kortxyzCollectionsCss;

export { kortxyzCollections as kortxyz_collections };
