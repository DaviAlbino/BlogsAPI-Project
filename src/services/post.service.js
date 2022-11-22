const { Op } = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');

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

const findPostById = async (id) => {
    const post = await BlogPost.findByPk(id, {
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

    if (!post) {
        return { type: 404, message: 'Post does not exist' };
    }
    return { type: null, message: post };
};

const deletePost = async (id, user) => {
    const userById = await BlogPost.findByPk(id, { where: { user } });

    if (!userById) {
        return { type: 404, message: 'Post does not exist' };
    }
    if (userById.dataValues.userId !== user) {
        return { type: 401, message: 'Unauthorized user' };
    }
    await BlogPost.destroy({ where: { id } });

    return { type: null, message: '' };
};

const updatePost = async (body, id, user) => {
    const { title, content } = body;

    const { dataValues } = await BlogPost.findOne({
        where: { id }, attributes: ['userId'],
    });
    if (user !== dataValues.userId) {
        return { type: 401, message: 'Unauthorized user' };
    } 
    
    await BlogPost.update({ title, content, updated: new Date() }, { where: { id } });

    const post = await BlogPost.findByPk(id, { include: [
        { model: User, as: 'user', where: { id: user }, attributes: { exclude: ['password'] } }, 
        { model: Category, as: 'categories' }],
    });
    return { type: null, message: post };
};

const search = async (query) => {
    const blogPosts = await BlogPost.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${query}%` } },
            { content: { [Op.like]: `%${query}%` } },
          ],
        },
        include: [
          { model: User, as: 'user', attributes: { exclude: 'password' } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      });
      return blogPosts;
};

const createPost = async (id, title, content, categoryIds) => {
    const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });
    if (categoryIds.length !== count) {
      return { type: 400, message: 'one or more "categoryIds" not found' };
    }  
    const { dataValues } = await BlogPost.create({
        title, 
        content,
        published: new Date(),
        updated: new Date(),
        userId: id,
    });

    console.log('dataValues: ', dataValues);
 
    await categoryIds.map(async (categoryId) => {
        await PostCategory.create({ postId: dataValues.id, categoryId });
    }); 
    // await PostCategory.bulkCreate(categoryList, { fields: ['postId', 'categoryId'] 
    return { type: null, message: dataValues };
};

module.exports = {
    findAllPosts,
    findPostById,
    updatePost,
    search,
    deletePost,
    createPost,
};