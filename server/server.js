const Express = require('express');
var express = require('express');
const app = Express();
var path = require('path')
const Roommate = require('./db').models.Roommate
const Task = require('./db').models.Task
//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

var root = path.join(__dirname, '../')
console.log('ROOT', root);

var npmPath = path.join(root, './node_modules');
var publicPath = path.join(root, './public');
var browserPath = path.join(root, './browser');


app.use(express.static(npmPath));
app.use(express.static(publicPath));
app.use(express.static(browserPath));

app.use('/', require('./app'))

const db = require('./db').db

const port = process.env.PORT || 3000;

db.sync({force: true})
  .then(()=>{
    return Promise.all([
    Roommate.create({name:'Mateo'}),
    Roommate.create({name:'Robert'}),
    Roommate.create({name:'Alec'}),
    Roommate.create({name:'Sasha'}),
    Roommate.create({name:'Rav'})
  ])
})
  .then(([Mateo, Robert, Alec, Sasha, Rav])=>{
    return Promise.all([
      Task.create({description: 'Do the dishes'}),
      Task.create({description: 'Clean toilet 1'}),
      Task.create({description: 'Clean toilet 2', due:'2017-09-27T09:00:00'}),
      Task.create({description: 'Pay rent', isComplete:true})
    ])
      .then(([task1, task2, task3, task4])=>{
        task1.setRoommate(Mateo)
        task2.setRoommate(Robert)
        task3.setRoommate(Robert)
        task4.setRoommate(Alec)
      })
  })
  .then(()=>{
    app.listen(port, ()=>{
      console.log(`listening on port ${port}`);
    })
  })
