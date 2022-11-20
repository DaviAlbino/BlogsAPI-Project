const { User } = require('../models');
const { getToken } = require('../utils/jwtToken.util');

const insertUser = async ({ displayName, email, password, image }) => {
    const oldUser = await User.findOne({
        where: { email, password },
    });
    if (oldUser) {
        return { type: 409, message: 'User already registered' };
    }

    const newUser = await User.create({ displayName, email, password, image });

    const token = getToken(newUser);
    return token;
};

module.exports = {
    insertUser,
};