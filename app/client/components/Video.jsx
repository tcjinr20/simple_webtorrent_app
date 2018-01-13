import React, { Component } from 'react';
import 'mediaelement';

export default class Video extends Component{
  constructor(props){
    super(props)
    this.state = {
      player: {}
    }
  }
  success(media, node, instance) {
	}

	error(media) {
	}
  static closePlayer(){
    this.player.remove()
  }
  componentDidMount(){
    const {MediaElementPlayer} = global;

		if (!MediaElementPlayer) return;

		const options = Object.assign({}, JSON.parse(this.props.options), {
			success: (media, node, instance) => this.success(media, node, instance),
			error: (media, node) => this.error(media, node)
		});

		this.setState({player: new MediaElementPlayer(this.props.id, options)});
  }
  render(){
    return(
      <video
        controls
        id={this.props.id}
        width={this.props.width}
        height={this.props.height}
        poster={(this.props.poster ? props.poster : '')}
				preload={this.props.preload ? this.props.preload : ''}>
					<source src={this.props.source.src} type={this.props.source.type} />
			</video>
    )
  }
}
