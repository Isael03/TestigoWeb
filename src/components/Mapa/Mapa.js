import React, { Component } from 'react';
import {Button,Modal} from 'react-bootstrap';
//import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

/**
 * @description Este componente despliega un modal que contiene al mapa 
 */
class Mapa extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    //const {latitud , longitud} = this.props;
    this.latitud= this.props.latitud; 
    this.longitud= this.props.longitud;  
    

    this.state = {
      show: false,
    };
  }
  /**
   *@description Pasar Metodo al componente contenido 
   */
   componentDidMount() { 
    this.props.shareMethods(this.handleShow.bind(this))
  } 
  /**
   *@description Cerrar modal 
   */
  handleClose() {
    this.setState({ show: false });
  }
  /**
  *@descriptionAbrir modal 
  */
  handleShow() {
    this.setState({ show: true });
  }
/*   lat: -27.3664,
  lng: -70.3331 */
/*   lat: this.latitud,
      lng: this.longitud  */
   /* Establecer coordenadas del mapa*/
    static defaultProps = {
    center: {
      lat:this.latitud,
      lng:this.longitud
    },
    zoom: 18
  }; 
//------------------------
  render() {
    console.log(this.latitud, this.longitud );
    return (

        <Modal show={this.state.show} onHide={this.handleClose} size="xl">
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
                <div style={{ height: '80vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBzM2Wvl5NcJZ2Xz8nmGlp6Ij7dD4KbGF4' }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
              >
                <AnyReactComponent
                  lat={-27.3664}
                  lng={-70.3331}
                  text="My Marker"
                />
              </GoogleMapReact>
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


export default Mapa;
