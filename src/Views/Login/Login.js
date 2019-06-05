import React, { Component } from "react";
import FormLogin from '../../components/FormLogin'

/** 
 * @description Este Componente sirve para mostrar el formulario de Ingreso a la plataforma 
 */
class login extends Component {
  constructor(props){
    super(props);
    this.onSubmit=this.onSubmit.bind(this);
  }
  
  /**
   * @description OnSubmit cambia la vista del login al contenido
   */
    onSubmit() {
    this.props.history.push("/content");
  }

  render() {   
    return (
      <div><FormLogin onSubmit={this.onSubmit}/></div>
    );
  }
}
export default login;
