import React from 'react';
import './App.css';
import Antwoorden from './Antwoorden component/Antwoorden';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/antwoorden'>
            <Antwoorden />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;