import React, { Component } from "react";
import {
  Form,
  Card,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Collapse
} from "react-bootstrap";
import db from "../../ObjectConfig/Firebase/FirestoreConfig";
import Operador from "../../ObjectConfig/Operador";
import Institucion from "../../ObjectConfig/Institucion";
import ErrorMessage from "../ErrorMessage";
import { handleError } from "video-react/lib/actions/video";

class index extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      institution: "",
      rut: "",
      password: "",
      open: false
    };
    this.error = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //Invocar el metodo para acceder al dashboard
  handleSubmit(e, open) {
    e.preventDefault();
    var operador = new Operador(this.state.rut, this.state.password);
    //var institucion =new Institucion(this.state.institution);
    //console.log(institucion.Nombre);
    try {
      var confirm = db
        .collection("Institucion")
        .doc(this.state.institution)
        .collection("Miembros")
        .doc(operador.rut);
    } catch (error) {
      console.error(error);
      this.setState({ open: !open });
    }

    try {
      var getDoc = confirm
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("No such document!");
            this.setState({ open: !open });
          } else {
            //console.log('Document data:', doc.data());
            if (doc.data().contraseña === operador.Contraseña) {
              this.props.onSubmit();
            } else {
              this.setState({ open: !open });
            }
          }
        })
        .catch(err => {
          console.log("Error getting document", err);
          //
        });
    } catch (error) {}

    /*
        this.setState({
          institution: 'Institucion',
          rut: '',
          password: ''
        }); */
  }

  /**Captar lo escrito en los inputs */
  handleInputChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { open } = this.state;
    /** Cambiar de color el body a gris*/
    document.body.style.backgroundColor = "rgb(173, 172, 172)";
    return (
      <div>
        <Container>
          <Row className="justify-content-center align-items-center minh-90">
            <Col xs={12} md={5}>
              <Card className="card-login mx-auto mt-5 pb-4">
                <Card.Body>
                  <Card.Title className="text-center mt-3">
                    <h2>Iniciar sesión</h2>
                  </Card.Title>
                  <Collapse in={this.state.open} height={1}>
                    <div id="example-collapse-text">
                      <ErrorMessage />
                    </div>
                  </Collapse>
                  <Form
                    className="container col-11 pt-3"
                    onSubmit={this.handleSubmit}
                    //action='./menu'
                  >
                    <Form.Group
                      controlId="formGridState"
                      onChange={this.handleInputChange}
                      value={this.state.institution}
                    >
                      <Form.Control as="select" name="institution">
                        <option>Institución</option>
                        <option>Carabineros</option>
                        <option>Bomberos</option>
                        <option>Ambulancias</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group
                      controlId="formBasicEmail"
                      onChange={this.handleInputChange}
                      value={this.state.rut}
                    >
                      <Form.Control
                        name="rut"
                        type="text"
                        placeholder="Rut"
                        //required
                      />
                    </Form.Group>
                    <Form.Group
                      controlId="formBasicPassword"
                      onChange={this.handleInputChange}
                      value={this.state.password}
                    >
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        //required
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      className="btn btn-dark btn-block"
                      type="submit"
                      aria-expanded={open}
                    >
                      Ingresar
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default index;
