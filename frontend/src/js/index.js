import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      <h1>This is a demo for FSE!</h1>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('container'));
