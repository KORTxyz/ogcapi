const collections = async (baseUrl,datasets) => {
    return {
        "links": [
            {
                "href": `${baseUrl}/collections?f=json`,
                "rel": 'self',
                "type": "application/json",
                "title": "This document as JSON"
            },
            {
                "href": `${baseUrl}/collections?f=html`,
                "rel": 'alternate',
                "type": "text/html",
                "title": "This document as HTML"
            }
        ],
        "collections": datasets.map(dataset => collection(dataset,baseUrl))
    }
}

const collection = async (baseUrl,data) =>{
    console.log(baseUrl,data) 
    //const links = await formatLinks(data,req)
    return {
        "name": data.name,
        "title": data.title||'',
        "group": data.group||'',
        "description": data.desc||'',
        "extent": {
           "spatial": data.bbox
        },
        "links": links(data,baseUrl)
    }
}

const links = (data,baseUrl) => {
    const fileFormat = {
        "png": "image/png",
        "jpg": "image/jpeg",
        "webp": "image/webp",
        "pbf": "application/vnd.mapbox-vector-tile"
    }
    
    const baseArray = [{
        "href": `${baseUrl}/collections/${data.format!="pbf"?data.name: data.name.substring(0,data.name.lastIndexOf(":"))}/tiles`,
        "rel": "tilingSchemes",
        "type": "application/json",
        "title": data.title+"'s associated tiling schemes."
      },{
        "href":`${baseUrl}/collections/${data.format!="pbf"?data.name: data.name.substring(0,data.name.lastIndexOf(":"))}/tiles/{tilingSchemeId}`,
        "rel": "tilingScheme",
        "type": "application/json",
        "title": data.title+"'s associated tiling schemes. The link is a URI template where {tilingSchemeId} is one of the schemes listed in the 'tilingSchemes' resource"
      },{
        "href": `${baseUrl}/collections/${data.format!="pbf"?data.name: data.name.substring(0,data.name.lastIndexOf(":"))}/tiles/{tilingSchemeId}/{level}/{row}/{col}`,
        "rel": "tiles",
        "type": fileFormat[data.format]||"application/vnd.mapbox-vector-tile",
        "title": data.title+" as "+ fileFormat[data.format]+". The link is a URI template where {tilingSchemeId} is one of the schemes listed in the 'tilingSchemes' resource, and {level}/{row}/{col} the tile based on the tiling scheme. "
      }]
    
      
    switch (data.type) {
        case "MBTiles":
            return baseArray;

        case "SQLite":
            return [{
                "href": baseUrl+"/collections/"+data.name+"/items",
                "rel": "item",
                "type": "application/geo+json",
                "title": data.title+" items as application/geo+json"
                },...baseArray]

        default: return [];
    }
    
}

const featureCollection  = async (features) =>{
    return {
        "type": "FeatureCollection",
        "features": features
    }
    
}

module.exports = {
    collections,
    collection,
    featureCollection
};