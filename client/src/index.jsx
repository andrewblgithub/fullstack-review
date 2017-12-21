import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      count: 0
    }
  }

  componentDidMount () {
    this.getTopRepos();
  }

  getTopRepos () {
    fetch('http://repofetch.herokuapp.com/repos')
    .then((data)=> {
      return data.json();
    })
    .then((parsedData)=> {
      this.setState({repos: parsedData});
    })

    fetch('http://repofetch.herokuapp.com/repocount')
    .then((data)=> {
      return data.json();
    })
    .then((parsedData)=> {
      this.setState({count: parsedData.count});
    })
  }

  search (term) {
    // TODO
    if (term) {
      fetch('http://repofetch.herokuapp.com/repos', {
        method: 'POST',
        body: term
      })
      this.getTopRepos();
    }
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList count={this.state.count} repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));