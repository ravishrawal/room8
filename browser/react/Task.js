import React, {Component} from 'react';
import Checkbox from './Checkbox';

export default class Task extends Component{
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
        <br/>
      </div>
    )
  }
}
