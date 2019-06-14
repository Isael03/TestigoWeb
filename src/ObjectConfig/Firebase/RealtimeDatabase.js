import firebase from 'firebase/app'
import 'firebase/database'

  var config = {
    apiKey: "AIzaSyDR1M5RNY93THt2mWvZArUYLX-q4XRtwJc",
    authDomain: "testigo-18a8c.firebaseapp.com",
    databaseURL: "https://testigo-18a8c.firebaseio.com",
    storageBucket: "testigo-18a8c.appspot.com"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

  export default database;