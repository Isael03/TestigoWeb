import React, { Component } from "react";
import Contenido from "../Contenido/Contenido";
import {
  Navbar,
  Dropdown,
  Container,
  Nav,
  Badge,
  Image
} from "react-bootstrap";
import Filtro from "./Image/filter-icon.png";
import imgLogout from "./Image/logout.png";
import AppContext from "../AppContext";
import firebase from "firebase/app";
import Cookies from "universal-cookie";
/**
 *@description Este componente sirve para mostrar el contenido que se encuentra en la BD
 */
class menu extends Component {
  static contextType = AppContext;

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      filter: "all",
      filesdb: []
    };
    this.Logout = this.Logout.bind(this);
    this.watchAll = this.watchAll.bind(this);
    this.watchVideos = this.watchVideos.bind(this);
    this.watchImages = this.watchImages.bind(this);
    this.handleChangeView = this.handleChangeView.bind(this);
    this.getFileExtension = this.getFileExtension.bind(this);
  }
  /**
   * @description Metodo que se inicia cuando el componente se monta. Recoje los datos de la bd y los traspasa al estado filesdb
   */
  componentDidMount() {    
    try {
      var list=[];
      var cookies = new Cookies();
      const refArchivos = firebase.database().ref("/Archivos/");
      refArchivos.orderByChild("Institucion/" + cookies.get("institution"))
        .equalTo(true).on("value", snapshot => {
          list = (snapshot.val()  !== null) ? Object.values(snapshot.val()) : snapshot.val();                       
          console.log(list);
          this.setState({
            filesdb: list 
          });         
        });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description Metodo que se ejecuta al cerrar el componente. Este cierra la conexion con la bd y deja de actualizar el estado.
   */
  componentWillUnmount() {
      const refArchivos = firebase.database().ref("/Archivos/");
      refArchivos.off();
  }

  /**
   * @description Desloguearse, invoca el metodo desde el componente Dashboard
   */
  Logout() {
    this.props.logout();
  }
  /**
   * @description wacthAll cambia el estado del filtro a "all"
   */
  watchAll() {
    this.setState({
      filter: "all"
    });
  }
  /**
   *@description wacthVideos cambia el estado del filtro a "only-videos"
   */
  watchVideos() {
    this.setState({
      filter: "only-videos"
    });
  }
  /**
   *@description wacthImages cambia el estado del filtro a "only-images"
   */
  watchImages() {
    this.setState({
      filter: "only-images"
    });
  }
  /**
   * @description Obtiene la extension del archivo y devuelve si corresponde a video o imagen
   * @param {string} filename - Corresponde a la ruta del archivo
   * @return {string}
   */
  getFileExtension(filename) {
    var extension = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
    var type = extension === "mp4" ? "Video" : "Imagen";
    return type;
  }
  /**
   * @description handleChangeView cambia el contenido de la pantalla dependediendo del estado del filter
   * @param {string} filter - proviene de this.state.filter
   */
  handleChangeView(filter) {
    if(this.state.filesdb !== null){
      try {
        var View;
        //Videos e imagenes
        if (filter === "all") {
          View = this.state.filesdb.map((filesdb, i) => {
              return (
                <Contenido
                  fecha={filesdb.Fecha}
                  key={i}
                  comentario={filesdb.Comentario}
                  audio={filesdb.Audio}
                  archivo={filesdb.Archivo}
                />
              );
            })
            .reverse();
        }
        //Para videos
        if (filter === "only-videos") {
          View = this.state.filesdb
            .map((filesdb, i) => {
              if (this.getFileExtension(filesdb.Archivo) === "Video") {
                return (
                  <Contenido
                    fecha={filesdb.Fecha}
                    key={i}
                    comentario={filesdb.Comentario}
                    audio={filesdb.Audio}
                    archivo={filesdb.Archivo}
                  />
                );
              }
            })
            .reverse();
        }
        //Para imagenes
        if (filter === "only-images") {
          View = this.state.filesdb
            .map((filesdb, i) => {
              if (this.getFileExtension(filesdb.Archivo) === "Imagen") {
                return (
                  <Contenido
                    fecha={filesdb.Fecha}
                    key={i}
                    comentario={filesdb.Comentario}
                    audio={filesdb.Audio}
                    archivo={filesdb.Archivo}
                  />
                );
              }
            })
            .reverse();
        }
        return View;
      } catch (error) {
        console.log(error);
      }
    }
    
  }

  render() {
    this.context.Validated();
    document.body.style.backgroundColor = "white";
    return (
      <Container id="home" fluid className="p-0">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="light"
          variant="dark"
          className="border-bottom border-danger d-flex"
        >
          <Navbar.Brand href="#home">
            <h3 text="light">
              <Badge variant="secondary" className="px-5 badge badge-secondary">
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
                  onClick={this.Logout}
                />
              </figure>
            </Nav.Link>
          </Nav>
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
              <Dropdown.Item onClick={this.watchAll}>Todo</Dropdown.Item>
              <Dropdown.Item onClick={this.watchVideos}>Videos</Dropdown.Item>
              <Dropdown.Item onClick={this.watchImages}>Imagenes</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
        {this.handleChangeView(this.state.filter)}
      </Container>
    );
  }
}

export default menu;
