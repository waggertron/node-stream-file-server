const fs = require('fs');
const oppressor = require('oppressor');
const path = require('path');
const url = require('url');
const formidable = require('formidable');
const fc = {};
const fileDir = path.normalize(path.join(__dirname, '..', 'files'));

fc.sendFile = (req, res, file) => {
  const filePath = path.join(fileDir, file)
  const fileStream = fs.createReadStream(filePath);
  fileStream.on('error', (err) => res.end("<h1>file not found</h1>"));
  fileStream.on('open', () => {
    fileStream
      .pipe(oppressor(req))
      .pipe(res);
  });
}

fc.sendFileList = (req, res) => {
  fs.readdir(fileDir, (err, files) => {
    res.end(JSON.stringify(files));
  });
}

fc.uploadFile = (req, res, name) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
    form.on('fileBegin', (name, file) => {
        file.path = 'c:/localhost/nodejs/uploads/' + file.name;
    });
    return;
}




module.exports = fc;

