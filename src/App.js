import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Dashboard from './Views/Dashboard'
import Login from './Views/Login/Login.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppProvider from './components/AppProvider'
/**
 * @description Establece las rutas por las que navegara el sistema
 */
class App extends Component {

  render() {

    return (
      <Router>
        <AppProvider>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/content" component={Dashboard} />
        </Switch>
        </AppProvider>        
      </Router>
    );
  }
}


export default App;
