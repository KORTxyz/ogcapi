require('dotenv');

const gdal = require("gdal-next")
const proj4 = require('proj4')
const readdirp = require('readdirp');
const path = require('path');

const dotenvAbsolutePath = path.join(__dirname, '../.env');

  const dotenv = require('dotenv').config({
    path: dotenvAbsolutePath
  });
  if (dotenv.error) {
    throw dotenv.error;
  }

  (async () => {
    for await (const v of readdirp(process.env.DATA_DIR)) { // iterates over the arr
        let ds
        try{
          ds = gdal.open(v.fullPath) || null;
        }
        catch(err){
          
        }
        if(ds){
          var driver = ds.driver;
          var driver_metadata = driver.getMetadata();
          console.log(ds.driver.description)
/*
          if (driver_metadata['DCAP_RASTER'] === 'YES') {
            // raster dimensions
            var size = ds.rasterSize;
            // spatial reference
            //console.log(ds.srs.toPrettyWKT());
            
            // geotransform
            var geotransform = ds.geoTransform;
            var array_orig = [
                [geotransform[0] + size.y * geotransform[2], geotransform[3] + size.y * geotransform[5]],
                [geotransform[0] + size.x * geotransform[1], geotransform[3] + size.x * geotransform[4]]
              ]
              .map(point=>proj4(ds.srs.toProj4(),'WGS84',point))
              .flat()
              .map(num=>Math.round((num + Number.EPSILON) * 1000000) / 1000000)
            console.log(
              ds.bands.get(1).pixels.get(size.x/4,size.y/4) //test af valueExtraction fra Rasterkilder
            )
            console.log(v.basename,array_orig)
          }
          else if(driver_metadata['DCAP_VECTOR'] === 'YES'){
            ds.layers.forEach(layer=>{
              console.log(layer)
              if(layer.srs){
                console.log(layer.srs.toProj4())
                console.log(layer.getExtent())
              }

            })
          }

          */
        }

  }
  })();