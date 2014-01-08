// server.js

// set up =======================

var express = require('express');
var app = express();                    // creates the express app
var mongoose = require('mongoose');     // mongoose for mongoDB

// configuration ==========================================================

mongoose.connect('mongodb://localhost/test');     // connect to mongoDB

app.configure(function() {
    app.use(express.static(__dirname + '/public'));         // sets the static dir location
    app.use(express.logger('dev'));                         // log every request to the console
    app.use(express.bodyParser());                          // pull information from html in POST
    app.use(express.methodOverride());                      // simulate DELETE and PUT
});

// server start and listen (node) ===========

app.listen(8070);
console.log("App listening on port 8070");

// define model ============================

var Todo = mongoose.model('Todo', {
    text: String
});

// routes ==================================

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
