const tiletype = require('@mapbox/tiletype')
const collectionsService = require('./collections.service');


const getCollections = async (req, res, next) => {
	const { f, ...query } = req.query;
	const format = f || req.baseUrl.split(".")[1]

	if (format === "json") {
		collectionsService.getCollections(query)
			.then(msg => res.json(msg))
			.catch(next)
	}
	else {
		res.sendFile('collections.html', { root: "views/" });
	}

}

const postCollection = async (req, res, next) => {
	if(req.header('uploader-file-id')){
		collectionsService.postCollection('hugeFile',req,res).catch(next);
	}
}


const getCollection = async (req, res, next) => {
	const { collectionName } = req.params;

	collectionsService.getCollection(collectionName)
		.then(msg => res.json(msg))
		.catch(next)
}

const patchCollection = async (req, res, next) => {
	const { collectionName } = req.params;

	collectionsService.patchCollection(collectionName,req.body)
		.then(msg => res.json(msg))
		.catch(next)
}

const deleteCollection = async (req, res, next) => {
	const { collectionName } = req.params;

	collectionsService.deleteCollection(collectionName)
		.then(msg => res.json(msg))
		.catch(next)
}




const getItems = async (req, res, next) => {
	const { collectionName } = req.params;
	const { f, ...query } = req.query;
	const originalUrl = req.originalUrl

	collectionsService.getItems(collectionName, query, originalUrl)
		.then(msg => res.json(msg))
		.catch(next)

}


const postItems = async (req, res) => {
	const { collectionName } = req.params;
	const geojson = req.body;

	collectionsService.postItems(collectionName, geojson)
		.then(msg => res.json(msg))
		.catch(err => res.status(400).json(err))
}


const getItem = async (req, res) => {
	const { collectionName, featureId } = req.params;

	collectionsService.getItem(collectionName, featureId)
		.then(msg => res.json(msg))
		.catch(err => res.status(400).json(err))
}


const putItem = async (req, res) => {
	const { collectionName, featureId } = req.params;
	const geojson = req.body;

	collectionsService.putItem(collectionName, featureId, geojson)
		.then(msg => res.json(msg))
		.catch(err => res.status(400).json(err))
}


const deleteItem = async (req, res) => {
	const { collectionName, featureId } = req.params;

	collectionsService.deleteItem(collectionName, featureId)
		.then(msg => res.json(msg))
		.catch(err => res.status(400).json(err))
}


const getTile = async (req, res) => {
	const { collectionName, tileMatrixSetId, z, x, y } = req.params;

	collectionsService.getTile(collectionName, tileMatrixSetId, z, x, y)
		.then(tile => {
			if (tile) {
				res.writeHead(200, tiletype.headers(tile))
				res.end(tile)
			}
			else {
				res.status(404).end()
			}
		})
		.catch(err => res.status(400).json(err))
}


const getDownload = async (req, res) => {
	const { collectionName } = req.params;
	const { f, ...query } = req.query;

	collectionsService.getDownload(collectionName, f)
		.then(file => res.download(file))
		.catch(err => res.status(400).json(err))
}


module.exports = {
	getCollections,
	postCollection,
	getCollection,
	patchCollection,
	deleteCollection,
	getItems,
	postItems,
	getItem,
	putItem,
	deleteItem,
	getTile,
	getDownload
};