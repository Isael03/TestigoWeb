import React, { Component } from 'react';
import {Alert} from "react-bootstrap";

class index extends Component {
    render() {
        return (
            <Alert variant="danger">
            <p className="text-center">Datos Incorrectos. Intente de nuevo.</p>
          </Alert>
        );
    }
}

export default index;