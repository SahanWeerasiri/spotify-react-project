import React, { Component } from 'react'
import Track from '../Track/Track'
import './TrackList.css'
export default class TrackList extends Component {
  render() {
    return (
      <div  className='trackbox'>
        {this.props.tracks.map(track=>{
            return( <Track
                track={track}
                key={this.props.onAdd}
                isRemoval={this.props.isRemoval}
                onRemove={this.props.onRemove}
                onAdd={this.props.onAdd}
            />               
            );
        })}
      </div>
    )
  }
}
