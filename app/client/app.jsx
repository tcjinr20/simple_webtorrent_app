import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';

import Home  from './pages/Home.jsx';

class App extends Component{
  render(){
    return (
      <Home />
    )
  }
}

ReactDOM.render((
    <App />
), document.getElementById('app'));
