const readdirp = require('readdirp');
const gdal = require('gdal-next');
const path = require('path');

const module_exists =  name => {
  try { return require.resolve( name ) }
  catch( e ) { return false }
}

const readFile = async file => {
  const extName = path.extname(file.basename).substr(1).toLowerCase()
    const modulePath = path.resolve("util/filetypes", extName.toLowerCase())
    if(module_exists(modulePath)){
      /*
      const item = await gdal.open(file.fullPath);
      const fileType = item.driver.description;
      */
      const fileReader = require(modulePath);

      const metadata = await fileReader(file.fullPath,file.path.split("\\")[0])
      global.collectionDB.insert(metadata).catch(err=>{ throw err; })
    }
    else{
      console.error("Can't find module",modulePath,". For file",file.fullPath)
    }
}

const readDir = async dir => {
  for await (const file of readdirp(dir)) readFile(file)
}

module.exports = {
  readFile,
  readDir
};