//Componentes de React
import React, { Component } from "react";
import { Player } from "video-react";
import AudioPlayer from "react-h5-audio-player";
//Componentes
import Mapas from './Mapa';
// CSS
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import "../Css/login.css";
import { Contents } from "./contenido.json";
import Imagen from "../Imagenes/default.jpg";
import IconoMapa from "../Imagenes/854878.png";
import Imagen2 from "../Imagenes/icono-calendario.png";
import Video from "../videos/trailer_hd.mp4";
import Audio from "../audio/Isekai Quartet Ending - English Subtitles(MP3_128K).mp3";

class Contenido extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Filtro: "Todo",
      Contents
    };
  }
  //Recibir metodo de mapa.js y mostrar modal
  acceptMethods = (handleShow) => {
    // Parent stores the method that the child passed
    this.handleShow = handleShow;
  };

  render() {
    const contenido = this.state.Contents.map((Contents, i) => {
      return (      
        <Container className="my-3">         
          <Row>
            <Col className="p-0">
              <Card>
                <Card.Body className="p-1">
                  <Row className="row no-gutters bg-light position-relative">
                    <Col className="col-sm-6 col-12  mb-md-0 p-md-4">
                      <figure>
                        <Image
                          src={Imagen}
                          className="w-100"
                          alt="Responsive image"
                        />
                      </figure>
                    </Col>
                    <Col className="col-sm-6 position-static p-4 pl-md-0 pb-md-0">               
                      <Card.Text>{Contents.comentario}</Card.Text>
                      <AudioPlayer
                        src={Audio}
                        onPlay={e => console.log("Play")}
                        className="col-auto"
                      />
                      <Row className="mt-4 justify-content-md-center">
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
                          
                          <figure className="icon-info small-icon">
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
    return (<div> <Mapas shareMethods={this.acceptMethods}/>{contenido}</div>);
  }
}

export default Contenido;
