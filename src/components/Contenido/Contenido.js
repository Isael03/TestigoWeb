import React, { Component } from "react";
import Mapas from "../Mapa/Mapa";
import ImageViewer from "../ImageViewer";
import VideoViewer from "../VideoViewer";
import Audio from '../AudioPlayer';
import { Card, Container, Row, Col, Image} from "react-bootstrap";
import IconoMapa from "./Image/854878.png";
import Imagen2 from "./Image/icono-calendario.png";
/**
* @description Este componente incorpora a otros componentes para mostrarlos adecuadamente en su interior
*/
class Contenido extends Component {
/**
 * @constructor
 * @param {*} props - Propiedades de la clase React
 */
  constructor(props) {
    super(props);
    this.handleprintContent = this.handleprintContent.bind(this);
    this.handleprintAudio=this.handleprintAudio.bind(this);
    this.handlePrintComment=this.handlePrintComment.bind(this);
    this.containerFiles=this.props.filtrar;
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
    typeContent = this.containerFiles(filename) === "Video" ? <VideoViewer ruta={filename}  /> : <ImageViewer ruta={filename}  />;
    return typeContent;
  }

  /**
   *@description Comprueba que exista una ruta para el audio en caso de existir aparece un mensaje indicando que no existe
   *@param {string} Is_there_audio - corresponde a la ruta o enlace del audio
   *@return {string}
   */
  handleprintAudio(Is_there_audio){
    var audio = Is_there_audio !== "" ? <Audio ruta={Is_there_audio} /> : <h2 className="text-center">No hay grabacion disponible</h2>     
    return audio;
  }
  /**
   *@description Comprueba que exista un comentario y lo imprime o en caso deque no exista, aparece una advertecia que no existe. 
   *@param {string} Is_there_comment - Corresponde al comentario que el usuario puede o no enviar
   *@return {string}
   */
  handlePrintComment(Is_there_comment){
    var Comentario = Is_there_comment !== "" ?  <Card.Text>{Is_there_comment}</Card.Text>: <h2 className="pb-2 text-center">Sin Comentario</h2>;
    return Comentario;
  }


  render() {
    return (
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
  
                              <figure className=" ires">
                                <Image
                                  src={Imagen2}
                                  alt="Responsive image"
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
