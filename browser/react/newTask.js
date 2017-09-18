import React, {Component} from 'react';
import axios from 'axios';
import TaskForm from './TaskForm'

export default class NewTask extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const {roommateId} = this.props.match.params;
    return (
      <div className='well'>
        <TaskForm roommateId={roommateId}/>
      </div>
    )
  }
}
