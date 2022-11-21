const categoriesService = require('../services/categories.service');
const { categoryValidation } = require('../utils/categoriesValidation.util');

const insertCategory = async (req, res) => {
    const checkCategory = categoryValidation(req.body);
    if (checkCategory.status) {
        return res.status(checkCategory.status).json({ message: checkCategory.message });
    }
    const categoryPost = await categoriesService.insertCategory(checkCategory);
    return res.status(201).json(categoryPost);
};

const findAllCategories = async (req, res) => {
    const categoriesList = await categoriesService.findAllCategories();
    return res.status(200).json(categoriesList);
};

module.exports = {
    insertCategory,
    findAllCategories,
};