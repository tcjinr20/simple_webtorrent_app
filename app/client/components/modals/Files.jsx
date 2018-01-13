import React, { Component } from 'react';
import TorrentFileList from '../TorrentFileList.jsx';

export default class FilesModal extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div id="files-modal" className="modal bottom-sheet">
        <div className="modal-content">
          <h4></h4>
          <TorrentFileList {...this.props} />
        </div>
      </div>
    )
  }
}
