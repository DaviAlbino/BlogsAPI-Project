const express = require('express');

const postController = require('../controllers/post.controller');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const postRouter = express.Router();

postRouter.get('/', tokenMiddleware, postController.findAllPosts);
postRouter.get('/search', tokenMiddleware, postController.search);
postRouter.get('/:id', tokenMiddleware, postController.findPostById);
postRouter.put('/:id', tokenMiddleware, postController.updatePost);
postRouter.delete('/:id', tokenMiddleware, postController.deletePost);

module.exports = postRouter;