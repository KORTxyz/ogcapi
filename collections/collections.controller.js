const tiletype = require('@mapbox/tiletype')

const collectionsService = require('./collections.service');



const getCollections = async (req, res, next) => {
	const baseUrl = `${req.protocol}://${req.headers.host}`;
	let  {f, ...query} = req.query;
	const format = f ||'json';

	collectionsService
	.getCollections(baseUrl,format,query)
	.then(msg => {
		res.json(msg)
	})
	.catch(next)

}

const getCollection = async (req, res, next) => {
	const baseUrl = `${req.protocol}://${req.headers.host}`;
	const collectionName = req.params.collectionName;

	collectionsService.getCollection(baseUrl,collectionName)
		.then(msg => res.json(msg) )
		.catch(next)
}

const postCollection = async (req, res) => {
	collectionsService.createCollection(req)
		.then(msg => res.json(msg) )
		.catch(err => res.status(400).json(err) )
}

const getItems = async (req, res, next) => {
	const collectionName = req.params.collectionName;
	let  {f, ...query} = req.query;
	const format = f ||'json';

	collectionsService.getItems(collectionName,query)
		.then(msg => res.json(msg))
		.catch(next)

}

const getItem = async (req, res) => {
	collectionsService.getItem(req)
	.then(msg => res.json(msg) )
	.catch(err => res.status(400).json(err) )
}



const getTile = async (req, res) => {
	collectionsService.getTile(req)
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

module.exports = {
    getCollections,
    postCollection,
    getCollection,
    getItems,
    getItem,
    getTile,
};