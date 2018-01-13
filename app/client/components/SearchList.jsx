import React, { Component } from 'react';
import 'materialize-css/dist/js/materialize.min.js';

import TorrentFileList from './TorrentFileList.jsx';

export default class SearchList extends Component{
  constructor(props){
    super(props)
    this.modalTrigger = this.modalTrigger.bind(this);
  }
  modalTrigger(e){
    let parent = e.target.parentElement.parentElement;
    this.props.openModal({
      action: 'get_files',
      magnet: parent.id
    })
  }
  renderTorrents(){
    let torrents = [];
    for(let torrent of this.props.torrents){
      torrents.push(
        <li id={torrent.magnet} key={Math.random()} className='collection-item'>
          <div className='truncate title'>{torrent.title}</div>
          <div className='secondary-content'>
            <i className='material-icons show-more' onClick={this.modalTrigger}>more_vert</i>
            <a href={torrent.magnet} className="magnet"></a>
            <span className="badge deep-purple darken-3">{torrent.size}</span>
            <span className="badge green accent-4">{torrent.seeds}</span>
            <span className="badge grey">{torrent.peers}</span>
          </div>
      </li>
      )
    }
    return torrents;
  }
  render(){
    return(
      <ul tabIndex='0' id='torrent_collection' className="collection">
        {this.renderTorrents.call(this)}
      </ul>
    )
  }
}
