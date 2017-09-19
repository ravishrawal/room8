import React, {Component} from 'react';
import Checkbox from './Checkbox';
import axios from 'axios';

export default class Task extends Component{
  constructor(){
    super();
    this.deleteClickHandler = this.deleteClickHandler.bind(this);
  }
  deleteClickHandler(event){
    event.preventDefault();
    const {task} = this.props
    axios.delete(`/tasks/${task.id}`)
    .then(res=>console.log(`deleted task: ${res.data}`))
  }
  render(){
    const {task} = this.props;
    console.log('TASK', task);
    return (
      <div className='task'>
        <li className='list-group-item'>{task.description}
        <br/>
        {
          task.isComplete ? <label className="badge badge-success">Complete!</label> :
            <div>
              <label className="badge badge-warning">Pending...</label>
              <div className="alert alert-warning">
                <strong>{task.timeRemaining}</strong>
              </div>
              <Checkbox taskId={task.id}/>
            </div>
        }
        </li>
        <div>
          <form className='form-group'>
            <br/>
            <button
              className='btn btn-danger'
              onClick={this.deleteClickHandler}
              name='Delete Button'
              >Delete Task</button>
          </form>
        </div>
        <br/>
      </div>
    )
  }
}
