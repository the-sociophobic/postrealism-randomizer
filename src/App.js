import React from 'react'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'

import './style.sass'

import Randomizer from './Randomizer'


const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <div className="container">
        <Randomizer />
      </div>
    </Router>
  );
}

export default App;
