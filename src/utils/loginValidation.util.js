const Joi = require('joi');

const validateUser = (body) => {
    const newUser = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    const { value, error } = newUser.validate(body);

    if (error) {
        return {
            status: 400,
            message: 'Some required fields are missing',
        };
    }

    return value;
};

module.exports = { validateUser };