import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Roommates from './Roommates.js'
import NewTask from './newTask.js'
// import TaskForm from './TaskForm.js'
// <TaskForm onSave= { onSave } />
export default class Main extends Component{
  // const onSave = (task)=>{
  //
  // }
  render(){
    return (
      <HashRouter >
        <div className='wrapper'>
          <Route exact path='/' component={Roommates} />
          <Route exact path='/:roommateId/newTask' render={(routeProps)=><NewTask {...routeProps}/>} />
        </div>
      </HashRouter >
    )
  }
}
