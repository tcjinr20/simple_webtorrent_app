import React, { Component } from 'react';
import Loader from './Loader.jsx';

export default class TorrentFileList extends Component{
  constructor(props){
    super(props)
    this.state = {
      files: []
    }
    this.modalTrigger = this.modalTrigger.bind(this);
  }
  componentDidMount(){
    if(this.props.magnet.length){
      this.props.socket.emit('getTorrentFiles', { magnet: this.props.magnet })
      this.props.socket.on('torrentFilesReceived', (data)=>{
        if(Array.isArray(data)) this.setState({files: data})
        else file_collection.innerHTML = `<h1>${data}</h1>`
      })
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.magnet.length){
      nextProps.socket.emit('getTorrentFiles', { magnet: nextProps.magnet })
      nextProps.socket.on('torrentFilesReceived', (data)=>{
        if(Array.isArray(data)) this.setState({files: data})
        else file_collection.innerHTML = `<h1>${data}</h1>`
      })
      this.setState({ files: [] })
    }
  }
  modalTrigger(){
    this.props.openModal({
      action: 'get_media',
      magnet: this.props.magnet
    })
  }
  renderFiles(){
    let files = [];
    if(this.props.magnet.length && this.state.files.length){
    for(let file of this.state.files){
      files.push(
        <li key={Math.random()} className="collection-item truncate">
          <span className="badge deep-purple darken-3">{file.index}</span>
          <div className='truncate'>{file.name}</div>
          <div className='secondary-content'>
            <i className='material-icons' onClick={this.modalTrigger}>play_circle_filled</i>
          </div>
        </li>
      )
    }
    return files;
  }else{
    return <Loader />
  }
  }
  render(){
    return(
      <ul tabIndex='0' id='file_collection' className="collection">
        {this.renderFiles.call(this)}
      </ul>
    )
  }
}
