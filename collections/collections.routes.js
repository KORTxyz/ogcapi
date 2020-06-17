const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'temp/'),
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({storage: storage});
const cpUpload = upload.array('file', 12);

const authorize = require('../util/authorize.js')
const collectionscontroller = require('./collections.controller');

module.exports = router;




router.get('/', authorize(), asyncHandler(collectionscontroller.getCollections) );
router.post('/', authorize(), cpUpload, asyncHandler(collectionscontroller.postCollection) );

router.get('/:collectionName', authorize(), asyncHandler(collectionscontroller.getCollection) );

router.get('/:collectionName/items', authorize(), asyncHandler(collectionscontroller.getItems) );
router.post('/:collectionName/items', authorize(), asyncHandler(collectionscontroller.postItems) );

router.get('/:collectionName/download', authorize(), asyncHandler(collectionscontroller.getDownload) );

router.get('/:collectionName/items/:featureId', authorize(), asyncHandler(collectionscontroller.getItem) );
router.put('/:collectionName/items/:featureId', authorize(), asyncHandler(collectionscontroller.putItem) );
router.delete('/:collectionName/items/:featureId', authorize(), asyncHandler(collectionscontroller.deleteItem) );

//router.get('/:collectionName/queryables', authorize(), asyncHandler(collectionscontroller.getQueryables) );

router.get('/:collectionName/tiles', authorize(), (req, res) =>{ res.json({ "TileMatrixSets": [ "GoogleMapsCompatible" ] }) } );

router.get('/:collectionName/tiles/:tileMatrixSetId/:z/:x/:y', authorize(), collectionscontroller.getTile);
