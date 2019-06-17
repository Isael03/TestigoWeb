import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

  var config = {
    apiKey: "AIzaSyDR1M5RNY93THt2mWvZArUYLX-q4XRtwJc",
    authDomain: "testigo-18a8c.firebaseapp.com",
    databaseURL: "https://testigo-18a8c.firebaseio.com",
    projectId: "testigo-18a8c",
    storageBucket: "testigo-18a8c.appspot.com",
    messagingSenderId: "652448395046",
    appId: "1:652448395046:web:742327bbf04297c9"
  };
  firebase.initializeApp(config);


  var database = firebase.database();
  var storage = firebase.storage();

  export default {database, storage};