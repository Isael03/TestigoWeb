//Componentes de react
import React, { Component } from 'react';
//Componentes globales
import Contenido from './Global/Contenido'
import Mapa from './Global/Mapa'
//CSS
import './Css/dem.css'
import {
    Navbar,
    Dropdown,
    Container,
    Nav,
    Badge,
    Image,
    Row,
    Col
} from 'react-bootstrap';

//Accesorios
import Filtro from './Imagenes/filter-icon.png'
import Logout from './Imagenes/logout.png'
class menu extends Component {
    render() {
        //Cambiar de color el body a blanco
        document.body.style.backgroundColor = "white";
        return (
          <Container id="home" fluid>
            <Row className="justify-content-md-center">
              <Col>
              <Navbar
              collapseOnSelect
              expand="lg"
              bg="light"
              variant="dark"
              className="border-bottom border-danger d-flex"
            >
              <Navbar.Brand href="#home" >
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
              <Navbar.Collapse id="responsive-navbar-nav" >
                <Nav > 
                  <Nav.Link href="/" className="pos">
                      <svg
                        id="i-signout"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        width="32"
                        height="32"
                        fill="none"
                        stroke="gray"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        className="img-fluid"
                     
                      >
                        <path d="M28 16 L8 16 M20 8 L28 16 20 24 M11 28 L3 28 3 4 11 4" />
                      </svg>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

            <Container>
              <Dropdown className="my-3  text-right">
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
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
              </Col>
            </Row>
            
          </Container>
        );
    }
}

export default menu;