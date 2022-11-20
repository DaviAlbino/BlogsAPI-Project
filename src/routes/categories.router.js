const express = require('express');
const categoriesController = require('../controllers/category.controller');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const categoryRouter = express.Router();

categoryRouter.post('/', tokenMiddleware, categoriesController.insertCategory);

module.exports = categoryRouter;