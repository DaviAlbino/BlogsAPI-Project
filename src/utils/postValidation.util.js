const Joi = require('joi');

const postValidation = ({ title, content, categoryIds }) => {
    const postJoi = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        categoryIds: Joi.array().items(Joi.number().required()),
    });

    const { value, error } = postJoi.validate({ title, content, categoryIds });

    if (error) {
        return { status: 400, message: 'Some required fields are missing' };
    }

    return value;
};

module.exports = {
    postValidation,
};
