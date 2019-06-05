/**
 *@class Esta clase es para instanciar al los operadores de los servicios de emergencia 
 */
class Operador{
    /**
     * @constructor
     * @param {string} rut 
     * @param {string} contraseña 
     */
    constructor(rut, contraseña) {
            this.Rut=rut;
            this.Contraseña=contraseña;
        }
    /**
     * @description Get de rut
     * @return {string} 
     */
    get rut(){
        return this.Rut;
    }
     /**
     * @description Get de contraseña
     * @return {string} 
     */
    get contraseña(){
        return this.Contraseña;
    }
}

export default Operador;