import React, { Component } from 'react';
import {Player} from 'video-react';
import '../../../node_modules/video-react/dist/video-react.css'
/**
 * @description Este componente muestra el reproductor de video 
 */
class index extends Component {
    render() {
        return (
            <div>
                <Player
                playsInline
                src='/Videos/trailer_hd.mp4'
                fluid={false}
                className="w-100"
                width={480}
                height={260}
                >                   
                </Player>
            </div>
        );
    }
}

export default index;