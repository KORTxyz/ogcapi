const sqlite3 = require('sqlite3');
const path = require('path');


module.exports = (file,group) => new Promise( (resolve, reject)=> {

    const arrayToObject = array => {
        return array.reduce((obj, item) => {
            obj[item.name] = item.value
            return obj
        }, {})
    }
    
    const format = row => {
    if(!row.json){
        return [{
          name: path.basename(file,path.extname(file)),
          title: row.name,
          group: group,
          file: file,
          type: 'mbtiles',
          format: row.format,
          desc: row.description,
          bbox: row.bounds.split(",").map(e=>Number(e))
        }];
      }
     else{
       return JSON.parse(row.json).vector_layers.map(layer => {
         return {
          name: path.basename(file,path.extname(file))+':'+layer.id,
          title: layer.id,
          group: group,
          file: file,
          type: 'mbtiles',
          format: row.format,
          desc: layer.description,
          bbox: row.bounds.split(",").map(e=>Number(e))
        }
       })
     }
    }

    const sql = "SELECT * from metadata";
    const db = new sqlite3.Database(file,sqlite3.OPEN_READWRITE, (err=> {if(err) reject(err)}));
          db.all(sql, (err, rows) =>{
            if (err) reject(err);
            else {
                dataArray = arrayToObject(rows)
                metadata = format(dataArray)
                resolve(metadata)
            };
          });
  });