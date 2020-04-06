const nedb = require('./collections.model.nedb');
const jsonTemplates = require('./collections.model.json');

const getCollections = async (baseUrl, format, query) => {
    const {limit,offset, q, ...find} = query;

    const datasets = [{
        "links": [],
        "desc": "The monthly mean is the average of daily mean values for a given month.",
        "title": "Monthly Mean of Water Level or Flow",
        "bbox": [-142,52,-52,84],
        "name": "hydrometric-monthly-mean",
    }]
    
    const response = jsonTemplates.collections(baseUrl,format,datasets);
   
    return response
    
}

module.exports = {
    getCollections
};