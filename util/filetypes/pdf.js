const path = require('path')

module.exports = (file, group) => new Promise((resolve, reject) => {
  const filename = path.basename(file, '.pdf');

  resolve({
    name: filename,
    title: filename,
    group: group,
    source: file.slice(0,-4),
    format: ['pdf'],
    desc: '',
    bbox: []
  })
});
