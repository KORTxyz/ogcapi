const express = require('express');
const path = require('path')
const router = express.Router();
const asyncHandler = require('express-async-handler')

const authorize = require('../util/authorize.js')

module.exports = router;



const getIndex = async (req, res, next) => {
	const format = req.query.f || 'json';
    if(format == 'json'){
        res.header("Content-Type",'application/json');
        res.json(landingpage());
    }
    else{
        res.header("Content-Type",'application/json');
        res.json({"code": "unavailable", "description": "not  implementet yet"});
    }
}

router.get('/', authorize(), asyncHandler(getIndex) );


const landingpage = _ =>{
    const title = process.env.TITLE||'KORTxyz ogcapi';
    const desc = process.env.DESC||"Test implementation for KORTxyz ogcapi";

    return {
        "title": title,
        "description": desc,
        "links": [
          { "href": `${global.baseUrl}`,
            "rel": "self", "type": "application/json", "title": "this document" },
          { "href": `${global.baseUrl}?f=html`,
            "rel": "alternate", "type": "text/html", "title": "this document in html format" },
          { "href": `${global.baseUrl}/api`,
            "rel": "service-desc", "type": "application/vnd.oai.openapi+json;version=3.0", "title": "the API definition" },
          { "href": `${global.baseUrl}/api?f=html`,
            "rel": "service-doc", "type": "text/html", "title": "the API documentation" },
          { "href": `${global.baseUrl}/conformance`,
            "rel": "conformance", "type": "application/json", "title": "OGC API conformance classes implemented by this server" },
          { "href": `${global.baseUrl}/collections`,
            "rel": "data", "type": "application/json", "title": "Information about the feature collections" },
          { "href": `${global.baseUrl}/tilematrixsets`,
            "rel": "tileMatrixSet", "type": "application/json", "title": "Information about the tilematrixsets" },
          { "href": `${global.baseUrl}/processes`,
            "rel": "service", "type": "application/json", "title": "Geoprocesses available by this server" }
          ]
    }
}