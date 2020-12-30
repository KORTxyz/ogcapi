const jsonTemplates = require('./collections.model.json');
const uploader = require('huge-uploader-nodejs');
const fs = require("fs/promises");

const getCollections = async query => {
    const { limit, offset, q, ...find } = query;
    let search = [find, {
        $where: function () {
            if (q == undefined || q.length < 3) return true
            else {
                const { _id, bbox, type, file, format, ...rest } = this
                return Object.values(rest).join().toLowerCase().includes(q.toLowerCase())
            }
        }
    }]
    if (q == undefined || q.length < 3) search = [search[0]]
    const datasets = await global.collectionDB.find({ $and: search })
        .sort({ name: 1 }).skip(Number(offset)).limit(Number(limit));
    const response = jsonTemplates.collections(datasets);
    return response;
}

const getCollection = async collectionName => {
    const dataset = await global.collectionDB.findOne({ name: collectionName })
    if (dataset.length == 0) throw "no dataset match"
    const response = await jsonTemplates.collection(dataset);
    return response;
}

const postCollection = async (type, req, res) => {
    console.log("type:", type)
    if (type == 'hugeFile') {
        console.log("typetjeck OK:")

        const tmpDir = './temp';
        const maxFileSize = 10000;
        const maxChunkSize = 1000;

        uploader(req, tmpDir, maxFileSize, maxChunkSize)
            .then(async assembleChunks => {
                res.writeHead(204, 'No Content', { 'Content-Type': 'text/plain' });
                res.end();
                if (assembleChunks) {
                    const config = await assembleChunks()
                    const { name, group } = config.postParams;
                    const file = {
                        basename: name,
                        path: "data/" + group,
                        fullPath: "data/" + group + "/" + name
                    }
                    console.log("file:", file)

                    await fs.stat(file.path).catch(e => fs.mkdir(file.path))

                    await fs.rename(config.filePath, file.fullPath);
                    process.send({ code: 'newCollection', msg: file })
                }
            })
    }

}

const getItems = async (collectionName, query, originalUrl) => {
    const dataset = await global.collectionDB.findOne({ name: collectionName })
    const { limit, offset, ...rest } = query;
    const format = dataset.format.length == 1 ? dataset.format[0] : dataset.format.includes("sqlite") ? "sqlite" : dataset.format[0];

    const features = await require(`./collections.model.${format}`).getGeoJSON(dataset, query)
    const response = await jsonTemplates.featureCollection(features, originalUrl, query);

    return response;
}

const postItems = async (collectionName, geojson) => {
    const err = require('@mapbox/geojsonhint').hint(geojson)
    if (err.length) throw ({ "code": "GEOJSON_ERROR", "description": err[0].message });


    if (!geojson.features) {
        geojson = { "type": "FeatureCollection", "features": [geojson] }
    }

    const dataset = await global.collectionDB.findOne({ name: collectionName })
    const format = dataset.format.length == 1 ? dataset.format[0] : dataset.format.includes("sqlite") ? "sqlite" : dataset.format[0];

    const response = await require(`./collections.model.${format}`).postGeoJSON(dataset, geojson)

    return response;
}

const getItem = async (collectionName, featureID) => {
    const dataset = await global.collectionDB.findOne({ name: collectionName })
    const format = dataset.format.length == 1 ? dataset.format[0] : dataset.format.includes("sqlite") ? "sqlite" : dataset.format[0];

    const features = await require(`./collections.model.${format}`).getGeoJSON(dataset, {}, featureID)
    const response = await jsonTemplates.featureCollection(features);

    return response;
}

const putItem = async (collectionName, featureID, geojson) => {
    const err = require('@mapbox/geojsonhint').hint(geojson)
    if (err.length) throw ({ "code": "GEOJSON_ERROR", "description": err[0].message });

    if (!geojson.features) {
        geojson = { "type": "FeatureCollection", "features": [geojson] }
    }

    const dataset = await global.collectionDB.findOne({ name: collectionName })
    const format = dataset.format.length == 1 ? dataset.format[0] : dataset.format.includes("sqlite") ? "sqlite" : dataset.format[0];

    const response = await require(`./collections.model.${format}`).putGeoJSON(dataset, featureID, geojson)

    return response;
}

const deleteItem = async (collectionName, featureID) => {
    const dataset = await global.collectionDB.findOne({ name: collectionName })
    const format = dataset.format.length == 1 ? dataset.format[0] : dataset.format.includes("sqlite") ? "sqlite" : dataset.format[0];

    const response = await require(`./collections.model.${dataset.type}`).deleteGeoJSON(dataset, featureID)

    return response;
}

const getTile = async (collectionName, tileMatrixSetId, z, x, y) => {

    const dataset = await global.collectionDB.findOne({ name: collectionName })
    const format = dataset.format.length == 1 ? dataset.format[0] : dataset.format.includes("mbtiles") ? "mbtiles" : dataset.format[0];

    const tile = await require(`./collections.model.${format}`).getTile(dataset, z, x, y)

    return tile;
}

const getDownload = async (collectionName, format) => {
    const dataset = await global.collectionDB.findOne({ name: collectionName })

    return dataset.source + "." + format;
}


module.exports = {
    getCollections,
    getCollection,
    postCollection,
    getItems,
    postItems,
    getItem,
    putItem,
    deleteItem,
    getTile,
    getDownload
};