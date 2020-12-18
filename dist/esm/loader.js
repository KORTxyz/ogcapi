import { p as promiseResolve, b as bootstrapLazy } from './index-2c3aeca4.js';

/*
 Stencil Client Patch Esm v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["kortxyz-collections",[[0,"kortxyz-collections",{"originalcollections":[16],"collections":[16],"fetchCollections":[64]}]]],["kortxyz-dropzone",[[0,"kortxyz-dropzone"]]],["kortxyz-empty",[[0,"kortxyz-empty"]]],["kortxyz-menu",[[0,"kortxyz-menu"]]],["kortxyz-processes",[[0,"kortxyz-processes"]]],["kortxyz-styles",[[0,"kortxyz-styles"]]],["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["kortxyz-collection",[[0,"kortxyz-collection",{"collection":[8]}]]],["kortxyz-coordinates_9",[[0,"kortxyz-footer"],[4,"kortxyz-sidebar",{"activecontent":[1],"closed":[32]}],[0,"kortxyz-sideitem",{"icon":[1]}],[0,"kortxyz-coordinates",null,[[8,"mapMoved","handleScroll"]]],[0,"kortxyz-gps",{"state":[32],"navigator":[32]},[[8,"mapMoved","notFixed"]]],[0,"kortxyz-tab",{"tabid":[2],"active":[4],"icon":[1],"name":[1],"collection":[8],"droparea":[4],"removeTab":[64]}],[0,"kortxyz-tabbar",{"setActiveTab":[64],"getActiveTab":[64],"addTab":[64],"removeTab":[64]}],[0,"kortxyz-mapbox",{"map":[16],"mapstyle":[8],"bbox":[8],"accesstoken":[1],"inFocus":[4,"in-focus"],"hover":[32],"initResizeObsersver":[64]},[[8,"mapMoved","handleScroll"]]],[4,"kortxyz-splitview"]]]], options);
  });
};

export { defineCustomElements };
