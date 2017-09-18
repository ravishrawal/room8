import React, { Component } from 'react';
import Task from './Task.js';
import { Link } from 'react-router-dom';

export default class Tasks extends Component{
  render(){
    const { tasks, roommate } = this.props
    return (
    <div className='taskList'>
      <h5>Tasks:</h5>
      <ul className='list-group'>
      {
        tasks.map(task=>{
          return (
            <div key={task.id}>
              <Task task={task} />
            </div>
            )
        })
      }
      </ul>
      {tasks.length===0 &&
        <div className="alert alert-success">
          <strong>No Tasks!</strong>
        </div>
      }

      <Link className='btn btn-primary btn-block' to={`/${roommate.id}/newTask`}>New Task For {roommate.name}</Link>
    </div>
    )
  }
}
