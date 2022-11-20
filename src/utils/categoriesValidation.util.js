const Joi = require('joi');

const categoryValidation = (category) => {
    const categoryJoi = Joi.object({
        name: Joi.string().required(),
    });

    const { value, error } = categoryJoi.validate(category);

    if (error) {
        return { status: 400, message: error.details[0].message };
    }

    return value;
};

module.exports = {
    categoryValidation,
};
