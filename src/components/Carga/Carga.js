import React, { Component } from 'react';
import {
    Image, Container, Row, Col
  } from "react-bootstrap";
import logo from './Image/Testigo.jpg'

class Carga extends Component {
    render() {
        document.body.style.backgroundColor = "white";
        return (
            <Container>
                <Row className="justify-content-center align-items-center minh-90">
                    <Col className="col-lg-12 text-center">
                        <Image src={logo} className="App-logo" roundedCircle></Image>         
                        <div className="font-weight-bold">Cargando...</div>                           
                    </Col>
                </Row>               
           </Container>
        );
    }
}

export default Carga;