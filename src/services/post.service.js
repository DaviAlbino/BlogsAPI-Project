const { BlogPost, User, Category } = require('../models');

const findAllPosts = async () => {
    const postList = BlogPost.findAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: { exclude: ['password'] },
            },
            {
                model: Category,
                as: 'categories',
                through: { attributes: [] },
            },
        ],
    });
    return postList;
};

module.exports = {
    findAllPosts,
};