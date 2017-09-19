import React, {Component} from 'react';
import axios from 'axios';

export default class Leaderboard extends Component{
  constructor(){
    super();
    this.state={
      roommateStats:[]
    }
  }
  componentDidMount(){
    axios.get('/leaderboard')
    .then(res=> this.setState({roommateStats:res.data}))
    .then(()=>console.log('leaderboard state: ', this.state))
  }
  render(){
    console.log('leaderboard state: ', this.state)
    return (
      <div className='row'>
        <div className='col-sm-3'>
          <li>YO: {this.state.roommateStats}</li>
        </div>
        <div className='col-sm-3'>
        </div>
        <div className='col-sm-3'>
        </div>
      </div>
    )
  }
}
