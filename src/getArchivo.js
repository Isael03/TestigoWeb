import firebase from "firebase/app";
import Cookies from "universal-cookie";

export function getData(){  
    try {
        var cookies = new Cookies();
        const refArchivos = firebase.database().ref("/Archivos/");
        refArchivos
          .orderByChild("Institucion/" + cookies.get("institution"))
          .equalTo(true)
          .on("value", snapshot => {
             var list = 
               snapshot.val() !== null
                ? Object.values(snapshot.val()) : snapshot.val();    
          });
      } catch (error) {
        console.log(error);
      }
}