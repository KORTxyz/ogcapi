const jsonTemplates = require('./collections.model.json');

const getCollections = async query => {
    const {limit,offset, q, ...find} = query;
    let search = [find,{$where: function() {
            if(q == undefined || q.length<3) return true
            else{
                const {_id, bbox,type,file,format, ...rest} = this
                return Object.values(rest).join().toLowerCase().includes(q.toLowerCase()) 
            }
        }
    }]
    if(q == undefined || q.length<3) search = [search[0]]

    const datasets = await global.collectionDB.find({$and: search})
            .sort({name:1}).skip(Number(offset)).limit(Number(limit));
    const response = jsonTemplates.collections(datasets);
    return response
}

const getCollection = async collectionName => {
    const dataset = await global.collectionDB.findOne({name:collectionName})
    if(dataset.length==0) throw "no dataset match"
    const response = await jsonTemplates.collection(dataset);
    return response
}


const getItems = async (collectionName, query, originalUrl) => {
    const dataset = await global.collectionDB.findOne({name:collectionName})
    const {limit,offset, ...find} = query;
    const features = await require(`./collections.model.${dataset.type}`).getGeoJSON(dataset,query)
    const response = await jsonTemplates.featureCollection(features,originalUrl,query);

    return response;
}

const postItems = async (collectionName, geojson) => {
    require('geojson-assert')(geojson)

    if(!geojson.features){
        geojson = {"type": "FeatureCollection","features": [geojson] }
    }

    const dataset = await global.collectionDB.findOne({name:collectionName})
    const response = await require(`./collections.model.${dataset.type}`).postGeoJSON(dataset,geojson)

    return response;
}

const getItem = async (collectionName, featureID) => {
    const dataset = await global.collectionDB.findOne({name:collectionName})
    const query = {ROWID:featureID}

    const features = await require(`./collections.model.${dataset.type}`).getGeoJSON(dataset,query)
    const response = await jsonTemplates.featureCollection(features);

    return response;
}

const putItem = async (collectionName, featureID, geojson) => {
    require('geojson-assert')(geojson)

    if(!geojson.features){
        geojson = {"type": "FeatureCollection","features": [geojson] }
    }

    const dataset = await global.collectionDB.findOne({name:collectionName})
    const response = await require(`./collections.model.${dataset.type}`).putGeoJSON(dataset,featureID,geojson)

    return response;
}

const deleteItem = async (collectionName, featureID) => {
    const dataset = await global.collectionDB.findOne({name:collectionName})
    const response = await require(`./collections.model.${dataset.type}`).deleteGeoJSON(dataset,featureID)

    return response;
}

const getTile = async (collectionName, tileMatrixSetId, z, x, y) => {
    const dataset = await global.collectionDB.findOne({name:collectionName})

    const tile = await require(`./collections.model.${dataset.type}`).getTile(dataset,z, x, y)
    
    return tile;
}

const getDownload = async (collectionName) => {
    const dataset = await global.collectionDB.findOne({name:collectionName})

    return dataset.file;
}


module.exports = {
    getCollections,
    getCollection,
    getItems,
    postItems,
    getItem,
    putItem,
    deleteItem,
    getTile,
    getDownload
};