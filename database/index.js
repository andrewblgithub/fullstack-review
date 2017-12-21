const mongoose = require('mongoose');
const url = process.env.MONGODB_URI || 'mongodb://localhost/fetcher';
mongoose.connect(url, (err)=> {
  if (err) {
    throw err;
  }
  console.log("Connected correctly to server");
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  // store git repo url and stargazers count 
  url: { type: String, unique: true },
  name: String,
  owner: String,
  forks: Number,
  stargazers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repos.forEach((repo)=> {
    Repo.update(
      {url: repo.html_url},
      {
        url: repo.html_url,
        name: repo.name,
        owner: repo.owner.login,
        forks: repo.forks,
        stargazers: repo.stargazers_count
      },
      {upsert: true},
      (err, doc)=> {
        if (err) {
          throw err;
        }
        console.log('Repo data upserted!');
      }
    )
  })
}

let getTop25 = (callback)=> {
  Repo.find({}).sort('-stargazers').limit(25).exec((err, docs)=> {
    if (err) {
      throw err;
    }
    callback(docs);
  });
}

let getTotalRepos = (callback)=> {
  Repo.count({}, (err, docs)=> {
    if (err) {
      throw err;
    }
    callback(docs);
  });
}

module.exports.save = save;
module.exports.getTop25 = getTop25;
module.exports.getTotalRepos = getTotalRepos;