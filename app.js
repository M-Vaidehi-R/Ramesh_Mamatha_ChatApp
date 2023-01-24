const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const port= process.env.PORT || 3000;

//app.get is a route handler

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');   //res.send for text
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
  });


  //for team page, just the same, with diff team members

server.listen(port, () => {
  console.log(`listening on ${port}`);
});