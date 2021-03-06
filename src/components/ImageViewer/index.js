import React, { Component } from 'react';
import { Image, Modal} from "react-bootstrap";
/**
*@description Este componente muestra las imagenes y las expande
*/
class index extends Component {
  /**
   * @constructor
   * @param {*} props - Propiedades de la clase React
   */
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }
  /**
   * @description Cambiar el estado de show a false para cerrar el modal 
   */
  handleClose() {
    this.setState({ show: false });
  }
  /** 
   *@description Cambia el estado de show a true para abrir el modal
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
            className=" w-100"
            width={500}
            height={260}
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