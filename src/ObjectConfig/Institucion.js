/**
 * @class Esta clase es para instaciar a los servicios de emergencia 
 */
class Institucion{
    /**
     * @constructor 
     * @property {string } id - Corresponde al nombre unico de la institucion
     * @property {string} nombre - Nombre de la institucion
    */
    constructor(id,nombre){
        this.Id=id;
    }
    /**
     * @description Get de id
     * @return {string} 
     */
    get id(){
        return this.Id;
    }
}
export default Institucion;