import React, { Component, Fragment } from 'react';
import io                     from 'socket.io-client';
import Header                 from '../components/Header.jsx';
import SearchList             from '../components/SearchList.jsx';
import MediaModal             from '../components/modals/Media.jsx';
import ModalPortal            from '../components/ModalPortal.jsx';

export default class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      torrents: [],
      modalData: {},
      dataReceived: false
    }
    this.socket = io('http://localhost:3000', {
      transports: ['websocket']
    })
    this.socket.on('files received', (data)=>{
      if(Array.isArray(data)) this.setState({torrents: data, dataReceived: true})
      else torrent_collection.innerHTML = `<h1>${data}</h1>`;
    })
    this.socket.on('error', (data)=>{
      Materialize.toast(data.message, 5000)
    })
    this.openModal = this.openModal.bind(this);
  }
  openModal(data){
    this.setState({modalData: data})
  }
  render(){
    return(
      <Fragment>
        <Header socket={this.socket} dataReceived={this.state.dataReceived} />
        <SearchList torrents={this.state.torrents} openModal={this.openModal}  />
        <ModalPortal
          socket={this.socket}
          action={this.state.modalData.action}
          magnet={this.state.modalData.magnet}
          openModal={this.openModal}
        />
      </Fragment>
    )
  }
}
