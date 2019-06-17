import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";


/**
 * @description Este componente despliega un modal que contiene al mapa
 */
class Mapa extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.latitud = this.props.latitud;
    this.longitud = this.props.longitud;

    this.state = {
      show: false
    };
  }
  /**
   *@description Pasar Metodo al componente contenido
   */
  componentDidMount() {
    this.props.shareMethods(this.handleShow.bind(this));
  }
  /**
   *@description Cerrar modal
   */
  handleClose() {
    this.setState({ show: false });
  }
  /**
   *@description Abrir modal
   */
  handleShow() {
    this.setState({ show: true });
  }
 
  //------------------------
  render() {
    console.log(this.latitud, this.longitud);
    return (
      <Modal show={this.state.show} onHide={this.handleClose} size="xl">
        <Modal.Header closeButton />
        <Modal.Body>
          <div style={{ height: "80vh", width: "100%" }}>
            <Map
              google={this.props.google}
              style={{ width: "97%", height: "95%", position: "center" }}
              className={"map"}
              initialCenter={{ lat:this.latitud, lng: this.longitud}}
              zoom={18}
              onClick={this.onMapClicked}
            >
              <Marker
                title={"SUCESO"}
                name={"COPI"}
                position={{ lat: this.latitud, lng: this.longitud }}
              />
            </Map>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBzM2Wvl5NcJZ2Xz8nmGlp6Ij7dD4KbGF4"
})(Mapa);
