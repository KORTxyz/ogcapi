const SphericalMercator = require('@mapbox/sphericalmercator')
const merc = new SphericalMercator({size: 256});
const sqlite3 = require('sqlite3')

const geojsonvt = require('geojson-vt')
const vtpbf = require('vt-pbf')

const createFeature = (data,geometryColumn) => {
    const { geom, ...properties } = data;
    delete properties[geometryColumn]
    delete properties[geometryColumn.toUpperCase()]

	return {
		"type": "Feature",
		"properties": properties,
		"geometry": geom,
		"id": Object.values(properties)[0]
		}
}

const getGeoJSON = (dataset,query) => {
    const {limit, offset, bbox, f, token, ...options} = query

    const [tableName] = dataset.name.split(":").slice(-1)
    const where =  Object.entries(options).map(e=> e[0]+" like '"+ unescape(e[1])+"'").join(" AND ")
    
    const sql = `SELECT ROWID, *, AsGeoJSON(${dataset.format},6) geojson 
                 FROM  ${tableName}
                 WHERE ${where?" "+where:"1=1"}
                 ${bbox? `AND ROWID IN (SELECT ROWID FROM SpatialIndex WHERE f_table_name = '${tableName}' and f_geometry_column = '${dataset.format}'  AND search_frame = BuildMbr(${bbox.toString()}) )`:""} 
                 LIMIT ${offset?offset+", ":""} ${limit?limit:10}`;

    const db = new sqlite3.cached.Database(dataset.file , sqlite3.OPEN_READWRITE);
    
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

const postGeoJSON = (dataset,geojson) => {
    const [tableName] = dataset.name.split(":").slice(-1)

    const values = geojson.features.map(feature => {
        const values = "'" + Object.values(feature.properties).join("','") + "'" ;
        const geom = JSON.stringify(feature.geometry);
        return `(${values},SetSRID(GeomFromGeoJSON('${geom}'),4326))`
    })
      
    const keys = Object.keys(geojson.features[0].properties).join();
    const sql = `INSERT INTO ${tableName} (${keys},GEOMETRY)
                VALUES ${values.join(",")}`;
    const db = new sqlite3.cached.Database(dataset.file , sqlite3.OPEN_READWRITE);
    
    return new Promise( (resolve, reject)=> {
        db.loadExtension('./mod_spatialite', err=> {
            db.run(sql, (err, response) =>{
                if (err) reject({"code": err.code,"description": err.message});
                else resolve(response);
            });
        });
    });
    
};

const putGeoJSON = (dataset,id,geojson) => {

    
    const [tableName] = dataset.name.split(":").slice(-1)


    const values = geojson.features.map(feature => {
        const values = "'" + Object.values(feature.properties).join("','") + "'" ;
        const geom = JSON.stringify(feature.geometry);
        return `(${id},${values},SetSRID(GeomFromGeoJSON('${geom}'),4326))`
    })


    const keys = Object.keys(geojson.features[0].properties).join();
    const sql = `REPLACE INTO ${tableName} (ROWID,${keys},GEOMETRY)
                 VALUES ${values.join(",")}`;
    console.log(sql)

    const db = new sqlite3.cached.Database(dataset.file, sqlite3.OPEN_READWRITE);
    
    return new Promise( (resolve, reject)=> {
        db.loadExtension('./mod_spatialite', err=> {
            db.run(sql, (err, response) =>{
                if (err) reject({"code": err.code,"description": err.message});
                else resolve(response);
            });
        });
    });
    
};

const deleteGeoJSON = (dataset,id) => {
    const [tableName] = dataset.name.split(":").slice(-1)
    const sql = `DELETE FROM ${tableName}
                 WHERE ROWID=${id};`;

    const db = new sqlite3.cached.Database(dataset.file , sqlite3.OPEN_READWRITE);
    return new Promise( (resolve, reject)=> {
        db.loadExtension('./mod_spatialite', err=> {
            db.run(sql, (err, response) =>{
                if (err) reject({"code": err.code,"description": err.message});
                else resolve(response);
            });
        });
    });
    
};

const getTile = (dataset,z,x,y) => {
    return new Promise( (resolve, reject)=> {
    const bbox = merc.bbox(x, y, z)

    const [tableName] = dataset.name.split(":").slice(-1)
    const query = `SELECT *, AsGeoJSON(${dataset.format},6) g FROM ${tableName} where intersects(${tableName}.${dataset.format},BuildMbr(${bbox.toString()})) AND
                    ROWID IN (SELECT ROWID FROM SpatialIndex WHERE f_table_name = '${tableName}' and f_geometry_column = '${dataset.format}' 
                      AND search_frame = BuildMbr(${bbox.toString()}) 	) LIMIT 10000`;

    const db =  new sqlite3.cached.Database(dataset.file, sqlite3.OPEN_READWRITE, (err=> {if(err) reject(err)}))
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
                    Obj[tableName] = tile
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
    postGeoJSON,
    putGeoJSON,
    deleteGeoJSON,
    getTile,
};
