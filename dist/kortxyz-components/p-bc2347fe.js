function e(e,t,o){return(e||"")+(t?" "+t:"")+(o?" "+o:"")}function t(e){const t=e.links.filter((e=>"tiles"==e.rel))[0];let o={version:8};if(o.name=e.name,o.metadata={"mapbox:autocomposite":!0},o.glyphs="mapbox://fonts/mapbox/{fontstack}/{range}.pbf",o.sources={tiles:{type:"application/vnd.mapbox-vector-tile"==t.type?"vector":"raster",tiles:[t.href.replace("{tileMatrixSetId}","google").replace("{tileMatrixId}","{z}").replace("{tileRow}","{x}").replace("{tileCol}","{y}")],bounds:e.extent.spatial,tileSize:"application/vnd.mapbox-vector-tile"==t.type?512:256,attribution:"",minzoom:0,maxzoom:"application/vnd.mapbox-vector-tile"==t.type?14:22},test:{type:"raster",tiles:["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],bounds:e.extent.spatial,tileSize:256,attribution:""}},"application/vnd.mapbox-vector-tile"==t.type){const t="#"+("00000"+(Math.random()*(1<<24)|0).toString(16)).slice(-6);o.layers=[{id:"tiles-raster",type:"raster",source:"test",minzoom:0,maxzoom:22,paint:{"raster-saturation":-.8}},{id:"tiles-polygons",type:"fill",source:"tiles","source-layer":e.title,filter:["==","$type","Polygon"],layout:{},paint:{"fill-opacity":["case",["boolean",["feature-state","hover"],!1],1,.7],"fill-color":t}},{id:"tiles-polygons-outline",type:"line",source:"tiles","source-layer":e.title,filter:["==","$type","Polygon"],layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":t,"line-width":["case",["boolean",["feature-state","hover"],!1],2,1],"line-opacity":.75}},{id:"tiles-lines",type:"line",source:"tiles","source-layer":e.title,filter:["==","$type","LineString"],layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":t,"line-width":["case",["boolean",["feature-state","hover"],!1],4,1.5],"line-opacity":["case",["boolean",["feature-state","hover"],!1],1,.7]}},{id:"tiles-pts",type:"circle",source:"tiles","source-layer":e.title,filter:["==","$type","Point"],paint:{"circle-color":t,"circle-radius":2.5,"circle-opacity":["case",["boolean",["feature-state","hover"],!1],1,.7]}}]}else o.layers=[{id:"tiles-raster",type:"raster",source:"tiles",minzoom:0,maxzoom:22}];return o}async function o(e){const t=[...e].map(await i);return Promise.all(t).then((e=>{console.log(e)})),t}async function i(e){let t;switch(e.name.split(".").pop()){case"geojson":t=await async function(e){var t=await e.text();return JSON.parse(t)}(e);break;default:console.error("fileType not supportet")}return t}export{e as f,o as r,t as s}