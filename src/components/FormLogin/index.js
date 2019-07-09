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
import Operador from "../../ObjectConfig/Operador";
import Institucion from "../../ObjectConfig/Institucion";
import AppContext from '../AppContext'
import firebase from "firebase/app";
import database from '../../ObjectConfig/Firebase/Firebase'
import bcrypt from 'bcryptjs';
/**
 * @class Formulario de login y validacion de datos con base de datos
 */
class index extends Component {
  static contextType = AppContext;
  /**
   * @constructor 
   * @param {*} props - Propiedades de la clase React
   */
  constructor(props) {
    super(props);
    this.state = {
      institution: "",
      rut: "",
      password: "",
      open: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Password_Verification=this.Password_Verification.bind(this);
  }
  /**
   * @description Metodo para recoger datos del formulario y realizar la comprobacion de estos para iniciar sesion. si estan incorrectos se lanza una alerta
   * @param {*} e - Indica el evento en el que se encuentra, en este caso usado para evitar la recarga de la pagina
   * @param {boolean} open - variable open que aparece en el render y se usa para cambiar el estado de this.open
   */
  handleSubmit(e, open) {
    e.preventDefault();
   /*  bcrypt.hash('123456', 10, function(err, hash) {
      console.log(hash)
    });  */

    var operador = new Operador(this.state.rut, this.state.password);
    var service =new Institucion(this.state.institution);

     firebase.database().ref("Institucion/"+service.id).ref.once("value").then(snapshot => {
      if((snapshot.child(operador.rut).exists())){ 
        this.Password_Verification(operador.contraseña, snapshot.child(operador.rut+"/Contrasena").val(), service.id, open)
      }else{
        this.setState({ open: !open });
      }
    }).catch(err=>{
        console.log(err);
        this.setState({ open: !open });
    });      
  }
  /**
   * @description Verifica que la contraseña encriptada sea igual a la ingresada en el formulario
   * @param {string} password - Contraseña proveniente del formulario
   * @param {string} passwordBD - Contraseña de la BD
   * @param {string} service - Institucion marcada en el formulario
   * @param {boolean} open - Proveniente de la constante definida en el render
   */

  Password_Verification(password, passwordBD, service, open){
    bcrypt.compare(password, passwordBD, (err, res)=> {
      if(res){
        this.context.logged(service); 
      }else{
        this.setState({ open: !open });
      }
  });
  }  
  /**
   *@description Captar lo escrito en los inputs del formulario
   *@param {*} e - evento que se desarrolla (entiendase como el input que esta recibiendo datos)
   */
  handleInputChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {   
    this.context.institutionCreated()
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
