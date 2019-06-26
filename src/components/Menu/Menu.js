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
import Carga from '../Carga/Carga'
import ShowVideos from '../Contenido/ContenidoVideo'
import ShowImages from '../Contenido/ContenidoImagen'


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
      loading: true,
      filter: "all",
      filesdb: [],
      institucion: ""
    }
    this.Logout = this.Logout.bind(this);
    this.watchAll = this.watchAll.bind(this);
    this.watchVideos = this.watchVideos.bind(this);
    this.watchImages = this.watchImages.bind(this);
    this.handleChangeView = this.handleChangeView.bind(this);
    this.getFile = this.getFile.bind(this); 
    this.css = this.css.bind(this)
  }
  /**
   * @description Metodo que se inicia cuando el componente se monta. Recoje los datos de la bd y los traspasa al estado filesdb
   */
  componentDidMount() {
    var cookies = new Cookies();
     try {
      const refArchivos = firebase.database().ref("/Archivos/");
      refArchivos
        .orderByChild("Institucion/" + cookies.get("institution"))
        .equalTo(true)
        .on("value", snapshot => {
          var list =
            snapshot.val() !== null
              ? Object.values(snapshot.val()) : snapshot.val();
          this.setState({           
            filesdb: list,
            loading: false,
            institucion:cookies.get("institution")           
          });
        });
    } catch (error) {
      console.log(error);
      this.setState({loading: false});
    } 
  }

  /**
   * @description Metodo que se ejecuta al cerrar el componente. Este cierra la conexion con la bd y deja de actualizar el estado filesdb
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
   * @description Obtiene la extension del archivo y devuelve un array con direcciones de videos o imagenes, dependediendo del estodo de filter
   * @param {array} filename - Corresponde a la ruta del archivo
   * @return {array}
   */
  getFile(filename) {

    const video_extension = ["mp4", "3gp", "3gpp" , "3gpp2" , "mpeg", "mov"]; //webm mpg avi mkv m4v 
    const image_extension = ["jpg", "png","jpeg"];

    const array = filename.map((filename) =>{
      if(this.state.filter==="only-videos"){
        for (var i = 0; i < video_extension.length; i++) {
          if (video_extension[i] === filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase()) {
              return filename 
          }
        } 
      }
      if(this.state.filter==="only-images"){
        for (var j = 0; j < image_extension.length; j++) {
          if (image_extension[j] === filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase()) {
              return filename
          }
        } 
      }     
    }) 
    const result = array.filter(array => array !== undefined);
    return result;
  }

  
  /**
   * @description handleChangeView cambia el contenido de la pantalla dependediendo del estado del filter
   * @param {string} filter - proviene de this.state.filter
   * @return {Array}
   */
  handleChangeView(filter) {
    if (this.state.filesdb !== null) {
      try {
        var View;
        //Videos e imagenes
        if (filter === "all") {
          View = this.state.filesdb
            .map((filesdb, i) => {
              return (                
                <Contenido
                  fecha={filesdb.Fecha}
                  key={i}
                  comentario={filesdb.Comentario}
                  audio={filesdb.Audio}
                  archivo={filesdb.Archivo}
                  latitud={filesdb.Ubicacion.Latitud}
                  longitud={filesdb.Ubicacion.Longitud}
                />
            );
            })
            .reverse();
        }
        //Para videos
        if (filter === "only-videos") {
          View = this.state.filesdb
            .map((filesdb, i) => {     
              if(this.getFile(filesdb.Archivo).length !== 0){
                return (
                  <ShowVideos
                    fecha={filesdb.Fecha}
                    key={i}
                    comentario={filesdb.Comentario}
                    audio={filesdb.Audio}
                    archivo={this.getFile(filesdb.Archivo)}
                    latitud={filesdb.Ubicacion.Latitud}
                    longitud={filesdb.Ubicacion.Longitud}
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
              if(this.getFile(filesdb.Archivo).length >0){
                return (
                  <ShowImages
                    fecha={filesdb.Fecha}
                    key={i}
                    comentario={filesdb.Comentario}
                    audio={filesdb.Audio}
                    archivo={this.getFile(filesdb.Archivo)}
                    latitud={filesdb.Ubicacion.Latitud}
                    longitud={filesdb.Ubicacion.Longitud}
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
  css(){
    if(this.state.institucion==="Carabineros"){
      return "px-3 badge badge-success"
    }
    if(this.state.institucion==="Bomberos"){
      return "px-3 badge badge-danger"
    }
    if(this.state.institucion==="Ambulancias"){
      return "px-3 badge badge-secondary"
    }

  }
  render() {
    this.context.Validated();   
    if(this.state.loading){return (<Carga/>);}
    document.body.style.backgroundColor = "white";
    return (
      <Container fluid className="p-0">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="light"
          variant="dark"
          className="border-bottom border-danger d-flex"
        >
          <Navbar.Brand href="#home">
          
          <h4 text="light">              
              <Badge variant="secondary" className={this.css()}>
                Testigo {this.state.institucion}
              </Badge>
            </h4>
          
            
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
