'use strict'

const express = require('express');
const router = express.Router();
const db = require('../db')
const Roommate = db.models.Roommate;
const Task = db.models.Task;
const path = require('path');

router.get('/', (req, res, next)=>{
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '../../browser/index.html'));
})

router.get('/roommates', (req, res, next)=>{
  console.log('/roommates route hit!');
  Roommate.findAll({
    include: [Task]
  })
  .then((roommates)=>{
    res.json(roommates)
    next()
    return null
  })
  .catch(next)
})

router.post('/:roommateId/newTask', (req, res, next)=>{
  const {roommateId} = req.params
  Roommate.findById(roommateId)
  .then((roommate)=>{
    console.log(req.body);
    Task.create(req.body)
    .then(task=>task.setRoommate(roommate))
    .then(task=>task.save())
  })
  .then(()=>res.redirect('/'))
})

router.put('/tasks/:taskId', (req, res, next)=>{
  const taskId = +req.params.taskId;
  Task.findById(taskId)
    .then(task=>task.update(req.body))
    .then(task=>task.save())
    .then(res.redirect('/#/'))
})

router.delete('/tasks/:taskId', (req, res, next)=>{
  const taskId = +req.params.taskId;
  Task.destroy({
    where: {
      id: taskId
    }
  })
})

router.get('/leaderboard', (req, res, next)=>{
  var RoommateArray=[];
  Roommate.findAll()
  .then((roommates)=>{
    roommates.forEach((roommate)=>{
      roommate.getTasks()
      .then((tasks)=>{
        // console.log('roommate\'s tasks: ', tasks);
        var completed=0;
        var pending=0;
        var total = tasks.length;
        tasks.forEach(function(task){
          task.isComplete ? completed++ : pending++
          console.log(pending);
        })
        console.log(pending);
        RoommateArray.push({name: roommate.name, completed, pending, total})
        if(RoommateArray.length===5){return RoommateArray}
      })
      .then((RoommateArray)=>{if(RoommateArray){res.json(RoommateArray)}})
    })
  })
})

module.exports = router
