const path = require('path')

module.exports = (file, group) => new Promise((resolve, reject) => {
  const filename = path.basename(file, '.tif');

  resolve({
    name: filename,
    title: filename,
    group: group,
    source: file.slice(0,-4),
    format: ['tif'],
    desc: '',
    bbox: []
  })

});