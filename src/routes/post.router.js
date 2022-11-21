const express = require('express');

const postController = require('../controllers/post.controller');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const postRouter = express.Router();

postRouter.get('/', tokenMiddleware, postController.findAllPosts);
postRouter.get('/:id', tokenMiddleware, postController.findPostById);

module.exports = postRouter;