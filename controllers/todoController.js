var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb+srv://test:test@cluster0.szopxen.mongodb.net/?retryWrites=true&w=majority');

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req, res){
        //get data from MongoDB and pass it to the view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        });
        //code without MongoDB
        //res.render('todo', {todos: data});
    });

    
    app.post('/todo', urlencodedParser, function(req, res){
        //get data from the view, add it to MongoDB
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
        //code without MongoDB
        // data.push(req.body);
        // res.json(data);
    });

    
    app.delete('/todo/:item', function(req, res){
        //delete the requested item from MongoDB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
            if (err) throw err;
            res.json(data);
        })
        //code without MongoDB
        //data = data.filter(function(todo){
        //    return todo.item.replace(/ /g, '-') !== req.params.item;
        //});
        //res.json(data);
    });
};