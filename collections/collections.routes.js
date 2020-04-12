const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')

const authorize = require('../util/authorize.js')
const collectionscontroller = require('./collections.controller');

module.exports = router;

router.get('/', authorize(), asyncHandler(collectionscontroller.getCollections) );
//router.post('/', authorize(), collectionscontroller.postCollection );

router.get('/:collectionName', authorize(), asyncHandler(collectionscontroller.getCollection) );

router.get('/:collectionName/items/', authorize(), asyncHandler(collectionscontroller.getItems) );
//router.get('/:collectionName/items/:featureId', authorize(), collectionscontroller.getItem );

//router.get('/:collectionName/tiles', authorize(), (req, res) =>{ res.json({ "tilingSchemes": [ "GoogleMapsCompatible" ] }) } );
//router.get('/:collectionName/tiles/GoogleMapsCompatible',authorize(), (req, res) => res.sendFile('GoogleMapsCompatible.json',{ root: __dirname }) );

//router.get('/:collectionName/tiles/:tilingSchemes/:z/:x/:y', authorize(), collectionscontroller.getTile);
