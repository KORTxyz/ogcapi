const sqlite3 = require('sqlite3')

const getTile = (dataset,z,x,y) => {
    return new Promise( (resolve, reject)=> {
        y = (1 << z) - y - 1;
        const sql = `SELECT tile_data FROM tiles WHERE zoom_level=${z} and tile_column=${x} and tile_row=${y}`;
        new sqlite3.Database(dataset.source+".mbtiles", sqlite3.OPEN_READWRITE, (err=> {if(err) reject(err)}))
            .get(sql, (err,row)=>{
                const data = typeof row == "undefined"? null: row.tile_data;
                if (err) reject(err);
                else resolve(data) ;
            });
    })
}

module.exports = {
    getTile,
};
