class Archivo{
    contructor(Id, Ruta, Fecha, Tipo){
        this.Id=Id;
        this.Ruta=Ruta;
        this.Fecha=Fecha;
        this.Tipo=Tipo;

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
}
export default Archivo;