const NeDB = require('nedb-promises');
const fs = require('fs');

exports.createCollection = async () => {
    global.collectionDB = NeDB.create('collection.db')
    global.collectionDB.on('loadError', (datastore, error) => { console.error("master", datastore, error) })
    global.collectionDB.ensureIndex({ fieldName: 'name', unique: true });
    
    global.collectionDB.on('update', (datastore, result, query, update, options) => {
        //console.log(datastore, result, query, update, options)
    })

    if (process.env.RELOAD_DB == 'true') {
        if (fs.existsSync('collection.db')) {
            fs.unlinkSync('collection.db')
        }

        if (process.env.DATA_DIR) {
            const datadir = require('./util/datadir');
            await datadir.readDir(process.env.DATA_DIR);
        }

        if (process.env.DATA_URL) {
            const dataurl = require('./util/dataurl');
            await dataurl.readUrl(process.env.DATA_URL);
        }
    }


}

exports.initCollection = async (worker) => {
    fs.createReadStream("collection.db").pipe(fs.createWriteStream(`./temp/collection_${process.pid}.db`));

    global.collectionDB = NeDB.create(`./temp/collection_${process.pid}.db`)
    global.collectionDB.on('loadError', (datastore, error) => { console.error("slave",datastore, error) })
    global.collectionDB.ensureIndex({ fieldName: 'name', unique: true });
    
    process.on('message', msg=>{
        if(msg.code=="newCollection") require('./util/datadir').insertMetadata(msg.msg)
    });
}