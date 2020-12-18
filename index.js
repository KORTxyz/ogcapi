require('dotenv').config();

const cluster = require('cluster');
const fs = require('fs/promises');

(async () => {
  // It works as expected, as long as you use the await keyword.
  if(cluster.isMaster){
    await fs.rmdir('./temp',{recursive:true});
    await fs.mkdir('./temp');
    await fs.stat('./data').catch(e => fs.mkdir('./data'))

    await require('./database').createCollection();
    await require('./cluster').setupWorkerProcesses();
  }
  else{
    require('./server').start(process);
    require('./database').initCollection(process.pid);
  };

})();

process.on('exit', function(code) {
  return console.log(`About to exit with code ${code}`);
});