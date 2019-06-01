import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Menu from './Views/Menu/Menu'
import Login from './Views/Login/Login.js'
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
