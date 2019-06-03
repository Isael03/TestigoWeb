import React, { Component } from "react";
import AudioPlayer from "react-h5-audio-player";
import PropTypes from 'prop-types';

class index extends Component {
constructor(props) {
    super(props);
    this.ruta=this.props.ruta;
}

  render() {
    return (
      <div>
        <AudioPlayer
          className="progress-bar-wrapper toggle-play-wrapper flex"
          src={this.ruta}
          onPlay={e => console.log("Play")}
        />
      </div>
    );
  }
}
index.propTypes = {
    ruta: PropTypes.string
  };
export default index;
