const mongoose = require('mongoose');

mongoose.connect('your-mongo-url');


const userSchema = mongoose.Schema({
    username: String,
    password: String,
    refreshToken: String
});

const todoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: String,
    description: String,
    completed: Boolean
});

const Todo = mongoose.model('todos', todoSchema);
const User = mongoose.model('users', userSchema);

module.exports = {
    Todo: Todo,
    User: User,
};
