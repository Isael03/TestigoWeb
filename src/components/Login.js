//Componentes de react
import React, { Component } from 'react';
//CSS
import './Css/login.css';
import {
    Form,
    Card,
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap'


class login extends Component {
 
    render() {      
        //Cambiar de color el body a gris
        document.body.style.backgroundColor = "rgb(173, 172, 172)"
        return (
          <Container>
            <Row className="justify-content-center align-items-center minh-90">
              <Col xs={12} md={5}>
                <Card className="card-login mx-auto mt-5 pb-4">
                  <Card.Body >
                    <Card.Title className="text-center mt-3">
                      <h2>Iniciar sesión</h2>
                    </Card.Title>
                    <Form
                      className="container col-11 pt-3"
                      action='./menu'
                    >
                      <Form.Group controlId="formGridState">
                        <Form.Control as="select">
                          <option>Institución</option>
                          <option>Carabineros</option>
                          <option>Bomberos</option>
                          <option>Ambulancias</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          placeholder="Rut"
                          className=""
                          //required
                          />
                         
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Control
                          type="password"
                          placeholder="Contraseña"
                          //required
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        className="btn btn-dark btn-block"
                        type="submit"
                        >
                        
                        Ingresar
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        );
    }
}
export default login;