import React, { Component } from 'react';
import axios from 'axios';


export default class TaskForm extends Component{
  // const {content} = this.state;
  constructor(){
    super();
    this.state = {
      inputValue:'',
      dueDate:[]
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }
  handleChange(event){
    this.setState({
      inputValue: event.target.value
    })
  }
  handleDateChange(event){
    var dueDate = event.target.value;
    console.log('DATE: ', dueDate);
    this.setState({
      dueDate: dueDate
    })
    console.log(this.state);
  }
  handleSubmit(event){
    const { inputValue, dueDate } = this.state;
    const { roommateId } = this.props;
    event.preventDefault();
    axios.post(`/${roommateId}/newTask`, { description: inputValue, due: dueDate })
    .then(result=>console.log(result.data))

    this.setState({
      inputValue:'',
      dueDate:{}
    });
  }
  render(){
    return (
      <div className = 'well'>
        <form className='form-horizontal' onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>New Task</legend>
            <div className = 'form-group'>
              <label className='col-xs-2 control-label'>Name:</label>
                <div className='col-xs-10'>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Add Task'
                  value={this.state.inputValue}
                  onChange={this.handleChange}
                />
              </div>
              <div className='col-xs-10'>
                <label className='col-xs-2 control-label'>Due:</label>
                <input
                  type="datetime-local"
                  name="duedate"
                  min={new Date()}
                  onChange={this.handleDateChange}
                />
              </div>
            </div>
            <div className='form-group'>
              <div className='col-xs-10 col-xs-offset-2'>
                <button
                  disabled={this.state.inputValue.length===0}
                  type='submit'
                  className='btn btn-primary'
                >Create Task</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}
