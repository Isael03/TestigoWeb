//Componentes de react
import React, { Component } from 'react';
//Css
import { Image, Modal} from "react-bootstrap";
/**Este componente muestra las imagenes y las expande*/
class index extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }
  /**Cerrar modal */
  handleClose() {
    this.setState({ show: false });
  }
  /** Abrir modal*/
  handleShow() {
    this.setState({ show: true });
  }

  render() {

    return (
      <div>
        <figure>
          <Image
            src="/Image/64099091_p0_master1200.jpg"
            className="w-100"
            alt="Responsive image"
            onClick={this.handleShow}
          />
        </figure>
          <Modal show={this.state.show} onHide={this.handleClose} size="xl" className="d-flex align-items-center">   
              <Image
                src="/Image/64099091_p0_master1200.jpg"
                className="w-100 h-auto"
                alt="Responsive image"
                onClick={this.handleClose}
              />          
        </Modal>       
      </div>
    );
  }
}

export default index;