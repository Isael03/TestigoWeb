import React, { Component } from "react";
import AudioPlayer from "react-h5-audio-player";
import Mapas from "../Mapa/Mapa";
import ImageViewer from "../ImageViewer";
import VideoViewer from "../VideoViewer";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import { Contents } from "./contenido.json.js";
import IconoMapa from "./Image/854878.png";
import Imagen2 from "./Image/icono-calendario.png";


class Contenido extends Component {
  constructor(props) {
    super(props);

    this.handleprintContent = this.handleprintContent.bind(this);

    var menuFilter = (this.filter = props.filter);

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

  componentDidMount() {
    this.setState(Contents);
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
                          <Card.Text>{Contents.comentario}</Card.Text>
  
                          <AudioPlayer
                            className="progress-bar-wrapper toggle-play-wrapper flex"
                            src="/audio/Isekai Quartet Ending - English Subtitles(MP3_128K).mp3"
                            onPlay={e => console.log("Play")}
                          />
  
                          <Row className="mt-4">
                            <Col className="d-flex align-items-center">
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
  
                              <figure className="icon-info small-icon ">
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

export default Contenido;
