const Joi = require('joi');

const userValidation = (user) => {
    const userJoi = Joi.object({
        displayName: Joi.string().min(8).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        image: Joi.optional(),
    });

    const { value, error } = userJoi.validate(user);
    console.log('error: ', error);

    if (error) {
        return { status: 400, message: error.details[0].message };
    }

    return value;
};

module.exports = {
    userValidation,
};
