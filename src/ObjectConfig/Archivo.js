/**Esta clase es para instanciar los archivos y ver su contenido */
class Archivo{
    contructor(Id, Ruta, Fecha, Tipo, RutaAudio,Comentario,latidud,longitud){
        this.Id=Id;
        this.Ruta=Ruta;
        this.Fecha=Fecha;
        this.Tipo=Tipo;
        this.Audio=RutaAudio;
        this.Comentario=Comentario;
        this.latidud=latitud;
        this.longitud=longitud;

    }
    get Id(){
        return this.Id;
    }
    get Ruta(){
        return this.Ruta;
    }
    get Fecha(){
        return this.Fecha;
    }
    get Tipo(){
        return this.Tipo;
    }
    get Comentario (){
        return this.Comentario;
    }
    get Audio (){
        return this.Audio;
    }
    get latitud(){
        return this.latidud;
    }
    get longitud(){
        return this.longitud;
    }
}
export default Archivo;