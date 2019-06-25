import firebase from 'firebase/app'
import 'firebase/database'
/**
 * @description Inicializa la conexion con el servicio de base de datos de firebase
 * @param {*} config - Contiene la informacion para acceder a Realtime Database de firebase
 */
  var config = {
    apiKey: "AIzaSyAQmufnViOw6WWt6O6xyYjt6eBQcXSn_EQ",
    authDomain: "pseudogram-cd82f.firebaseapp.com",
    databaseURL: "https://pseudogram-cd82f.firebaseio.com",
    projectId: "pseudogram-cd82f",
    storageBucket: "pseudogram-cd82f.appspot.com",
    messagingSenderId: "513649964517",
    appId: "1:513649964517:web:d76c3437f9d9f3fc"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

  export default database;