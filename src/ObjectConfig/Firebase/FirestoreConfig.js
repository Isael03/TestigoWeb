/**Realizar conexion con la base de datos firestore de firebase  */
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
apiKey: "AIzaSyDR1M5RNY93THt2mWvZArUYLX-q4XRtwJc",
  authDomain: "testigo-18a8c.firebaseapp.com",  
  projectId: "testigo-18a8c",

});

let db=firebase.firestore();


export default db;