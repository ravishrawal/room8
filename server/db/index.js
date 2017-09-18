const Sequelize = require('sequelize');
const DATABASE_URL = 'postgres://localhost/room8';
const moment = require('moment');

const db = new Sequelize(DATABASE_URL, {
  logging: false,
  native: true
})

const Roommate = db.define('roommate', {
  name: {
    type: Sequelize.STRING
  }
})

const Task = db.define('task', {
  description: {
    type: Sequelize.TEXT
  },
  due: {
    type: Sequelize.DATE
  },
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
},
{
  getterMethods: {
    timeRemaining: function(){
      if(this.isComplete){
        return 'Task Complete!'
      }
      if(this.due){
        const timeLeft = new Date(this.due) - new Date();
        const seconds = timeLeft / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const time = `${Math.floor(days)} days, ${Math.floor(hours%24)} hours, and ${Math.floor(minutes % 60)} minutes`;
        console.log('time left:', time);
        if(timeLeft < 0){
          return 'Overdue!'
        } else{return `Time Remaining: ${time}`}
      }
      return 'No Due Date Set'
    }
  }
})

Roommate.hasMany(Task);
Task.belongsTo(Roommate);


module.exports = {
  db,
  models: {
    Roommate,
    Task
  }
}
