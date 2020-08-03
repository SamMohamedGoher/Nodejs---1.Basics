// application requireed
const http = require(`http`);
const fs = require(`fs`);
const express = require(`express`);
const app = express();

// creating server
const server = http.createServer(async (req, res) => {
  res.setHeader(`Content-Type`, `text/html`);
  if(req.url === `/`) {
    res.write(`<!DOCTYPE html>`);
    res.write(`<html lang="en">`);
    res.write(`<head>`);
    res.write(`<title>Document</title>`);
    res.write(`</head>`);
    res.write(`<body>`);
    res.write(`<h1>Hello world!!</h1>`);
    res.write(`<form action="/test" method="POST"><input type="text" name="message"><button type="submit"> send </button></form>`);
    res.write(`</body>`);
    res.write(`</html>`);
    res.end();
  }
  if(req.url === `/test`  && req.method === `POST`) {
    const body = [];
    req.on(`data`, (chunk) =>{
      //console.log(chunk);
      body.push(chunk);
    });
    req.on(`end`, () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split(`=`, parsedBody[parsedBody.length])[1];
      fs.writeFileSync('test.txt', message);
    });
    res.setHeader(`Location`, `/`);
    res.statusCode = 302;
    return res.end();
  }

});

// setting port
const port = process.env.PORT || 3000;

// server listening
server.listen(port, console.log(
  `listening to server on port ${port} ...`
));