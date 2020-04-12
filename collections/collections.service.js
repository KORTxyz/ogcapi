const jsonTemplates = require('./collections.model.json');

const getCollections = async (baseUrl, query) => {
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
    
    const response = jsonTemplates.collections(baseUrl,datasets);
    return response
}

const getCollection = async (baseUrl, collectionName) => {
    const dataset = await global.collectionDB.findOne({name:collectionName})
    if(dataset.length==0) throw "no dataset match"
    const response = await jsonTemplates.collection(baseUrl,dataset);
    return response
}


const getItems = async (collectionName, query) => {
    const dataset = await global.collectionDB.findOne({name:collectionName})
    const {limit,offset, q, ...find} = query;
    const features = await require(`./collections.model.${dataset.type}`).getGeoJSON(dataset,query)
    const response = await jsonTemplates.featureCollection(features);

    return response;
}


module.exports = {
    getCollections,
    getCollection,
    getItems
};