function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
function styleFromCollection(collection) {
  const tilesLink = collection.links.filter(e => e.rel == "tiles")[0];
  let style = {};
  style.version = 8;
  style.name = collection.name;
  style.metadata = { "mapbox:autocomposite": true };
  style.glyphs = "mapbox://fonts/mapbox/{fontstack}/{range}.pbf";
  style.sources = {
    "tiles": {
      'type': tilesLink.type == "application/vnd.mapbox-vector-tile" ? 'vector' : 'raster',
      'tiles': [
        tilesLink.href
          .replace("{tileMatrixSetId}", "google")
          .replace("{tileMatrixId}", "{z}")
          .replace("{tileRow}", "{x}")
          .replace("{tileCol}", "{y}")
      ],
      'bounds': collection.extent.spatial,
      'tileSize': tilesLink.type == "application/vnd.mapbox-vector-tile" ? 512 : 256,
      'attribution': '',
      //'promoteId':'OBJECTID',
      'minzoom': 0,
      'maxzoom': tilesLink.type == "application/vnd.mapbox-vector-tile" ? 14 : 22,
    },
    "test": {
      'type': 'raster',
      'tiles': [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      ],
      'bounds': collection.extent.spatial,
      'tileSize': 256,
      'attribution': ''
    }
  };
  if (tilesLink.type == "application/vnd.mapbox-vector-tile") {
    const layerColor = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
    style.layers = [{
        'id': 'tiles-raster',
        'type': 'raster',
        'source': 'test',
        'minzoom': 0,
        'maxzoom': 22,
        'paint': {
          'raster-saturation': -0.8
        }
      },
      {
        'id': 'tiles-polygons',
        'type': 'fill',
        'source': 'tiles',
        'source-layer': collection.title,
        'filter': ["==", "$type", "Polygon"],
        'layout': {},
        'paint': {
          'fill-opacity': ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.7],
          'fill-color': layerColor
        }
      }, {
        'id': 'tiles-polygons-outline',
        'type': 'line',
        'source': 'tiles',
        'source-layer': collection.title,
        'filter': ["==", "$type", "Polygon"],
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': layerColor,
          'line-width': ["case", ["boolean", ["feature-state", "hover"], false], 2, 1],
          'line-opacity': 0.75
        }
      }, {
        'id': 'tiles-lines',
        'type': 'line',
        'source': 'tiles',
        'source-layer': collection.title,
        'filter': ["==", "$type", "LineString"],
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': layerColor,
          'line-width': ["case", ["boolean", ["feature-state", "hover"], false], 4, 1.5],
          'line-opacity': ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.7],
        }
      }, {
        'id': 'tiles-pts',
        'type': 'circle',
        'source': 'tiles',
        'source-layer': collection.title,
        'filter': ["==", "$type", "Point"],
        'paint': {
          'circle-color': layerColor,
          'circle-radius': 2.5,
          'circle-opacity': ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.7],
        }
      }];
  }
  else {
    style.layers = [{
        'id': 'tiles-raster',
        'type': 'raster',
        'source': 'tiles',
        'minzoom': 0,
        'maxzoom': 22
      }];
  }
  return style;
}
async function readFiles(files) {
  const filesdata = [...files].map(await readFile);
  Promise.all(filesdata).then((values) => {
    console.log(values);
  });
  return filesdata;
}
async function readFile(file) {
  const filetype = file.name.split(".").pop();
  let data;
  switch (filetype) {
    case "geojson":
      data = await readGeojson(file);
      break;
    default:
      console.error("fileType not supportet");
  }
  return data;
}
async function readGeojson(file) {
  var text = await file.text();
  var json = JSON.parse(text);
  return json;
}

export { format as f, readFiles as r, styleFromCollection as s };
