import React from 'react';
import './App.css';
import EmailCard from './email component/EmailCard';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/emaillijst">
                        <EmailCard />
                    </Route>
                </Switch>
            </Router>
            
        );
    }
   
}

export default App;