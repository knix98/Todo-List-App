//requiring various useful modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 8000; //this app will be working on this port number

//requiring database configuration
const db = require('./config/mongoose.js');
//requiring database model
const Todo = require('./models/todo.js');

//initializing the app
const app = express();

app.set('view engine', 'ejs'); //view engine set to ejs
app.set('views', path.join(__dirname, 'views')); //views folder
app.use(bodyParser.urlencoded({extended: false})); //url encoder for getting query params
app.use(express.static('assets')); //assets folder middleware

//controller for the home page
app.get('/', function(req, res){
    let dueTasks;

    //finding all the incomplete tasks
    Todo.find({completed: false}, function(err, dues){
        dueTasks = dues.length;
    });

    //finding all the tasks for sending them to the template view
    Todo.find({}, function(err, todos){
        if(err){
            console.log('error in fetching todos from db');
        }
        else{
            return res.render('main',{
                todo_list: todos,
                due_tasks: dueTasks
            });
        }
    });
});

//controller for creating a new todo when form gets submitted
app.post('/create-todo', function(req, res){
    Todo.create(req.body, function(err, newTodo){
        if(err){                  
            console.log('error in creating new Todo', err);
        }
        else{
            return res.redirect('back');
        }
    });
});

//controller for toggling the 'completed field' of todo task 
app.get('/toggle-todo/', function(req, res){
    Todo.findOne({_id: req.query.id}, function(err, todo){
        todo.completed = !(todo.completed); //toggling the current state
        todo.save(function(err, newTodo){
            if(err){
                console.log('error in toggling the todo', err);
            }
            else{
                return res.redirect('back');
            }
        });
    });
});

//controller for the delete tasks button
app.get('/delete-todos', function(req, res){
    //finding all the todos to be deleted
    Todo.find({completed: true}, function(err, completedTodos){
        if(err){
            console.log('error in deleting todos', err);
            return res.redirect('back');
        }

        //deleting all the completed todos one by one
        for(let i of completedTodos){
            Todo.findByIdAndDelete(i._id, function(err){
                if(err){
                    console.log('error in deleting the todo');
                }
            });
        }

        return res.redirect('back');
    });
});

//our server listens at port 8000
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
});