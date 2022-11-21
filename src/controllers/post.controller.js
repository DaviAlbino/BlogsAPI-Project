const postService = require('../services/post.service');

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

module.exports = {
    findAllPosts,
    findPostById,
};