const express = require("express");
const router = express.Router();
const TaskDataController = require("../controllers/taskController");
const userController = require('../controllers/userController');
const loginController = require("../controllers/loginController");

// CREATE new user
router.post('/v1/new-user', userController.createNewUser);

// LOGIN user
router.post('/v1/login', loginController.loginUser);

router.post("/v1/task", TaskDataController.sendTaskData);
router.get('/v1/task', TaskDataController.getAllTaskData);
router.get('/v1/task/:id', TaskDataController.getTaskById);
router.delete('/v1/task/:id', TaskDataController.deleteTaskByID);

module.exports = router;
