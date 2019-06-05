/**
 * @class La clase archivo crea nuevas instancias de tipo archivo 
 */
class Archivo{
    /**
     * @constructor 
     * @property {number} Id - El id del archivo
     * @property {string} Ruta - Ruta física de la ubicación del archivo
     * @property {date} Fecha - Fecha de creación del archivo
     * @property {string} Tipo - Video o imagen
     * @property {string} RutaAudio - Ruta física del audio
     * @property {string} Comentario - Comentario que acompaña al archivo
     * @property {number} latitud - Ubicación del incidente
     * @property {number} longitud - Ubicación del incidente
     */
    contructor(Id, Ruta, Fecha, Tipo, RutaAudio,Comentario,latidud,longitud){
        this.Id=Id;
        this.Ruta=Ruta;
        this.Fecha=Fecha;
        this.Tipo=Tipo;
        this.Audio=RutaAudio;
        this.Comentario=Comentario;
        this.Latidud=latidud;
        this.Longitud=longitud;

    }
    /**
     * Get de Id
     * @return {number} para el id
     */
    get id(){
        return this.Id;
    }
    /**
     * Get de Ruta
     *  @return {string} para la ruta
     */
    get ruta(){
        return this.Ruta;
    }
    /**
     * Get de Fecha
     *  @return {date} para la fecha
     */
    get fecha(){
        return this.Fecha;
    }
    /**
     * Get de Tipo
     * @return {string} para el tipo
     */
    get tipo(){
        return this.Tipo;
    }
    /**
     * Get de Comentario
     * @return {string} para el comentario
     */
    get comentario (){
        return this.Comentario;
    }
    /**
     * Get de Audio
     * @return {string} para el audio
     */
    get audio (){
        return this.Audio;
    }
    /**
     * Get de Latitud
     * @return {number} para la latitud
     */
    get latitud(){
        return this.Latidud;
    }
    /**
     * Get de Longitud
     * @return {number} para la longitud
     */
    get longitud(){
        return this.Longitud;
    }
}
export default Archivo;