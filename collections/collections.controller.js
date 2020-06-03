const tiletype = require('@mapbox/tiletype')
const collectionsService = require('./collections.service');


const getCollections = async (req, res, next) => {
	const  {f, ...query} = req.query;

	collectionsService.getCollections(query)
		.then(msg => res.json(msg))
		.catch(next)
}


const getCollection = async (req, res, next) => {
	const {collectionName} = req.params;

	collectionsService.getCollection(collectionName)
		.then(msg => res.json(msg))
		.catch(next)
}


const postCollection = async (req, res, next) => {
	const files = req.files
	const json = JSON.parse(req.body.json)

	collectionsService.postCollection(json, files)
		.then(msg => res.json(msg) )
		.catch(err => res.status(400).json(err) )
}


const getItems = async (req, res, next) => {
	const {collectionName} = req.params;
	const {f, ...query} = req.query;
	const originalUrl = req.originalUrl

	collectionsService.getItems(collectionName,query,originalUrl)
		.then(msg => res.json(msg))
		.catch(next)

}


const postItems = async (req, res) => {
	const {collectionName} = req.params;
	const geojson = req.body;

	collectionsService.postItems(collectionName,geojson)
		.then(msg => res.json(msg) )
		.catch(err => res.status(400).json(err) )
}


const getItem = async (req, res) => {
	const {collectionName, featureId} = req.params;

	collectionsService.getItem(collectionName,featureId)
		.then(msg => res.json(msg) )
		.catch(err => res.status(400).json(err) )
}


const putItem = async (req, res) => {
	const {collectionName, featureId} = req.params;
	const geojson = req.body;

	collectionsService.putItem(collectionName,featureId,geojson)
		.then(msg => res.json(msg) )
		.catch(err => res.status(400).json(err) )
}


const deleteItem = async (req, res) => {
	const {collectionName, featureId} = req.params;

	collectionsService.deleteItem(collectionName,featureId)
		.then(msg => res.json(msg) )
		.catch(err => res.status(400).json(err) )
}


const getTile = async (req, res) => {
	const {collectionName, tileMatrixSetId, z, x, y} = req.params;

	collectionsService.getTile(collectionName, tileMatrixSetId, z, x, y)
		.then(tile =>{
			if(tile){
				res.writeHead(200, tiletype.headers(tile))
				res.end(tile)
			}
			else{
				res.status(404).end()
			}
		})
		.catch(err => res.status(400).json(err) )
}


const getDownload = async (req, res) => {
	const {collectionName} = req.params;

	collectionsService.getDownload(collectionName)
		.then(file => res.download(file) )
		.catch(err => res.status(400).json(err) )
}


module.exports = {
    getCollections,
    postCollection,
    getCollection,
    getItems,
	postItems,
	getItem,
	putItem,
	deleteItem,
	getTile,
	getDownload
};