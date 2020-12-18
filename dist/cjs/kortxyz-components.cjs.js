'use strict';

const index = require('./index-0806c78b.js');

/*
 Stencil Client Patch Browser v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('kortxyz-components.cjs.js', document.baseURI).href));
    const opts =  {};
    if ( importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["kortxyz-collections.cjs",[[0,"kortxyz-collections",{"originalcollections":[16],"collections":[16],"fetchCollections":[64]}]]],["kortxyz-dropzone.cjs",[[0,"kortxyz-dropzone"]]],["kortxyz-empty.cjs",[[0,"kortxyz-empty"]]],["kortxyz-menu.cjs",[[0,"kortxyz-menu"]]],["kortxyz-processes.cjs",[[0,"kortxyz-processes"]]],["kortxyz-styles.cjs",[[0,"kortxyz-styles"]]],["my-component.cjs",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["kortxyz-collection.cjs",[[0,"kortxyz-collection",{"collection":[8]}]]],["kortxyz-coordinates_9.cjs",[[0,"kortxyz-footer"],[4,"kortxyz-sidebar",{"activecontent":[1],"closed":[32]}],[0,"kortxyz-sideitem",{"icon":[1]}],[0,"kortxyz-coordinates",null,[[8,"mapMoved","handleScroll"]]],[0,"kortxyz-gps",{"state":[32],"navigator":[32]},[[8,"mapMoved","notFixed"]]],[0,"kortxyz-tab",{"tabid":[2],"active":[4],"icon":[1],"name":[1],"collection":[8],"droparea":[4],"removeTab":[64]}],[0,"kortxyz-tabbar",{"setActiveTab":[64],"getActiveTab":[64],"addTab":[64],"removeTab":[64]}],[0,"kortxyz-mapbox",{"map":[16],"mapstyle":[8],"bbox":[8],"accesstoken":[1],"inFocus":[4,"in-focus"],"hover":[32],"initResizeObsersver":[64]},[[8,"mapMoved","handleScroll"]]],[4,"kortxyz-splitview"]]]], options);
});
