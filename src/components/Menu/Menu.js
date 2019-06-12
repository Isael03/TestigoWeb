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
import WatchVideos from "../Contenido/VideoContent";
import SeeImages from "../Contenido/ImageContent";
import firebase from "firebase/app";
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
      miembros: [],
      filesdb: []
    };
    this.Logout = this.Logout.bind(this);
    this.watchAll = this.watchAll.bind(this);
    this.watchVideos = this.watchVideos.bind(this);
    this.watchImages = this.watchImages.bind(this);
    this.handleChangeView = this.handleChangeView.bind(this);
  }
  componentDidMount() {
    var list = [];
    const refArchivos = firebase.database().ref("/Archivos/");
    refArchivos.on("value", snapshot => {
      list = snapshot.val();
      this.setState({
        filesdb: list
      });
    });
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
   * @description handleChangeView cambia el contenido de la pantalla dependediendo del estado del filter
   * @param {string} filter - proviene de this.state.filter
   */
  handleChangeView(filter) {
    var View;
    if (filter === "all") {
      View = this.state.filesdb.map((filesdb, i) => { 

        return <Contenido tipo={filesdb.Tipo} fecha={filesdb.Fecha} key={i} comentario={filesdb.Comentario} audio={filesdb.Audio} archivo={filesdb.Archivo} />;
      })
      //View = <Contenido  />;
    }
    if (filter === "only-videos") {
      View = <WatchVideos filter={this.state.filter} />;
    }
    if (filter === "only-images") {
      View = <SeeImages filter={this.state.filter} />;
    }
    return View;
  }

  render() {
    this.context.Validated();
    console.log(this.state.filter);
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
