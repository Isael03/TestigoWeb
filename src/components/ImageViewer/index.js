import React, { Component } from 'react';
import { Image, Modal} from "react-bootstrap";
/**
*@description Este componente muestra las imagenes y las expande
*/
class index extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }
  /**
   * @description Cerrar modal 
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

  render() {
    return (
      <div>
        <figure>
          <Image
            src={this.props.ruta}
            className="d-block w-100"
            alt="Responsive image"
            onClick={this.handleShow}
          />
        </figure>
          <Modal show={this.state.show} onHide={this.handleClose} size="xl" className="d-flex align-items-center">   
              <Image
                src={this.props.ruta}
                className="d-block w-100"               
                alt="Responsive image"
                onClick={this.handleClose}                
              />          
        </Modal>       
      </div>
    );
  }
}

export default index;