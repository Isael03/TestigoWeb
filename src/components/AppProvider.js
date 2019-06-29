import React, { Component } from "react";
import AppContext from "./AppContext";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import { Card} from "react-bootstrap";
import Audio from "./AudioPlayer";

/**
 * @description Componente utilizado para establecer controlar otros estados y metodos, y traspasarlos a los componentes hijos
 */
class AppProvider extends Component {
  /**
   * @constructor
   * @param {*} props - Propiedades de la clase React
   */
  constructor(props) {
    super(props);

    this.changeInstitution = this.changeInstitution.bind(this);
    this.destroySession = this.destroySession.bind(this);
    this.Validated = this.Validated.bind(this);
    this.ChangeState = this.ChangeState.bind(this);
    this.handlePrintComment = this.handlePrintComment.bind(this);
    this.handleprintAudio = this.handleprintAudio.bind(this);
    this.logged = this.logged.bind(this);
    this.institutionCreated = this.institutionCreated.bind(this)
  }

  
  /**
   * @description Metodo que cambia es el estado de institucion entre Carabineros, Bomberos y Ambulancias
   * @param {string} nameService - Puede recibir cualquiera de las tres cadenas: Carabineros, Bomberos y Ambulancias
   */
  changeInstitution(nameService) {
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
  }
 
  /**
   * @description Metodo que compara si la cookie de la institucion existe o no. Si no existe devuelve al usuario al login
   */
  Validated() {
    var cookies = new Cookies();
    if ((cookies.get("institution") === undefined)) {
      return this.props.history.push("/");
    }   
  }
  /**
   *@description Comprueba que exista un comentario y lo imprime o en caso deque no exista, aparece una advertecia que no existe.
   *@param {string} Is_there_comment - Corresponde al comentario que el usuario puede o no enviar
   *@return {string}
   */
  handlePrintComment(Is_there_comment) {
    var Comentario =
      Is_there_comment !== "" ? (
        <Card.Text>{Is_there_comment}</Card.Text>
      ) : (
        <h2 className="pb-2 text-center">Sin Comentario</h2>
      );
    return Comentario;
  }

    /**
   *@description Comprueba que exista una ruta para el audio en caso de existir aparece un mensaje indicando que no existe
   *@param {string} Is_there_audio - corresponde a la ruta o enlace del audio
   *@return {string}
   */
  handleprintAudio(Is_there_audio) {
    var audio =
      Is_there_audio !== "" ? (
        <Audio ruta={Is_there_audio} />
      ) : (
        <h2 className="text-center">No hay grabacion disponible</h2>
      );
    return audio;
  }
  /**
   * @description Crea una cookie con la institucion escogida y envia al usuario a la seccion de contenido
   * @param {string} institucion 
   */
  logged(institucion){
    this.changeInstitution(institucion);
    return this.props.history.push("/content");
  }
  /**
   * @description Si la cookie institucion esta previamente definida envia al usuario a la seccion contenido
   */
  institutionCreated(){
    var cookies = new Cookies();
    if (cookies.get("institution") !== undefined) {
    return this.props.history.push("/content");
    } 
  }

  /**
   * @description Metodo que destruye las cookies creadas y retorna al usuario al login
   */
  destroySession() {
    var cookies = new Cookies();
    cookies.remove('institution');
    return this.props.history.push("/");
  }
  
  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          changeInstitution: this.changeInstitution,
          destroySession: this.destroySession,
          Validated: this.Validated,
          ChangeState:this.ChangeState,
          handlePrintComment:this.handlePrintComment,
          handleprintAudio:this.handleprintAudio,
          logged:this.logged,
          institutionCreated: this.institutionCreated
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
export default withRouter(AppProvider);
