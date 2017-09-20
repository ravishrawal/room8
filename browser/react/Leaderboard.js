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
    .then(res=> {
      console.log('RES: ', res);
      this.setState({roommateStats:res.data})
    })
  }
  render(){
    const {roommateStats} = this.state
    const lister= function(key){
      return roommateStats.map((roommate)=>{
        return (
          <li>{roommate[key]}</li>
        )
      })
    }
    return (
      <div className='row'>
        <div className='col-sm-3'>
          <li>Name</li>
          {
            lister('name')
          }
        </div>
        <div className='col-sm-3'>
          <li>Completed</li>
          {
            lister('completed')
          }
        </div>
        <div className='col-sm-3'>
          <li>Pending</li>
          {
            lister('Pending')
          }
        </div>
      </div>
    )
  }
}
