
const todos = require('../models/Todos.js');

module.exports = function (app, io) {

  app.get('/api/todos', function (req, res) {
    todos.find({})
      .then(function (allTodos) {
        res.json(allTodos);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
  
  app.post('/api/todos', function (req, res) {
    todos.create(req.body)
      .then(function (dbtodos) { 
        console.log(dbtodos);
        io.emit('new todo', dbtodos);
        res.json({
          success: true
        });
      })
      .catch(function (err) { 
        console.log(err);
        res.json({
          success: false
        });
      });
  });


  app.put('/api/todos/:id', function (req, res) {

    todos.findOneAndUpdate({
        _id: req.params.id
      }, {
        $set: {
          completed: req.body.completed
        }
      })
      .then(function (dbtodos) { 
        console.log(dbtodos);
        io.emit('update todo', dbtodos);
        res.json({
          success: true
        });
      })
      .catch(function (err) { 
        console.log(err);
        res.json({
          success: false
        });
      })
  });

  app.delete('/api/todos/:id', function (req, res) {

    
    todos.deleteOne({
        _id: req.params.id
      })
      .then(function (dbtodos) { 
        console.log(dbtodos);
        io.emit('delete todo', dbtodos);
        res.json({
          success: true
        });
      })
      .catch(function (err) { 
        console.log(err);
        res.json({
          success: false
        });
      })
  });
}