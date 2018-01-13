import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FilesModal from './modals/Files.jsx';
import MediaModal from './modals/Media.jsx';

const filesModal = document.getElementById('files-modal-root');
const mediaModal = document.getElementById('media-modal-root');

export default class ModalPortal extends Component{
  constructor(props){
    super(props)
  }
  componentDidUpdate(){
    if(this.props.action == 'get_files'){
      let elem = document.getElementById('files-modal');
      M.Modal.init(elem).open();
    }else if(this.props.action == 'get_media'){
      let elem = document.getElementById('media-modal');
      M.Modal.init(elem).open();
    }
  }
  render(){
    const { action, magnet } = this.props;

    if(action == 'get_files'){
      return ReactDOM.createPortal(
        <FilesModal {...this.props} />,
        filesModal
      )
    }else if(action == 'get_media'){
      return ReactDOM.createPortal(
        <MediaModal {...this.props} />,
        mediaModal
      )
    }else return null;
  }
}
