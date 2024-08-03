import React, { Component } from 'react'
import TrackList from '../TrackList/TrackList';
import './Playlist.css'
export default class Playlist extends Component {
    constructor(props){
        super(props);

        this.handleNameChange=this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        this.props.onNameChanged(event.target.value);
    }

  render() {
    return (
      <div className='list-box2'>
        <h2>Playlists</h2>
        <input onChange={this.handleNameChange} defaultValue={"New Playlist"}/>
        <div className='track-list'>
        <TrackList
            tracks={this.props.playlistTracks}
            onRemove={this.props.onRemove}
            isRemoval={true}/>
        </div>        
        <div className='button-containar'>
        <button className='save' onClick={this.props.onSave}>Save to Spotify</button>        </div>
      </div>
    )
  }
}
