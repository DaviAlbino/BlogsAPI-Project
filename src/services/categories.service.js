const { Category } = require('../models');

const insertCategory = async ({ name }) => {
    await Category.create({ name });
    const category = await Category.findOne({ where: { name } });
    return category;
};

module.exports = {
    insertCategory,
};