import React, { Component } from 'react';
import Information from '../../components/Menu/Menu';

class index extends Component {
    constructor(props){
        super(props);
        this.onLogout=this.onLogout.bind(this);
    }

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