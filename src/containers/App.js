import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';

import './App.css';

const App = () => (
  <div>
    <main className="app">
      <Route exact path="/" component={Home} />
    </main>
  </div>
)

export default App
