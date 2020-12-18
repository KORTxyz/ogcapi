const sqlite3 = require('sqlite3');
const path = require('path')

module.exports = (file,group) => new Promise( (resolve, reject)=> {
    const format = row => {
      if(row.extent_min_x != "NULL"){
        return {
          name: `${path.basename(file,'.sqlite')}:${row.table_name}`,
          title: row.table_name,
          group: group,
          source: file.slice(0,-7),
          format: ['sqlite'],
          geomCol: row.geometry_column,
          desc: '',
          bbox: row.row_count>0?[row.extent_min_x,row.extent_min_y,row.extent_max_x,row.extent_max_y].map(number=>Number(number.toFixed(6))):[-180,-90,180,90]
        }
      }
      else return [];
    }
    
    const sql = "SELECT * FROM vector_layers_statistics";
    const db = new sqlite3.Database(file,sqlite3.OPEN_READWRITE, (err=> {if(err) reject(err)}));
    db.all(sql, (err, rows) =>{
      if (err) reject(err);
      else {
        rows = rows.map(row=> format(row))
        resolve(rows);
      }
    });  
  });