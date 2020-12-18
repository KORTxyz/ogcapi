const express = require('express');
const cors = require('cors');
const app = express();

exports.start = async (worker) =>{

    global.baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 4444}`
    const PORT = process.env.PORT || 4444
  
    app.use(express.json());
    app.use(cors());

    app.use((err, req, res, next) => res.status(err.status || 500).json({ "code": err.name, "description": err.message }))
  
    app.use(express.static('views'))
    app.get('/', require('./index/index'));

    app.use('/dist',express.static('./dist'))

    app.use('/api', require('./api/notimplementet'));
    app.use('/conformance', require('./conformance/conformance'));
    app.use('/collections', require('./collections/collections.routes'));
    app.use('/tilematrixsets', require('./tilematrixsets/tilematrixsets'));
    app.use('/styles', require('./styles/notimplementet'));
    app.use('/processes', require('./processes/notimplementet'));
  
    app.listen(PORT, ()=> console.log(`Express server listening on port ${PORT} and worker ${process.pid}`));
}
