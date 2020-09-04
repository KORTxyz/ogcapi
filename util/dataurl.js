const fetch = require('node-fetch');
const parser = require('fast-xml-parser');

const GetCapabilities = async url=>{
    const xmlData = await fetch(url).then(e=>e.textConverted())
    const json = await parser.parse(xmlData)
    return json;
}

const formatWFS = (url, layers) => {
    const formatOGCAPI = layer => {
        return {
          name: layer.Name || layer['wfs:Name'],
          title: layer.Title || layer['wfs:Name'],
          group: url.split("/")[2],
          url: url.split("?")[0],
          type: 'wfs',
          desc: layer.Abstract,
          bbox: [...layer['ows:WGS84BoundingBox']['ows:LowerCorner'].split(" "),...layer['ows:WGS84BoundingBox']['ows:UpperCorner'].split(" ")].map(num => Number(Number(num).toFixed(6) ))
        }

    }

    return layers.map(formatOGCAPI)
    
}

const readUrl = async url => {
    const capabilities = await GetCapabilities(url);
    const header = Object.keys(capabilities)[0]
    let metadata;

    if(header.includes("wfs")){
      FeatureTypeList = capabilities["wfs:WFS_Capabilities"].FeatureTypeList || capabilities["wfs:WFS_Capabilities"]["wfs:FeatureTypeList"]
      FeatureType = FeatureTypeList["wfs:FeatureType"] || FeatureTypeList.FeatureType
      metadata = formatWFS(url, FeatureType)
    }
    else if(header.includes("wms")){

    }
    else{
      console.log(capabilities)
    }
    global.collectionDB.insert(metadata).catch(err=>{ throw err; })
    return "success";
}

module.exports = {
  readUrl
};
