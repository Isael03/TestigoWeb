import React, { Component } from "react";
import AppContext from "./AppContext";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

/**
 * @description Componente utilizado para establecer controlar otros estados y metodos, y traspasarlos a los componentes hijos
 */
class AppProvider extends Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      institution: null,
      user:false
    };
    this.changeInstitution = this.changeInstitution.bind(this);
    this.destroySession = this.destroySession.bind(this);
    this.Validated = this.Validated.bind(this);
    this.ChangeState = this.ChangeState.bind(this);
  }

  
  /**
   * @description Metodo que cambia es el estado de institucion entre Carabineros, Bomberos y Ambulancias
   * @param {string} nameService - Puede recibir cualquiera de las tres cadenas: Carabineros, Bomberos y Ambulancias
   */
  changeInstitution(nameService) {
    this.setState({
      institution: nameService
    });
    var cookies = new Cookies();
    cookies.set("institution", nameService, { path: "/" });
  }
  /**
   * @description Metodo que actualiza los estados de manera no especifica, por lo que cualquier estado podria actualizarce usando este metodo. Ademas que genera una cokkie con el rut del usuario
   * @param {string} name - Recibe el nombre que hace referencia la estado
   * @param {string} value - Valor por cual se actualizara el estado 
   */
  ChangeState(name, value) {
    this.setState({
      [name]: value
    });
    if(name==="rut"){
      var cookies = new Cookies();
      cookies.set("rut", value, { path: "/" }); 
      this.setState({
        user:true
      })     
    }    
  }
 
  /**
   * @description Metodo que compara si la cookie de la institucion existe o no. Si no existe devuelve al usuario al login
   */
  Validated() {
    var cookies = new Cookies();
    cookies.get()
    if ((cookies.get("institution") === undefined)) {
      return this.props.history.push("/");
    }
  }
 
  /**
   * @description Metodo que devuelve los valores de los estados por defecto
   */
  destroySession() {
    this.setState({
      institution: null,
    });
    var cookies = new Cookies();
    cookies.remove('institution');
    cookies.remove('rut');
  }
  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          changeInstitution: this.changeInstitution,
          destroySession: this.destroySession,
          Validated: this.Validated,
          ChangeState:this.ChangeState
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
export default withRouter(AppProvider);
