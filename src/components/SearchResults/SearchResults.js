import React, { Component } from 'react'
import TrackList from '../TrackList/TrackList';
import './SearchResults.css'

export default class SearchResults extends Component {
  render() {
    return (
      <div className='list-box'>
        <h2>Results</h2>
        <TrackList
            tracks={this.props.SearchResults}
            onAdd={this.props.onAdd}/>
      </div>
    )
  }
}
