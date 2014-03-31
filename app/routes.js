// load the model
var Todo = require('./models/todo');

// expose the routes to our app with module.exports
module.exports = function(app) {
  
  // api ----------------------
  // get all todos
  app.get('/api/todos', function(req, res) {
      // user monogoose to get all todos from the database
      Todo.find(function(err, todos) {
          if(err)
              res.send(err);

          res.json(todos);    // return all todos in JSON format
      });
  });

  // create todo and send back all todos after creation

  app.post('/api/todos', function(req, res) {
      // create a todo, information comes from Angular
      Todo.create({
          text: req.body.text,
          done: false
      }, function(err, todo) {
          if(err)
              res.send(err);

          Todo.find(function(err, todos) {
              if(err)
                  res.send(err);
              res.json(todos);
          });
      });
  });

  // delete a todo
  app.delete('/api/todos/:todo_id', function(req, res) {
      Todo.remove({
          _id: req.params.todo_id
      }, function(err, todo) {
          if(err)
              res.send(err);

          Todo.find(function(err, todos) {
              if(err)
                  res.send(err);
              res.json(todos);
          });
      });
  });

  // application ========================

  app.get('*', function(req, res) {
      res.sendfile('./public/index.html');    // load the single view file (angular application)
  });

};
