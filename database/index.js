const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', (err)=> {
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
    console.log(repo.html_url);
    let repoData = new Repo({
      url: repo.html_url,
      name: repo.name,
      owner: repo.owner.login,
      forks: repo.forks,
      stargazers: repo.stargazers
    })
    Repo.update(
      {url: repoData.url},
      repoData,
      {upsert: true},
      (err, doc)=> {
        if (err) {
          throw err;
        }
      }
    )
  })
}

module.exports.save = save;