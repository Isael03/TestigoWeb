import React, { Component } from 'react'
import AppContext from './AppContext'
import { withRouter } from 'react-router-dom';

 class AppProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            institution:null,
            validation:false
        }
        this.changeInstitution = this.changeInstitution.bind(this);this.handleChangeValidation.bind(this);
        this.destroySession = this.destroySession.bind(this);
        this.handleChangeValidation = this.handleChangeValidation.bind(this);
        this.Validated=this.Validated.bind(this);
        this.ChangeState=this.ChangeState.bind(this);
    }
  /**
   * @description Metodo que cambia es el estado de institucion entre Carabineros, Bomberos y Ambulancias
   * @param {string} nameService - Puede recibir cualquiera de las tres cadenas: Carabineros, Bomberos y Ambulancias
   */
    changeInstitution(nameService) {
          this.setState({
            institution: nameService
          });        
    }
    //En prueba
    ChangeState(name, value){
      this.setState({
        [name] : value
      })
    }

    /**
   * @description Metodo que cambia el estado de validation, para saber si eun usuario esta logueado. False no lo esta y al contrario si es true.
   * @param {boolean} boolean - Variable que puede ser true o false
   */
    handleChangeValidation(boolean){
      this.setState({
        validation: boolean
      });
      console.log("login "+this.state.validation);
    }

    /**
     * @description Metodo que compara el estado de validation. Si el estado de validation es falso, devuelve al usuario al login
     */
    Validated(){
      if(this.state.validation === false){
        return this.props.history.push("/");
    }
  }

  /**
   * @description Metodo que devuelve los valores de los estados por defecto
   */
  destroySession(){
    this.setState({
      institution: null,
      validation:false
    })
    console.log("Valores por defecto");
  }
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
          changeInstitution: this.changeInstitution,
          changeValidation: this.handleChangeValidation,
          destroySession: this.destroySession,
          Validated:this.Validated
      }}>
          {this.props.children}
      </AppContext.Provider>
    )
  }
}
export default withRouter(AppProvider);
