const NeDB = require('nedb-promises');
const fs = require('fs');


if(fs.existsSync('collection.db')) {fs.unlinkSync('collection.db')}
global.collectionDB = NeDB.create('collection.db')
collectionDB.on('loadError', (datastore, error) => {console.error(datastore,error)})
collectionDB.ensureIndex({ fieldName: 'name', unique: true });   

require('dotenv').config()

const datadir = require('./util/datadir');
      datadir.readDir(process.env.DATA_DIR);
  

const express = require('express');
const app = express();

  
app.use('/collections', require('./collections/collections.routes'));

app.use((error, req, res, next) => res.status(error.status||500).json({"code": error.name,"description": error.message}))



app.listen(process.env.PORT || 4444, _ =>
    console.log(`Application started on http://localhost:${process.env.PORT || 4444}`)
);