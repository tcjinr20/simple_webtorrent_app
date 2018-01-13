import React, { Component } from 'react';
import Loader from './Loader.jsx';

export default class Header extends Component{
  constructor(props){
    super(props)
    this.getTorrents = this.getTorrents.bind(this)
    this.isNeedLoader = this.isNeedLoader.bind(this)
    this.state = {
      isWaitData: false
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({isWaitData: !nextProps.dataReceived})
  }
  getTorrents(e){
    e.preventDefault()
    const regex = /[A-za-zА-яа-я ].{2,}/,
    query = search.value;
    if(regex.test(query)){
      torrent_collection.focus()
      this.props.socket.emit('scrape', {query: encodeURI(query)})
      this.setState({isWaitData: true})
    }else{
      Materialize.toast('Request value must be greater than or equal two characters!', 5000)
    }
  }
  isNeedLoader(){
    if(this.state.isWaitData){
      return <Loader />
    }
  }
  render(){
    return(
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper purple darken-4">
            <form onSubmit={this.getTorrents}>
              <div className="input-field">
                <input id="search" type="search" />
                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                <i onClick={this.getTorrents} className="material-icons">send</i>
              </div>
            </form>
            {this.isNeedLoader()}
          </div>
        </nav>
      </div>
    )
  }
}
