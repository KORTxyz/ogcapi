const readdirp = require('readdirp');
const path = require('path');
const { resolve } = require('path');

const module_exists = name => {
  try { return require.resolve(name) }
  catch (e) { return false }
}

const readFile = async file => {
  const extName = path.extname(file.basename).substr(1).toLowerCase()
  const modulePath = `./filetypes/${extName}`;

  if (module_exists(modulePath)) {
    console.log("Adding file: ",file.basename)
    const metadata = await require(modulePath)(file.fullPath, file.path.split("\\")[0]);
    await require('../cluster').relayMessage("newCollection",metadata);
    await insertMetadata(metadata);
  }
  else {
    console.error("Can't find module", modulePath, ". For file", file.fullPath)
  }

}

const insertMetadata = async metadata => {
  const existing = await global.collectionDB.findOne({ name: metadata.name }).catch(err => { throw err; });
  if (existing === null) global.collectionDB.insert(metadata).catch(err => { throw err; });
  else { global.collectionDB.update({ name: metadata.name }, { $set: { format: [...existing.format,...metadata.format] } }).catch(err => { throw err; }) }

}

const readDir = async dir => {
  for await (const file of readdirp(dir)) await readFile(file)
  resolve()
}

module.exports = {
  insertMetadata,
  readFile,
  readDir,
};