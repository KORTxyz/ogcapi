const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')

const authorize = require('../util/authorize.js')

module.exports = router;

const getTileMatrixs = async (req, res, next) => {
  res.header("Content-Type", 'application/json');
  res.json(tilingSchemes());
}

const getTileMatrix = async (req, res, next) => {
  const tileMatrix = req.params.TilingScheme;
  res.header("Content-Type", 'application/json');
  res.sendFile(path.join(__dirname, `${tileMatrix}.json`));
}

router.get('/', authorize(), asyncHandler(getTileMatrixs));
router.get('/:TilingScheme', authorize(), asyncHandler(getTileMatrix));


const tilingSchemes = _ => {
  return {
    "tilingSchemes": [
      {
        "identifier": "default",
        "links": [
          {
            "rel": "TilingScheme",
            "type": "application/json",
            "title": "Google Maps Tiling Scheme",
            "href": `${global.baseUrl}/tilingschemes/default`
          }
        ]
      }
    ]
  }

}