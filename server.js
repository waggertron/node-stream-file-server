const http = require('http');
const fileCtrl = require('./controllers/fileController.js');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 8080;

const server = http.createServer( (req, res) => {
  if (req.url === '/') {
    fs.createReadStream('./index.html').pipe(res);
  }
  else if (req.url.match(/^\/file\//)) {
    if (req.method === "GET") return fileCtrl.sendFile(req, res);
    if (req.method === "POST") return fileCtrl.saveFile(req, res);
  }
  else {
      res.end('<h1>not found!</h1>');
  }

});

server.listen(8080, ()=> process.stdout.write(`Server listening on port ${PORT}\n`));