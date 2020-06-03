const fetch = require('node-fetch');

const getGeoJSON = async (dataset,query,featureID) => {  

    limit = query.limit || 10;
    offset = query.offset ? `&startIndex=${Number(query.offset)}` : '';

    featureID = featureID ? `&featureID=${dataset.name.split(":").slice(-1)+"."+featureID}` : ''
    

    const url = `${dataset.url}?service=wfs${featureID}&version=2.0.0&request=GetFeature&typeNames=${dataset.name}&outputFormat=application/json&count=${limit}${offset}&srsName=EPSG:4326`
    const geojson = await fetch(url).then(res=>res.json())

    return geojson.features;
};

module.exports = {
    getGeoJSON
};
