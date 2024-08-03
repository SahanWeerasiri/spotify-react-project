import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../utils/Spotify';
import SearchResults from '../SearchResults/SearchResults'

class App extends React.Component{
  constructor(props){
    super(props);

    this.state={
      SearchResults:[],
      playlistName:"New Playlist",
      playlistTracks:[]
    }

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistNAme = this.updatePlaylistNAme.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.removeTrackSearch = this.removeTrackSearch.bind(this);
    this.doThese = this.doThese.bind(this);

    Spotify.getAccessToken();
  }

  search(term){
    Spotify.search(term).then(SearchResults=>{
      this.setState({
        SearchResults:SearchResults
      });
    });
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(tracks.find(currentTrack => currentTrack.id===track.id)){
      return;
    }
    tracks.push(track);
    this.setState({
      playlistTracks:tracks
    });
  }

  removeTrack(track){
    let tracks= this.state.playlistTracks;
    let trackSearch = this.state.SearchResults;
    tracks = tracks.filter(currentTrack=>currentTrack.id!==track.id);
    trackSearch.unshift(track);
    this.setState({
      playlistTracks:tracks,
      SearchResults:trackSearch
    });
  }

  removeTrackSearch(track){
    let tracks=this.state.SearchResults;
    tracks=tracks.filter(currentTrack=>currentTrack.id!==track.id);
    this.setState({
      SearchResults:tracks
    });
  }

  doThese(track){
    this.addTrack(track);
    this.removeTrackSearch(track);
  }

  updatePlaylistNAme(name){
    this.setState({
      playlistName:name
    });
  }

  savePlaylist(){
    const tracklist = this.state.playlistTracks.map(track=>track.uri);
    Spotify.savePlaylist(this.state.playlistName,tracklist).then(()=>{
      this.setState({
        playlistName:"New Playlist",
        playlistTracks:[]
      });
    });
  }

  render(){
    return(
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className='App-body'>
          <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack}/>
          <Playlist playlistTracks={this.state.playlistTracks} onNameChanged={this.updatePlaylistNAme} onRemove={this.removeTrack} onSave={this.savePlaylist}/>
        </div>
      </div>
    );
  }
}

export default App;