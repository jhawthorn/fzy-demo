import React, { Component } from 'react';
import './App.css';

import rails_files from './rails_files.txt';

import { score } from 'fzy.js';

import { sortBy } from 'lodash';

function filterResults(data, query) {
  var regex = new RegExp(query.split('').join('.*'));

  var results = data;

  results = results.filter((x) => x.match(regex));

  results = sortBy(results, (x) => -score(query, x));

  results = results.slice(0,15);

  return results.map((x) => <li>{x}</li>);
}

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {data: null};

    fetch(rails_files)
      .then((response) => response.text())
      .then((txt) => txt.split("\n"))
      .then((data) => this.setState({ data: data }));
  }

  render() {
    if (!this.state.data) {
      return <div>Loading...</div>
    }
    return (
      <ul className="App-results">
        {
          filterResults(this.state.data, this.props.query)
        }
      </ul>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {query: 'arbase.rb'};

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.input.focus();
  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="http://i.hawth.ca/u/fzy.svg" className="App-logo" alt="logo" />
          <div className="App-ui">
            <div className="App-prompt">
              <span>&gt;&nbsp;</span><input type="text" className="App-input" value={this.state.query} onChange={this.handleChange} ref={(input) => { this.input = input; }} />
            </div>
            <Results query={this.state.query} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
