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

module.exports = {
    insertCategory,
};