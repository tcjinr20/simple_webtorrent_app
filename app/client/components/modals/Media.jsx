import React, { Component } from 'react';
import Video from '../Video.jsx';

export default class FilesModal extends Component{
  render(){
    return(
      <div id="media-modal" className="modal">
        <div className="modal-content">
          <a href="javascript:void(false)" className="modal-action modal-close">
            <i className="material-icons">close</i>
          </a>
          <Video
           id="player1"
           mediaType="video"
           preload="none"
           width="100%"
           height="400"
           source={{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4'}}
           options={JSON.stringify({})}
         />
        </div>
      </div>
    )
  }
}
