const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const db = require('../database/index')
const getReposByUsername = require('../helpers/github')

let app = express();
app.use(bodyParser.text())

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getReposByUsername(req.body, (data)=> {
    let userData = JSON.parse(data);
    db.save(userData);
  });
  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.getTop25((data)=> {
    res.send(data);
  });
});

app.get('/repocount', function (req, res) {
  db.getTotalRepos((data)=> {
    res.send({count: data});
  })
})

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

