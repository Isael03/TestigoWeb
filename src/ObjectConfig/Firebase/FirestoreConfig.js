import firebase from 'firebase/app';
import 'firebase/firestore';

/** 
 *Conexion con la base de datos firestore de firebase 
 */
firebase.initializeApp({
apiKey: "AIzaSyDR1M5RNY93THt2mWvZArUYLX-q4XRtwJc",
  authDomain: "testigo-18a8c.firebaseapp.com",  
  projectId: "testigo-18a8c",

});
/**
 *@param {*} db  
  *@type {*}
 *@description Se retorna para que se pueda realizar la conexion a la base de datos desde otros modulos
 */

let db=firebase.firestore();


export default db;