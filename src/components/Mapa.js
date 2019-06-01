import React, { Component } from 'react';
import {Button,Modal} from 'react-bootstrap';
//import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import GoogleMapReact from 'google-map-react';

// const mapStyles = {
//   width: '100%',
//   height: '100%'
//npm install --save google-map-react
// };
const AnyReactComponent = ({ text }) => <div>{text}</div>;
class Mapa extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }
   componentDidMount() {
    // Pasar Metodo al componente contenido
    this.props.shareMethods(this.handleShow.bind(this))
  } 

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  //segundo mapa este funciona
  static defaultProps = {
    center: {
      lat: -27.36,
      lng: -70.33
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
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBQ8AegSeD2_GDC60wxCzMDd8WeCeGicrU' }}
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