import React, { Component } from "react";
import PropTypes from 'prop-types';
import Mapas from "../Mapa/Mapa";
import ImageViewer from "../ImageViewer";
import VideoViewer from "../VideoViewer";
import Audio from '../AudioPlayer';
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import { Contents } from "./contenido.json";
import IconoMapa from "./Image/854878.png";
import Imagen2 from "./Image/icono-calendario.png";

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

    var menuFilter = this.props.filter;

    this.state = {
      Contents,
      ViewContents: menuFilter
    };
  }
  componentDidMount(){
   
    /* db.child()

    fb.child('user/123').once('value', function(userSnap) {
      fb.child('media/123').once('value', function(mediaSnap) {
          show( extend({}, userSnap.val(), mediaSnap.val()) );
      });
  }); */
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
   *@description  Imprime el las imagenes o videos en los contenedores que le correspondan
   */
  handleprintContent(type) {
    var typeContent;
    typeContent = type === "video" ? <VideoViewer /> : <ImageViewer />;
    return typeContent;
  }
  /**
   *@description Comprueba que exista una ruta para el audio
   */
  handleprintAudio(Is_there_audio){
    var audio = Is_there_audio !== "" ? <Audio ruta={Is_there_audio}/> : <h2 className="text-center">No hay grabacion disponible</h2>     
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
        /**
         * Recorrer json
        */
       const contenido = this.state.Contents.map((Contents, i) => {
          return (
            <Container className="my-3" key={Contents.id}>
            <Row>
              <Col className="p-0">
                <Card>
                  <Card.Body className="p-1">
                    <Row className="row no-gutters bg-light position-relative">
                      <Col className="col-sm-6 col-12  mb-md-0 p-md-4">
                        {this.handleprintContent(Contents.tipo)}
                      </Col>
                      <Col className="col-sm-6 position-static p-4 pl-md-0 pb-md-0">
                        <Container>
                          {this.handlePrintComment(Contents.comentario)}
                          {this.handleprintAudio(Contents.audio)}
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
                                {Contents.fecha}
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
          );
    }).reverse();  
    return (
    /**
     *@description Compartir metodo de mostrar modal 
     */
      <div>
        <Mapas shareMethods={this.acceptMethods} />
        {contenido}
      </div>
    );
  }
}
/**
 *@param {*} menuFilter contiene informacion del filtrado, es recibida desde el componente menu
 */
Contenido.propTypes = {
  menuFilter: PropTypes.string
};

export default Contenido;
