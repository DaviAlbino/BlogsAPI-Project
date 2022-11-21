const postService = require('../services/post.service');
const { postValidation } = require('../utils/postValidation.util');

const findAllPosts = async (_req, res) => {
    const postList = await postService.findAllPosts();
    return res.status(200).json(postList);
};

const findPostById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await postService.findPostById(id);

    if (type) {
        return res.status(type).json({ message });
    }

    return res.status(200).json(message);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.user;
    // const checkUserId = await postService.findPostById(userId);
    // console.log('user: ', authorization);
    const checkPost = postValidation(req.body);

    if (checkPost.status) {
        return res.status(checkPost.status).json({ message: checkPost.message });
    }

    const { type, message } = await postService.updatePost(checkPost, Number(id), userId);
    if (type) {
        return res.status(type).json({ message });
    }

    return res.status(200).json(message);
};

module.exports = {
    findAllPosts,
    findPostById,
    updatePost,
};