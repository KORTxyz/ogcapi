const readdirp = require('readdirp');
const gdal = require('gdal-next');
const path = require('path');

const module_exists =  name => {
  try { return require.resolve( name ) }
  catch( e ) { return false }
}

const readFile = async file => {
  const extName = path.extname(file.basename).substr(1).toLowerCase()
    console.log("datadir",file.basename, file.fullPath)
    if(module_exists('./fileTypes/'+extName)){
      
      const item = await gdal.open(file.fullPath);
      console.log(item)
      const fileType = item.driver.description;
      console.log(fileType, file.basename)

      const fileReader = require('./fileTypes/'+fileType);

      const metadata = await fileReader(file.fullPath)
      global.collectionDB.insert(metadata).catch(err=>{ throw err; })
    }
}

const readDir = async dir => {
    for await (const file of readdirp(dir)) readFile(file)
}

module.exports = {
  readFile,
  readDir
};