const Task = require('../models/Task');

const createTask = async (req, res) => {
    const { title, description, status } = req.body;
    const task = await Task.create({ title, description, status, userId: req.user.id });

    res.status(201).json(task);
};

const getTasks = async (req, res) => {
    const tasks = await Task.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });

    res.json(tasks);
}

const getTask = async (req, res) => {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    res.json(task);
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    await Task.update({ title, description, status }, { where: { id, userId: req.user.id } });
    const updatedTask = await Task.findOne({ where: { id, userId: req.user.id } });

    res.json(updatedTask);
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    await Task.destroy({ where: { id, userId: req.user.id } });

    res.status(204).send();
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };