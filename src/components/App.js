import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Menu from './Global/Menu'
import Login from './Global/Login'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>    
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/menu" component={Menu} />
        </Switch>
    </Router>
   
  );
}

export default App;
