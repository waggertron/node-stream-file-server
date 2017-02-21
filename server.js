const http = require('http');
const fileCtrl = require('./controllers/fileController.js');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 8080;

const server = http.createServer( (req, res) => {
  console.log(req.url);
  if (req.url === '/') {
    fs.createReadStream('./index.html').pipe(res);
  }
  else if (req.url.match(/^\/file/)) {
    const pieces = req.url.split('/');
    console.log(pieces);
    console.log(pieces.length);
    if (req.method === "GET") {
      if (pieces && pieces[2]) return fileCtrl.sendFile(req, res, pieces[2]);
      return fileCtrl.sendFileList(req, res);
    } 
    else if (req.method === "POST") {
      return fileCtrl.uploadFile(req, res, pieces[2]);
    }
  }
  else {
      res.end('<h1>not found!</h1>');
  }

});

server.listen(8080, ()=> process.stdout.write(`Server listening on port ${PORT}\n`));