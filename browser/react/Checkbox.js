import React, {Component} from 'react';
import axios from 'axios';

export default class Checkbox extends Component{
  constructor(props){
    super(props);
    this.state={
      isComplete:false
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    const {taskId} = this.props;
    this.setState({isComplete: event.target.checked});
    axios.put(`/tasks/${taskId}`, {isComplete:true})
    .then(res=>console.log(`task ${res.data.description} complete!`))
  }
  render(){
    return (
      <div>
        <form className='form-group'>
          <div className="checkbox">
            <label><input type="checkbox" value="" onChange={this.handleChange}/>Mark Complete</label>
          </div>
        </form>
      </div>
    )
  }
}
