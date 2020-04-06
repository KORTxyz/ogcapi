require('dotenv').config()

const path = require('path');
const fs = require('fs');

//joining path of directory 
console.log(process.env.DATA_DIR)
const express = require('express');
const app = express();

  
app.use('/collections', require('./collections/collections.routes'));

app.use((error, req, res, next) => res.status(error.status||500).json({"code": error.name,"description": error.message}))

process.env.PORT = process.env.PORT || 4444;

app.listen(process.env.PORT, _ =>
    console.log(`Application started on http://localhost:${process.env.PORT}`)
);