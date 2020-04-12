const SphericalMercator = require('@mapbox/sphericalmercator')
const merc = new SphericalMercator({size: 256});
const sqlite3 = require('sqlite3')

const geojsonvt = require('geojson-vt')
const vtpbf = require('vt-pbf')

const createFeature = (data,geometryColumn) => {
    const { g, ...properties } = data;
    delete properties[geometryColumn]
    delete properties[geometryColumn.toUpperCase()]

	return {
		"type": "Feature",
		"properties": properties,
		"geometry": JSON.parse(g),
		"id": Object.values(properties)[0]
		}
}

const getGeoJSON = (dataset,query) => {
    const {limit, offset, bbox, f, token, ...options} = query

    const where =  Object.entries(options).map(e=> e[0]+" like '"+ unescape(e[1])+"'").join(" AND ")

    const sql = `SELECT ROWID, *, AsGeoJSON(${dataset.format},6) geojson 
                 FROM  ${dataset.name}
                 WHERE ${where?" "+where:"1=1"}
                 ${bbox? `AND ROWID IN (SELECT ROWID FROM SpatialIndex WHERE f_table_name = '${dataset.name}' and f_geometry_column = '${dataset.format}'  AND search_frame = BuildMbr(${bbox.toString()}) )`:""} 
                 LIMIT ${offset?offset+", ":""} ${limit?limit:10}`;

    const db = new sqlite3.Database(dataset.file , sqlite3.OPEN_READONLY);
    
    return new Promise( (resolve, reject)=> {
        db.loadExtension('./mod_spatialite', (err)=> {
            db.all(sql, (err, rows) =>{

                if (err) reject(err);
                else resolve(rows.map(row=>{
                    delete row[Object.keys(row).find(e=>e.toLowerCase()===dataset.format)]

                    let { geojson, ...properties } = row;
                    return {
                        "id":Object.values(row)[0],
                        "type": "Feature",
                        "properties": properties,
                        "geometry": JSON.parse(geojson)
                    }
                }));
            });
        });
    });
    
};

const getVectorTile = (dataset,z,x,y) => {
    return new Promise( (resolve, reject)=> {
    const bbox = merc.bbox(x, y, z)

    const query = `SELECT *, AsGeoJSON(${dataset.format},6) g FROM ${dataset.name} where intersects(${dataset.name}.${dataset.format},BuildMbr(${bbox.toString()})) AND
                    ROWID IN (SELECT ROWID FROM SpatialIndex WHERE f_table_name = '${dataset.name}' and f_geometry_column = '${dataset.format}' 
                      AND search_frame = BuildMbr(${bbox.toString()}) 	) LIMIT 10000`;

    const db =  new sqlite3.Database(dataset.file, sqlite3.OPEN_READONLY, (err=> {if(err) reject(err)}))
        db.loadExtension('./mod_spatialite', (err)=> {
            if(err) reject(err)
            db.all(query, (err, rows) => {
                if(err) reject(err)
                if(rows && rows.length>0){
                    const geojson = {
                        "type": "FeatureCollection",
                        "features": rows.map(data=> createFeature(data,dataset.format))
                    }         
                    if(geojson.features>10000) resolve()
                    let tileIndex = geojsonvt(geojson,{maxZoom: 20})
                    let tile = tileIndex.getTile(parseInt(z),parseInt(x),parseInt(y))
                    Obj = {};
                    Obj[dataset.name] = tile
                    const pbf =  vtpbf.fromGeojsonVt(Obj, { version: 2 })
                    resolve(Buffer.from(pbf));
                }
                else{
                    resolve();
                }
            });
        });
    });

    
}


module.exports = {
    getGeoJSON,
    getVectorTile,
};
