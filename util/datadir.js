const readdirp = require('readdirp');
const gdal = require('gdal-next');

const readDir = async dir => {
    for await (const file of readdirp(dir)) { 
        const item = await gdal.open(file.fullPath);
        const fileType = item.driver.description;
        let fileReader;
        try {
          fileReader = require('./fileTypes/'+fileType);
        }
        catch (err) {
          throw err.code;
        }
        const metadata = await fileReader(file.fullPath)
        global.collectionDB.insert(metadata).catch(err=>{ throw err; })

    }  
}

module.exports = {
    readDir
};