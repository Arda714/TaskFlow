const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/tasks.json');

const readTasks = () => {
    const tasksData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(tasksData);
}

const writeTasks = (tasks) => {
    fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2), 'utf-8');
}

const getAllTasks = (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
}


const createTask = (req, res) => {
    const { title, description, priority, assignee } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Başlık zorunludur' });
    }

    const tasks = readTasks();
    const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const now = new Date().toISOString();
    const newTask = {
        id: newId,
        title,
        description,
        priority: priority || 'medium',
        assignee,
        status: 'pending',
        createdAt: now,
        updatedAt: now
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
};
const getTaskById = (req, res) => {
    const taskId = parseInt(req.params.id);
    const tasks = readTasks();
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ message: 'Görev bulunamadı' });
    }
    res.json(task);
};
const updateTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, priority, assignee, status } = req.body;
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Görev bulunamadı' });
    }

    const task = tasks[taskIndex];

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (assignee !== undefined) task.assignee = assignee;
    if (status !== undefined) task.status = status;
    task.updatedAt = new Date().toISOString();

    writeTasks(tasks);
    res.json(task);
};
const deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Görev bulunamadı' });
    }

    tasks.splice(taskIndex, 1);
    writeTasks(tasks);
    res.json({ message: 'Görev silindi' });
};

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
};




