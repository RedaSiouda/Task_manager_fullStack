const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String,
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskData'
    }],
});

const User = mongoose.model('User', userSchema)

module.exports = User;