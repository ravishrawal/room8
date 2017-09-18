'use strict'
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Tasks from './Tasks.js'

export default class Roommates extends Component{
  constructor(){
    super();
    this.state = {
      roommates:[{name: 'Dude', id: 1, tasks:[]}, {name: 'Sweet', id: 2, tasks:[]}]
    }
  }
  componentDidMount(){
    axios.get('/roommates')
    .then((result)=>{
      this.setState({roommates: result.data})
      console.log('state:', this.state);
    })
  }
  render(){
    const { roommates } = this.state;
    console.log(roommates[0].tasks[0]);
    console.log('ROOMMATES: ', roommates);
    return (
      <div className='col-sm-10'>
        <h2 className='text-center'>Roommates</h2>
        <br/>
        <div className='row'>
        {roommates.map(roommate => {
          return (
          <div className='panel panel-primary col-sm-4' key={roommate.id} style={{margin: '1 0'}}>
            <h4 className='text-center panel-heading' >{roommate.name}</h4>
            <div className='panel-body'>
              <Tasks tasks={roommate.tasks} roommate={roommate} />
            </div>
          </div>
        )})}
        </div>
      </div>
    )
  }
}
