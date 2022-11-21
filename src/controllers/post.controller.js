const postService = require('../services/post.service');

const findAllPosts = async (_req, res) => {
    const postList = await postService.findAllPosts();
    return res.status(200).json(postList);
};

module.exports = {
    findAllPosts,
};