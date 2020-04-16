const path = require('path')

const collections = datasets => {
    return {
        "links": [
            {
                "href": `${global.baseUrl}/collections?f=json`,
                "rel": 'self',
                "type": "application/json",
                "title": "This document as JSON"
            },
            {
                "href": `${global.baseUrl}/collections?f=html`,
                "rel": 'alternate',
                "type": "text/html",
                "title": "This document as HTML"
            }
        ],
        "collections": datasets.map(dataset => collection(dataset))
    }
}

const collection = data => {

    return {
        "name": data.name,
        "title": data.title || '',
        "group": data.group || '',
        "description": data.desc || '',
        "extent": {
            "spatial": data.bbox
        },
        "links": links(data)
    }
}

const links = data => {
    const [name] = data.name

    const mimeTypes = {
        "png": "image/png",
        "jpg": "image/jpeg",
        "webp": "image/webp",
        "pbf": "application/vnd.mapbox-vector-tile"
    }
    const self = [{
        "href": `${global.baseUrl}/collections/${data.name}?f=json`,
        "rel": "self",
        "type": "application/json",
        "title": "This document as JSON"
    },
    {
        "href": `${global.baseUrl}/collections/${data.name}?f=html`,
        "rel": "alternate",
        "type": "text/html",
        "title": "This document as HTML"
    }]
    const item = {
        "href": `${global.baseUrl}/collections/${data.name}/items`,
        "rel": "item",
        "type": "application/geo+json",
        "title": data.title + " items as application/geo+json"
    }

    const tiles = {
        "href": `${global.baseUrl}/collections/${data.name}/tiles/{tileMatrixSetId}/{tileMatrixId}/{tileRow}/{tileCol}`,
        "rel": "tiles",
        "type": mimeTypes[data.format] || "application/vnd.mapbox-vector-tile",
        "title": data.title + " as " + mimeTypes[data.format] + ". The link is a URI template where {tileMatrixSetId} is one of the schemes listed in the 'tileMatrixSet' resource, and {tileMatrixId}/{tileRow}/{tileCol} the tile based on the tiling scheme. "
    }

    const tileMatrixSet = {
        "href": `${global.baseUrl}/collections/${data.name}/tiles`,
        "rel": "tileMatrixSet",
        "type": "application/json",
        "title": data.title + "'s associated tiling schemes."
    };

    const download = {
        "href": `${global.baseUrl}/collections/${data.name}/download`,
        "rel": "download",
        "type": path.extname(data.file),
        "title": `Download dataset behind ${data.title}.`
    }

    switch (data.type) {
        case "mbtiles":
            return [
                ...self,
                download,
                tileMatrixSet,
                tiles
            ];

        case "sqlite":
            return [
                ...self,
                download,
                item,
                tileMatrixSet,
                tiles
            ];

        default: return [];
    }

}

const featureCollection = async (features, originalUrl, query) => {
    return {
        "type": "FeatureCollection",
        "features": features,
        "links": featuresLinks(features, originalUrl, query)
    }

}

const featuresLinks = (features, originalUrl, query,) => {
    let {limit, offset, ...options} = query

    limit = limit || 10;
    offset = offset ? offset : limit;
    offset = (offset - limit) < 0 ? limit : offset;

    queryParams = Object.entries(options).map(e=>`${e[0]}=${e[1]}`)
    queryParams = queryParams.length>0?queryParams.join("&")+"&":"";

    const links =
        features.length ?
            [{
                "href": `${global.baseUrl}${originalUrl}`,
                "rel": "self",
                "type": "application/geo+json",
                "title": "This document"
            }, {
                "href": `${global.baseUrl}${originalUrl.split("?")[0]}?${queryParams}limit=${limit}&offset=${+offset + (+limit)}`,
                "rel": "next",
                "type": "application/geo+json",
                "title": "Next results"
            }, {
                "href": `${global.baseUrl}${originalUrl.split("?")[0]}?${queryParams}limit=${limit}&offset=${offset - limit}`,
                "rel": "last",
                "type": "application/geo+json",
                "title": "Last results"
            }] :
            [{
                "href": `${global.baseUrl}${originalUrl}`,
                "rel": "self",
                "type": "application/geo+json",
                "title": "This document"
            }];
    return links
}

module.exports = {
    collections,
    collection,
    featureCollection
};