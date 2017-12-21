import React from 'react';

const RepoList = (props) => (
  <div>
    <br/>
    {props.count} repos have been fetched!
    <h4> Top 25 Repos </h4>
    <hr/>
    {props.repos.map((repo, i)=> {
      return <div key={i}>{repo.name} - {repo.owner}<br/><a href={repo.url}>{repo.url}</a><br/>{repo.stargazers} Stars - {repo.forks} Forks<br/><br/></div>
    })}
    <hr/>
  </div>
)

export default RepoList;