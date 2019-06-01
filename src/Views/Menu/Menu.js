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
class menu extends Component {
  constructor(props) {
    super(props);
    this.onLogout=this.onLogout.bind(this);
  }
  
  onLogout() {
    this.props.history.push('/');
  }

    render() {
        //Cambiar de color el body a blanco
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
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="d-flex justify-content-end">
                      <Nav.Link  className="pos">
                        <svg
                          id="i-signout"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          width="20"
                          height="20"
                          fill="none"
                          stroke="gray"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                          className="img-fluid"
                          onClick={this.onLogout}
                        >
                          <path d="M28 16 L8 16 M20 8 L28 16 20 24 M11 28 L3 28 3 4 11 4" />
                        </svg>
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
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
                      <Dropdown.Item>Todo</Dropdown.Item>
                      <Dropdown.Item>Videos</Dropdown.Item>
                      <Dropdown.Item>Imagenes</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Container>
                <Contenido />
          </Container>
        );
    }
}

export default menu;