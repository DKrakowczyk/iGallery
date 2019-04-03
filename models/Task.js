import mongoose from '../database/database';

const TaskSchema = new mongoose.Schema({
    task: String,
    date: String
});


const Task = mongoose.model("Task", TaskSchema);

export default Task;