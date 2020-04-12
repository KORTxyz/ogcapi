const sqlite3 = require('sqlite3');
const path = require('path')

module.exports = (file,group) => new Promise( (resolve, reject)=> {
    const format = row => {
      if(row.extent_min_x != "NULL"){
        return {
          name: row.table_name,
          title: row.table_name,
          group: group,
          file: file,
          type: 'SQLite',
          format: row.geometry_column,
          desc: '',
          bbox: row.row_count>0?[row.extent_min_x,row.extent_min_y,row.extent_max_x,row.extent_max_y].map(number=>Number(number.toFixed(6))):[-180,-90,180,90]
        }
      }
      else return [];
    }
    
    const sql = "SELECT * FROM vector_layers_statistics WHERE row_count>0";
    const db = new sqlite3.Database(file,sqlite3.OPEN_READWRITE, (err=> {if(err) reject(err)}));
    db.all(sql, (err, rows) =>{
      if (err) reject(err);
      else {
        rows = rows.filter(row=>row.row_count>0).map(row=> format(row))
        resolve(rows);
      }
    });  
  });
  