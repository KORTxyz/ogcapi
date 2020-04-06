const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')

const authorize = require('../util/authorize.js')
const collectionscontroller = require('./collections.controller');

module.exports = router;


router.get('/', authorize(), asyncHandler(collectionscontroller.getCollections) );
//router.post('/', authorize(), collectionscontroller.postCollection );

//router.get('/:collectionId', authorize(), collectionscontroller.getCollection );

//router.get('/:collectionId/items/', authorize(), collectionscontroller.getItems );
//router.get('/:collectionId/items/:featureId', authorize(), collectionscontroller.getItem );

//router.get('/:collectionId/tiles', authorize(), (req, res) =>{ res.json({ "tilingSchemes": [ "GoogleMapsCompatible" ] }) } );
//router.get('/:collectionId/tiles/GoogleMapsCompatible',authorize(), (req, res) => res.sendFile('GoogleMapsCompatible.json',{ root: __dirname }) );

//router.get('/:collectionId/tiles/:tilingSchemes/:z/:x/:y', authorize(), collectionscontroller.getTile);
