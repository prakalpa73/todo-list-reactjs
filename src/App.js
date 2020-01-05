import React, {Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Todo from './Todo';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  render() {
    return (
      <div className="App">
      <h1>toDo List</h1>
        <Todo />
      </div>
    );
  }
}

export default App;
