require('dotenv').config()

const NeDB = require('nedb-promises');

if(process.env.RELOAD_DB == 'true'){
    const fs = require('fs');
    if(fs.existsSync('collection.db')) {fs.unlinkSync('collection.db')}
    const datadir = require('./util/datadir');
    datadir.readDir(process.env.DATA_DIR);
}

global.collectionDB = NeDB.create('collection.db')
collectionDB.on('loadError', (datastore, error) => {console.error(datastore,error)})
collectionDB.ensureIndex({ fieldName: 'name', unique: true });   



const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use((err, req, res, next) => res.status(err.status||500).json({"code": err.name,"description": err.message}))

app.get('/', require('./index/index'));

app.use('/api', require('./api/notimplementet'));
app.use('/conformance', require('./conformance/conformance'));
app.use('/collections', require('./collections/collections.routes'));
app.use('/tilematrixsets', require('./tilematrixsets/tilematrixsets'));
app.use('/styles', require('./styles/notimplementet'));
app.use('/processes', require('./processes/notimplementet'));



global.baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT||4444}`

app.listen(process.env.PORT || 4444, _ =>
    console.log(`Application started on ${global.baseUrl}`)
);