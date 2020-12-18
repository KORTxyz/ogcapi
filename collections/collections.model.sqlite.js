const SphericalMercator = require('@mapbox/sphericalmercator')
const merc = new SphericalMercator({ size: 256 });
const sqlite3 = require('sqlite3')

const geojsonvt = require('geojson-vt')
const vtpbf = require('vt-pbf')

const createFeature = (data, geomCol) => {
    let { geom, ...properties } = data;
    const lowerCaseProperties =  Object.fromEntries(
        Object.entries(properties).map(([k, v]) => [k.toLowerCase(), v])
      );

    delete lowerCaseProperties[geomCol.toLowerCase()]

    return {
        "type": "Feature",
        "properties": lowerCaseProperties,
        "geometry": JSON.parse(geom),
        "id": Object.values(lowerCaseProperties)[0]
    }
}

const getGeoJSON = (dataset, query, featureID) => {
    if (featureID) query = { ROWID: featureID }

    const { limit, offset, bbox, f, token, ...options } = query

    const [tableName] = dataset.name.split(":").slice(-1)
    const where = Object.entries(options).map(e => e[0] + " = '" + unescape(e[1]) + "'").join(" AND ")
    const sql = `SELECT ROWID, *, AsGeoJSON(${dataset.geomCol},6) geojson 
                 FROM  ${tableName}
                 WHERE ${where ? " " + where : "1=1"}
                 ${bbox ? `AND ROWID IN (SELECT ROWID FROM SpatialIndex WHERE f_table_name = '${tableName}' and f_geometry_column = '${dataset.geomCol}'  AND search_frame = BuildMbr(${bbox.toString()}) )` : ""} 
                 LIMIT ${offset ? offset + ", " : ""} ${limit ? limit : 10}`;
    const db = new sqlite3.cached.Database(dataset.source + ".sqlite", sqlite3.OPEN_READWRITE);

    return new Promise((resolve, reject) => {
        db.loadExtension('./mod_spatialite', (err) => {
            db.all(sql, (err, rows) => {

                if (err) reject(err);
                else resolve(rows.map(row => {
                    delete row[Object.keys(row).find(e => e.toLowerCase() === dataset.geomCol)]

                    let { geojson, ...properties } = row;
                    return {
                        "id": Object.values(row)[0],
                        "type": "Feature",
                        "properties": properties,
                        "geometry": JSON.parse(geojson)
                    }
                }));
            });
        });
    });

};

const postGeoJSON = (dataset, geojson) => {
    const [tableName] = dataset.name.split(":").slice(-1)

    const values = geojson.features.map(feature => {
        const values = "'" + Object.values(feature.properties).join("','") + "'";
        const geom = JSON.stringify(feature.geometry);
        return `(${values},SetSRID(GeomFromGeoJSON('${geom}'),4326))`
    })

    const keys = Object.keys(geojson.features[0].properties).join();
    const sql = `INSERT INTO ${tableName} (${keys},${dataset.geomCol})
                VALUES ${values.join(",")}`;
    const db = new sqlite3.cached.Database(dataset.file + ".sqlite", sqlite3.OPEN_READWRITE);

    return new Promise((resolve, reject) => {
        db.loadExtension('./mod_spatialite', err => {
            db.run(sql, (err, response) => {
                if (err) reject({ "code": err.code, "description": err.message });
                else resolve({ "code": "success", "data": geojson });
            });
        });
    });

};

const putGeoJSON = (dataset, id, geojson) => {
    const [tableName] = dataset.name.split(":").slice(-1)


    const values = geojson.features.map(feature => {
        const values = "'" + Object.values(feature.properties).join("','") + "'";
        const geom = JSON.stringify(feature.geometry);
        return `(${id},${values},SetSRID(GeomFromGeoJSON('${geom}'),4326))`
    })


    const keys = Object.keys(geojson.features[0].properties).join();
    const sql = `REPLACE INTO ${tableName} (ROWID,${keys},${dataset.geomCol})
                 VALUES ${values.join(",")}`;

    const db = new sqlite3.cached.Database(dataset.source + ".sqlite", sqlite3.OPEN_READWRITE);

    return new Promise((resolve, reject) => {
        db.loadExtension('./mod_spatialite', err => {
            db.run(sql, (err, response) => {
                if (err) reject({ "code": err.code, "description": err.message });
                else resolve(response);
            });
        });
    });

};

const deleteGeoJSON = (dataset, id) => {
    const [tableName] = dataset.name.split(":").slice(-1)
    const sql = `DELETE FROM ${tableName}
                 WHERE ROWID=${id};`;

    const db = new sqlite3.cached.Database(dataset.source + ".sqlite", sqlite3.OPEN_READWRITE);
    return new Promise((resolve, reject) => {
        db.loadExtension('./mod_spatialite', err => {
            db.run(sql, (err, response) => {
                if (err) reject({ "code": err.code, "description": err.message });
                else resolve(response);
            });
        });
    });

};

const getTile = (dataset, z, x, y) => {
    return new Promise((resolve, reject) => {
        if (z < 5) resolve(); // <- remove if needed
        const bbox = merc.bbox(x, y, z)
        const [tableName] = dataset.name.split(":").slice(-1)
        const query = `SELECT *, AsGeoJSON(${dataset.geomCol},6) geom FROM ${tableName} where intersects(${tableName}.${dataset.geomCol},BuildMbr(${bbox.toString()})) AND
                    ROWID IN (SELECT ROWID FROM SpatialIndex WHERE f_table_name = '${tableName}' and f_geometry_column = '${dataset.geomCol}' 
                      AND search_frame = BuildMbr(${bbox.toString()}) 	) LIMIT 1000`;

        const db = new sqlite3.cached.Database(dataset.source + ".sqlite", sqlite3.OPEN_READWRITE, (err => { if (err) reject(err) }))
        db.loadExtension('./mod_spatialite', (err) => {
            if (err) reject(err)
            db.all(query, (err, rows) => {
                if (err) reject(err)
                if (rows && rows.length > 0) {
                    const geojson = {
                        "type": "FeatureCollection",
                        "features": rows.map(data => createFeature(data, dataset.geomCol))
                    }
                    if (geojson.features > 1000) resolve()
                    let tileIndex = geojsonvt(geojson, { maxZoom: 20 })
                    let tile = tileIndex.getTile(parseInt(z), parseInt(x), parseInt(y))
                    Obj = {};
                    Obj[tableName] = tile
                    const pbf = vtpbf.fromGeojsonVt(Obj, { version: 2 })
                    resolve(Buffer.from(pbf));
                }
                else {
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
