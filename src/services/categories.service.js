const { Category } = require('../models');

const insertCategory = async ({ name }) => {
    await Category.create({ name });
    const category = await Category.findOne({ where: { name } });
    return category;
};

const findAllCategories = async () => {
    const categoriesList = await Category.findAll();
    return categoriesList;
};

module.exports = {
    insertCategory,
    findAllCategories,
};