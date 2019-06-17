import React, { Component } from "react";
import Mapas from "../Mapa/Mapa";
import ImageViewer from "../ImageViewer";
import VideoViewer from "../VideoViewer";
import Audio from '../AudioPlayer';
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import IconoMapa from "./Image/854878.png";
import Imagen2 from "./Image/icono-calendario.png";
import firebase from "firebase/app";
/**
* @description Este componente incorpora a otros componentes para mostrarlos adecuadamente en su interior
*/
class Contenido extends Component {
/**
 * @constructor
 */
  constructor(props) {
    super(props);
    this.handleprintContent = this.handleprintContent.bind(this);
    this.handleprintAudio=this.handleprintAudio.bind(this);
    this.handlePrintComment=this.handlePrintComment.bind(this);
    this.containerFiles=this.props.filtrar;
    this.getFile = this.getFile.bind(this);
  }

  /**
   * @description Cambia el estado de ViewContents, que establece el parametro del filtrado
   */
  componentWillReceiveProps(menuFilter, type) {
    this.setState({ ViewContents: menuFilter });
  }

  /** 
   * @description Recibir metodo de mapa.js y mostrar modal
   */
  acceptMethods = handleShow => {
    this.handleShow = handleShow;
  };

  /** 
   *@description  Recupera la extension de los archivo, a traves del metodo recibido como propiedad de Menu e imprime las imagenes o videos en los contenedores que le correspondan
   *@param {string} filename - Corresponde a la ruta del archivo
   * @return {*}
   */
  handleprintContent(filename) {
    var typeContent;
    typeContent = this.containerFiles(filename) === "Video" ? <VideoViewer ruta={filename} /*ruta={this.getFile(filename)}*//> : <ImageViewer ruta={filename} /*ruta={this.getFile(filename)}*//>;
    return typeContent;
  }
 /**
   * @description Obtiene la url del archivo desde el Storage de firebase
   * @param {string} pathFile - Ruta del archivo
   * @return {string} 
   */
  getFile(pathFile){
    var storage = firebase.storage().ref();
    storage.child(pathFile).getDownloadURL().then(function(url) {    
      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function(event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
     // xhr.send();
      console.log(url);
      return url;
    }).catch(function(error) {
      // Handle any errors
    });
  }
  /**
   *@description Comprueba que exista una ruta para el audio
   */
  handleprintAudio(Is_there_audio){
    var audio = Is_there_audio !== "" ? <Audio ruta={Is_there_audio} /*ruta={this.getFile(filename)}*//> : <h2 className="text-center">No hay grabacion disponible</h2>     
    return audio;
  }
  /**
   *@description Comprueba que exista un comentario
   */
  handlePrintComment(Is_there_comment){
    var Comentario = Is_there_comment !== "" ?  <Card.Text>{Is_there_comment}</Card.Text>: <h2 className="pb-2 text-center">Sin Comentario</h2>;
    return Comentario;
  }


  render() {
   // console.log(this.props.latitud)
    return (
    /**
     *@description Compartir metodo de mostrar modal 
     */
      <div>
        <Mapas shareMethods={this.acceptMethods} latitud={this.props.latitud} longitud={this.props.longitud}/>
        <Container className="my-3">
            <Row>
              <Col className="p-0">
                <Card>
                  <Card.Body className="p-1">
                    <Row className="row no-gutters bg-light position-relative">
                      <Col className="col-sm-6 col-12  mb-md-0 p-md-4">
                        {this.handleprintContent(this.props.archivo)}
                      </Col>
                      <Col className="col-sm-6 position-static p-4 pl-md-0 pb-md-0">
                        <Container>
                          {this.handlePrintComment(this.props.comentario)}
                          {this.handleprintAudio(this.props.audio)}
                          <Row className="mt-4 ">
                            <Col className="d-flex ">
                              <figure className="icon-info ires">
                                <Image
                                  src={IconoMapa}
                                  alt="Responsive image"
                                  width="100%"
                                  max-width="100"
                                  height="auto"
                                  onClick={() => this.handleShow()}
                                />
                              </figure>
  
                              <figure className="ires ">
                                <Image
                                  src={Imagen2}
                                  alt="Responsive image"
                                  width="10%"
                                  max-width="100%"
                                  height="auto"
                                  className="icon-info small-icon"
                                  
                                />
                                 <small className="text-muted ires">
                                {this.props.fecha}
                              </small>
                              </figure>
                             
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
}


export default Contenido;
