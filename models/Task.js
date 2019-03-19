const mongoose = require("../database/database");

const TaskSchema = new mongoose.Schema({
    task: String
},
    { timestamps: true });


const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;