//we require mongoose because we need to use the functions of this library
const mongoose = require ('mongoose');

//we define the schema for every todo
const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

//compiling our schema into a model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;