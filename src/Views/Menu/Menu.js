//Componentes de react
import React, { Component } from 'react';
//Componentes globales
import Contenido from '../../components/Contenido/Contenido'
//CSS
import {
    Navbar,
    Dropdown,
    Container,
    Nav,
    Badge,
    Image,
} from 'react-bootstrap';
//Accesorios
import Filtro from './Image/filter-icon.png'
import imgLogout from './Image/logout.png';
/** Este componente sirve para mostrar el contenido que se encuentra en la BD*/
class menu extends Component {
  constructor(props) {
    super(props);
    /**Declaracion de estado */ 
    this.state={
      filter: "all"
    }

    /** vincular metodos*/
    this.onLogout=this.onLogout.bind(this);
    this.watchAll=this.watchAll.bind(this);
    this.watchVideos=this.watchVideos.bind(this);
    this.watchImages=this.watchImages.bind(this);
  }

  
  /**metodo para desloguearse */
  onLogout() {
    this.props.history.push('/');
  }
  /**wacthAll cambia el estado del filtro a "all" */
  watchAll(){
    this.setState({
      filter:"all"
    })
  }
  /**wacthVideos cambia el estado del filtro a "only-videos" */
  watchVideos(){
    this.setState({     
      filter:"only-videos"
    })
  }
   /**wacthImages cambia el estado del filtro a "only-images" */
  watchImages(){
    this.setState({
      filter:"only-images"
    })
  }

    render() {
        /** Cambiar de color el body a blanco*/
        document.body.style.backgroundColor = "white";
        return (
          <Container id="home" fluid  className="p-0">
                <Navbar
                  collapseOnSelect
                  expand="lg"
                  bg="light"
                  variant="dark"
                  className="border-bottom border-danger d-flex"
                >
                  <Navbar.Brand href="#home">
                    <h3 text="light">
                      <Badge
                        variant="secondary"
                        className="px-5 badge badge-secondary"
                      >
                        Testigo
                      </Badge>
                    </h3>
                  </Navbar.Brand>                 
                    <Nav className="d-flex justify-content-end" position="relative">
                      <Nav.Link className="pos">
                      <figure>
                        <Image
                          src={imgLogout}
                          width="20"
                          height="20"
                          className="img-fluid"
                          onClick={this.onLogout}
                        />
                      </figure>
                       
                      </Nav.Link>
                    </Nav>
                </Navbar>

                <Container>
                  <Dropdown className="my-3  text-right">
                    <Dropdown.Toggle
                      variant="danger"
                      id="dropdown-basic"
                    >
                      <Image
                        src={Filtro}
                        width="16"
                        height="16"
                        className="mr-1 img-fluid"
                        alt="Responsive image"
                      />
                      Filtrar
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={this.watchAll}>Todo</Dropdown.Item>
                      <Dropdown.Item onClick={this.watchVideos}>Videos</Dropdown.Item>
                      <Dropdown.Item onClick={this.watchImages}>Imagenes</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Container>
                <Contenido filter={this.state.filter}/>
          </Container>
        );
    }
}

export default menu;