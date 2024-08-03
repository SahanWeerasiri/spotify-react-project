import React, { Component } from 'react'
import './Track.css'

export default class Track extends Component {
  constructor(props){
    super(props);

    this.state={
      term:""
    };

    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);

  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }

  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (
        <button className="plus" onClick={this.removeTrack}> - </button>
      );
    }
    return (
      <button className="plus" onClick={this.addTrack}> + </button>
    );
  }

  render() {
    return (
      <div className='track'>
        <div className='track-sub'>
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
          <iframe className='embed'
            src={`https://open.spotify.com/embed/track/${this.props.track.id}`}
            width="300"
            height="80"
            frameBorder="0"
            allowTransparency="true"
            allow="encrypted-media"
            title="preview"
          />
        </div>
        <div className='buttons'>
        {this.renderAction()}
        </div>
      </div>
    );
  }
}
