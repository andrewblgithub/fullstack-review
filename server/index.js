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
  console.log(getReposByUsername);
  getReposByUsername(req.body, (data)=> { 
    let userData = JSON.parse(data);
    // console.log(userData[0].name)
    // console.log(userData[0].owner.login)
    // console.log(userData[0].html_url)
    // console.log(userData[0].stargazers_count)
    // console.log(userData[0].forks)
    db.save(userData);
    res.send('req.body');
  });
  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  res.json('25 Repos')
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

