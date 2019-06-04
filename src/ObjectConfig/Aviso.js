
class Aviso{

    contructor(Id, IdArchivo, Comentario, RutaAudio, Institucion, latitud, longitud){
        this.Id= Id;
        this.Archivo= IdArchivo;
        this.Comentario=Comentario;
        this.Audio=RutaAudio;
        this.Institucion=Institucion;
        this.latidud=latitud;
        this.longitud=longitud;
	    	
    }
    get Id (){
        return this.Id;
    }
    get Archivo (){
        return this.Archivo;
    }
    get Comentario (){
        return this.Comentario;
    }
    get Audio (){
        return this.Audio;
    }
    get Institucion(){
        return this.Institucion;
    }
    get latitud(){
        return this.latidud;
    }
    get longitud(){
        return this.longitud;
    }

}export default Aviso;
