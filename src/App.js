import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Dashboard from './Views/Dashboard'
import Login from './Views/Login/Login.js'
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * @description Establece las rutas por las que navegara el sistema
 */
function App() {
  return (
    <Router>    
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/content" component={Dashboard} />
        </Switch>
    </Router>
   
  );
}

export default App;
