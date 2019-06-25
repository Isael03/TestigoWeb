import React, { Component } from "react";
import Mapas from "../Mapa/Mapa";
import ImageViewer from "../ImageViewer";
import VideoViewer from "../VideoViewer";
import { Card, Container, Row, Col, Image, Carousel } from "react-bootstrap";
import IconoMapa from "./Image/854878.png";
import Imagen2 from "./Image/icono-calendario.png";
import AppContext from "../AppContext";
/**
 * @description Este componente incorpora a otros componentes para mostrarlos adecuadamente en su interior
 */
class Contenido extends Component {
  static contextType = AppContext;
  /**
   * @constructor
   * @param {*} props - Propiedades de la clase React
   */
  constructor(props) {
    super(props);
    this.handleprintContent = this.handleprintContent.bind(this);
    this.containerFiles = this.containerFiles.bind(this);
  }

  /**
   * @description Recibir metodo de mapa.js y mostrar modal
   */
  acceptMethods = handleShow => {
    this.handleShow = handleShow;
  };

  /**
   *@description  Recupera la extension de los archivo, a traves del metodo containerFiles e imprime las imagenes o videos en los contenedores que le correspondan
   *@param {string} filename - Corresponde a la ruta del archivo
   * @return {array}
   */
  handleprintContent(filename) {
    try {
      const typeContent = filename.map((file, i) => {
        if (this.containerFiles(file) === "Video") {          
          return (
            <Carousel.Item key={i}>
              <VideoViewer ruta={file} />
            </Carousel.Item>
          );
        }
        if (this.containerFiles(file) === "Imagen") {
          return (
            <Carousel.Item key={i}>
              <ImageViewer ruta={file} />
            </Carousel.Item>
          );
        }
      });
      return typeContent;
    } catch (error) {}
  }
  /**
   * @description Obtiene la extension del archivo y devuelve si corresponde a video o imagen
   * @param {string} filename - Corresponde a la ruta del archivo
   * @return {string}
   */
  containerFiles(filename) {
    var extension = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
    const video_extension = ["mp4", "3gp", "3gpp", "3gpp2", "mpeg", "mov"]; //webm mpg avi mkv m4v
    const image_extension = ["jpg", "png", "jpeg"];
    var type = "";
    for (var i = 0; i < video_extension.length; i++) {
      if (video_extension[i] === extension.toLowerCase()) {
        return type = "Video";
      }
    }
    if (type === "") {
      for (var j = 0; j < image_extension.length; j++) {
        if (image_extension[j] === extension.toLowerCase()) {
          return type = "Imagen";
        }
      }
    }
  }

  render() {
    return (
      <div>
        <Mapas
          shareMethods={this.acceptMethods}
          latitud={this.props.latitud}
          longitud={this.props.longitud}
        />
        <Container className="my-3">
          <Row>
            <Col className="p-0">
              <Card>
                <Card.Body className="p-1">
                  <Row className="row no-gutters bg-light position-relative">
                    <Col className="col-sm-6 col-12  mb-md-0 p-md-4">
                      <Container>
                        <Carousel interval={null} controls={false} fade={true}>
                          {this.handleprintContent(this.props.archivo)}
                        </Carousel>
                      </Container>
                    </Col>
                    <Col className="col-sm-6 position-static p-4 pl-md-0 pb-md-0">
                      <Container>
                        {this.context.handlePrintComment(this.props.comentario)}
                        {this.context.handleprintAudio(this.props.audio)}
                        <Row className="mt-4 ">
                          <Col className="d-flex justify-content-center">
                            <figure>
                              <Image
                                src={IconoMapa}
                                alt="Responsive image"
                                onClick={() => this.handleShow()}
                                width={50}
                                height={55} 
                                />
                            </figure>
                            </Col>
                            <Col className="d-flex justify-content-center text-center">
                            <figure>
                              <Image
                                src={Imagen2}
                                alt="Responsive image"
                                width={40}
                                height={40}                               
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
