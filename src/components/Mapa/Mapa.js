import React, { Component } from 'react';
import {Button,Modal} from 'react-bootstrap';
import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
//import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

/**
 * Este componente despliega un modal que contiene al mapa 
 */
class Mapa extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }
  /**
   * Pasar Metodo al componente contenido 
   */
   componentDidMount() { 
    this.props.shareMethods(this.handleShow.bind(this))
  } 
  /**
   * Cerrar modal 
   */
  handleClose() {
    this.setState({ show: false });
  }
  /**
  Abrir modal 
  */
  handleShow() {
    this.setState({ show: true });
  }

  /**
   * Establecer coordenadas del mapa
   */
  static defaultProps = {
    center: {
      lat: -27.3664,
      lng: -70.3331
    },
    zoom: 18
  };
//------------------------
  render() {
    return (

        <Modal show={this.state.show} onHide={this.handleClose} size="xl">
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
                <div style={{ height: '80vh', width: '100%' }}>
              <Map
                  google={this.props.google}
                  style={{width: '97%', height: '100%', position: 'center'}}
                  className={'map'}
                  center={{
                    lat: -27.3664,
                    lng: -70.3331
                  }}
                  zoom={18}
                  onClick={this.onMapClicked}
                  position={{lat: -27.3664, lng: -70.3331}}
                  
                ><Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'COPI'}
                    position={{lat: -27.3664, lng: -70.3331}} 
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
  apiKey: ('AIzaSyBzM2Wvl5NcJZ2Xz8nmGlp6Ij7dD4KbGF4')
})(Mapa)
