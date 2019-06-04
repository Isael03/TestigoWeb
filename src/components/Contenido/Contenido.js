//Componentes de React
import React, { Component } from "react";
import PropTypes from 'prop-types';
//Componentes
import Mapas from "../Mapa/Mapa";
import ImageViewer from "../ImageViewer";
import VideoViewer from "../VideoViewer";
import Audio from '../AudioPlayer';
//Css
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import { Contents } from "./contenido.json";
//Accesorios
import IconoMapa from "./Image/854878.png";
import Imagen2 from "./Image/icono-calendario.png";

/**Este componente incorpora a otros componentes para mostrarlos adecuadamente en el menu */
class Contenido extends Component {
  constructor(props) {
    super(props);

    //vincular metodos
    this.handleprintContent = this.handleprintContent.bind(this);
    this.handleprintAudio=this.handleprintAudio.bind(this);
    this.handlePrintComment=this.handlePrintComment.bind(this);

    /**Vincular propiedades */
    var menuFilter = this.props.filter;

    //Declarar Estado
    this.state = {
      Contents,
      ViewContents: menuFilter
    };
  }
  //Cambiar estado segun el filtrado de contenido
  componentWillReceiveProps(menuFilter, type) {
    this.setState({ ViewContents: menuFilter });
  }

  //Recibir metodo de mapa.js y mostrar modal
  acceptMethods = handleShow => {
    // Parent stores the method that the child passed
    this.handleShow = handleShow;
  };

  //Filtrado de videos e imagenes
  handleprintContent(type) {
    var typeContent;
    typeContent = type === "video" ? <VideoViewer /> : <ImageViewer />;
    return typeContent;
  }
  handleprintAudio(Is_there_audio){
    var audio = Is_there_audio !== "" ? <Audio ruta={Is_there_audio}/> : <h2 className="text-center">No hay grabacion disponible</h2>     
    return audio;
  }
  handlePrintComment(Is_there_comment){
    var Comentario = Is_there_comment !== "" ?  <Card.Text>{Is_there_comment}</Card.Text>: <h2 className="pb-2 text-center">Sin Comentario</h2>;
    return Comentario;
  }


  render() {
        /**Recorrer arreglo */
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
                          <Row className="mt-4">
                            <Col className="d-flex ">
                              <figure className="icon-info">
                                <Image
                                  src={IconoMapa}
                                  alt="Responsive image"
                                  width="100%"
                                  max-width="100"
                                  height="auto"
                                  onClick={() => this.handleShow()}
                                />
                              </figure>
  
                              <figure className="icon-info ">
                                <Image
                                  src={Imagen2}
                                  alt="Responsive image"
                                  width="100%"
                                  max-width="100%"
                                  height="auto"
                                />
                              </figure>
                              <small className="text-muted ml-3 ">
                                {Contents.fecha}
                              </small>
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
    //Compartir metodo de mostrar modal
    return (
      <div>
        <Mapas shareMethods={this.acceptMethods} />
        {contenido}
      </div>
    );
  }
}
Contenido.propTypes = {
  menuFilter: PropTypes.string
};

export default Contenido;
