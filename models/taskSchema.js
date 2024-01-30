const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
    task: String,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

const TaskData = mongoose.model("TaskData", taskSchema);

module.exports = TaskData