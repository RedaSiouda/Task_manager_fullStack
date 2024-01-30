const TaskData = require('../models/taskSchema');
const { authenticateUser } = require('../controllers/loginController');

const TaskDataController = {
  // Post Task
  sendTaskData: async (req, res) => {
    try {
      const body = req.body;
  
      if (!body.task) {
        return res.status(400).json({
          error: 'Missing content',
        });
      }
  
      const newTaskData = new TaskData({
        task: body.task,
        userId: body.userId, // Assuming userId is sent in the request body
      });
  
      const savedTask = await newTaskData.save();
      res.json(savedTask);
    } catch (error) {
      console.error('Error saving task data to MongoDB:', error.message);
  
      // Send a more detailed error response
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message,
      });
    }
  },

  // GET all Task
  getAllTaskData: async (req, res) => {
    try {
      const allTask = await TaskData.find();
      res.json(allTask);
    } catch (error) {
      console.error('Error retrieving all tasks from MongoDB:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get Specific task
  getTaskById: async (req, res) => {
    try {
      const id = req.params.id;
      const taskById = await TaskData.findById(id);

      if (!taskById) {
        return res.status(404).json({
          error: 'Task not found',
        });
      }

      res.json(taskById);
    } catch (error) {
      console.error('Error retrieving task by ID from MongoDB:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // DELETE a specific task
  deleteTaskByID: async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.user.userId;

      const deletedTask = await TaskData.findOneAndDelete({
        _id: id,
        userId: userId, // Ensure the user owns the task
      });

      if (!deletedTask) {
        return res.status(404).json({
          error: 'Task not found',
        });
      }

      res.json({ message: 'Task successfully deleted' });
    } catch (error) {
      console.error('Error deleting task by ID from MongoDB:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = TaskDataController;
