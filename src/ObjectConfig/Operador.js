class Operador{
    constructor(rut, contraseña) {
            this.Rut=rut;
            this.Contraseña=contraseña;
        }

    get rut(){
        return this.Rut;
    }
    get contraseña(){
        return this.Contraseña;
    }
    imprimir(){
        console.log("Hola mundo");
    }
}

export default Operador;