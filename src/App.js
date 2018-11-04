import React, { Component } from 'react';
import './App.css';

class Results extends Component {
  render() {
    return (
      <ul class="App-results">
        <li>{this.props.query}</li>
      </ul>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {query: 'test'};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="http://i.hawth.ca/u/fzy.svg" className="App-logo" alt="logo" />
          <div class="App-ui">
            <div class="App-prompt">
              <span>&gt;&nbsp;</span><input type="text" class="App-input" value={this.state.query} onChange={this.handleChange} />
            </div>
            <Results query={this.state.query} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
