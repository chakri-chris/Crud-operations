const Task = require('../models/taskModel');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const userCtrl = {
    login: async(req,res) =>{
        const {email, password} = req.body;
        try {
            const user = await User.findOne({
                email,
                password
            })
            console.log(user);
            if(!user){
                return res.status(400).json({message:'Invalid credentials'});
            }
            const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET);
            return res.status(200).json({message:'Login successful', user , token});
        } catch (error) {
            console.error(error , 'Login error');
            return res.status(500).json({message:'Server error'});
        }
    },
    createTask: async(req,res) =>{
        const {title , description} = req.body; 
        time = new Date();
        const userId = req.user.userId; // Access userId from req.user set by auth middleware
        console.log(req.user , 'User from auth middleware'); // Debug log to check req.user
        try {
            const task = await Task.create({
                title,
                description,
                time,
                userId
            })
            return res.status(201).json({
                message:'Task created successfully', task
            })
        } catch (error) {
            console.error(error , 'Create task error');
            return res.status(500).json({message:'Server error'});
        }
    },
    getTasks: async(req,res) =>{
        try {
            const userId = req.user.userId; // Access userId from req.user set by auth middleware
            const tasks = await Task.find({userId});
            return res.status(200).json({message:'Tasks retrieved successfully', tasks});
        } catch (error) {
            console.error(error , 'Get tasks error');
            return res.status(500).json({message:'Server error'});
        }
    },
    updateTask: async(req,res)=>{
        const taskId = req.params.id;
        try {
            const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({message:'Task not found'});
        }
        if(task.userId.toString() !== req.user.userId){
            return res.status(403).json({message:'Forbidden'});
        }
        const {title , description} = req.body;
        task.title = title || task.title;
        task.description = description || task.description;
        await task.save();
        return res.status(200).json({message:'Task updated successfully', task});
        } catch (error) {
            console.error(error , 'Update task error');
            return res.status(500).json({message:'Server error'});
        }
    },
    deleteTask: async(req,res)=>{
        const taskId = req.params.id;
        try {
            const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({message:'Task not found'});
        } 
        if(task.userId.toString() !== req.user.userId){
            return res.status(403).json({message:'Forbidden'});
        }
        await Task.findByIdAndDelete(taskId);
        return res.status(200).json({message:'Task deleted successfully'});
        } catch (error) {
            console.error(error , 'Delete task error');
            return res.status(500).json({message:'Server error'});
        }
    },
    markTaskCompleted: async(req,res)=>{
        const taskId = req.params.id;
        try {
            const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({message:'Task not found'});
        }
        if(task.userId.toString() !== req.user.userId){ 
            return res.status(403).json({message:'Forbidden'});
        }
        task.isCompleted = true;
        await task.save();
        return res.status(200).json({message:'Task marked as completed', task});
        } catch (error) {
            console.error(error , 'Mark task completed error');
            return res.status
        }
    }


}

module.exports = userCtrl;