const mongoose = require("../database/database");

const TaskSchema = new mongoose.Schema({
    task: String,
    date: String
});


const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;