const fs = require('fs');
const oppressor = require('oppressor');
const path = require('path');
const url = require('url');
const fc = {};
const fileDir = path.normalize(path.join(__dirname, '..', 'files'));

 fc.sendFile = (req, res) => {
  const urlPath = url.parse(req.url).path.split('/');
  const file = urlPath[urlPath.indexOf('file') + 1];
  const filePath = path.join(fileDir, file)
  const fileStream = fs.createReadStream(filePath);
  fileStream.on('error', (err) => res.end("file not found"));
  fileStream.on('open', () => {
    fileStream
      .pipe(oppressor(req))
      .pipe(res);
  });
}




module.exports = fc;

