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
//import db from "../../ObjectConfig/Firebase/FirestoreConfig";
import Operador from "../../ObjectConfig/Operador";
import Institucion from "../../ObjectConfig/Institucion";
import AppContext from '../AppContext'
import firebase from "firebase/app";
import database from '../../ObjectConfig/Firebase/RealtimeDatabase'

/**
 * @class Formulario de login e interaccion
 */
class index extends Component {
  static contextType = AppContext;
  /**
   * @constructor 
   * @property {*} props - Para usar las propiedades
   * @property {*} context - Para usar el contexto
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      institution: "",
      rut: "",
      password: "",
      open: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeIntitution=this.props.changeInstitucion;
    this.onSubmit=this.props.onSubmit;
  }
  /**
   * @fuction Invocar el metodo para recoger datos e iniciar sesion
   * @property {*} - Indica el evento en el que se encuentra
   * @property {boolean} open - variable open que aparece en el render y se usa para cambiar el estado de this.open
   */
  handleSubmit(e, open) {
    e.preventDefault();

    var operador = new Operador(this.state.rut, this.state.password);
     var service =new Institucion(this.state.institution);

     //NOTA: mover a otro sitio e invocarlo aqui

     return firebase.database().ref("Institucion/"+service.id).ref.once("value").then(snapshot => {
      if((snapshot.child(operador.rut).exists()) && (snapshot.child(operador.rut+"/Contrasena").val()).toString() === operador.contraseña){
        this.context.changeValidation(true);
        this.props.onSubmit();
      }else{
        this.setState({ open: !open });
      }
    }).catch(err=>{
        console.log(err);
        this.setState({ open: !open });
    });      
  }
  
  /**
   *@fuction Captar lo escrito en los inputs
   *@property {*} e - evento que se desarrolla 
   */
  handleInputChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
    if(name==="institution"){
      this.context.changeInstitution(value);
    }
  }

  render() {
    const { open } = this.state;
    document.body.style.backgroundColor = "rgb(173, 172, 172)";
    return (
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
                      <Alert variant="danger">
                        <p className="text-center">
                          Datos Incorrectos. Intente de nuevo.
                        </p>
                      </Alert>
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
    );
  }
}

export default index;
