import React, { Component } from 'react'
import './SearchBar.css'

export default class SearchBar extends Component {
  constructor(props){
    super(props);

    this.state={
      term:""
    };

    this.handleTermChange=this.handleTermChange.bind(this);
    this.search=this.search.bind(this);
    this.handleEnter=this.handleEnter.bind(this);

  }

  search(){
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event){
    this.setState({
      term:event.target.value
    });
  }

  handleEnter(event){
    if(event.keyCode ===13){
      this.search();
    }
  }

  render() {
    return (
      <div className='search-bar'>
        <input className='search' placeholder='Enter the key word...' onChange={this.handleTermChange} onKeyUp={this.handleEnter}/>
        <button className='button' onClick={this.search}>Search</button>
      </div>
    )
  }
}
