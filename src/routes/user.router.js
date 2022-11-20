const express = require('express');
const userController = require('../controllers/user.controller');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const userRouter = express.Router();

userRouter.post('/', userController.insertUser);
userRouter.get('/', tokenMiddleware, userController.findAllUsers);
userRouter.get('/:id', tokenMiddleware, userController.findUserById);

module.exports = userRouter;