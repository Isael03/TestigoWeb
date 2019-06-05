import React, { Component } from 'react';
import Information from '../../components/Menu/Menu';

/**
 * @class Este componente sirve para mostrar el contenido al operador 
 */
class index extends Component {
    constructor(props){
        super(props);
        this.onLogout=this.onLogout.bind(this);
    }
    /**
     * @description Este metodo retorna al usuario al login
     */
    onLogout() {
        return this.props.history.push("/");
      }
    render() {
        return (
            <div>
                <Information logout={this.onLogout}/>
            </div>
        );
    }
}

export default index;