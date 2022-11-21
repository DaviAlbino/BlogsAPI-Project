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

const findAllUsers = async () => {
    const userList = await User.findAll({
        attributes: {
            exclude: 'password',
        },
    });
    return userList;
};

const findUserById = async (id) => {
    const user = await User.findOne({ 
        attributes: {
            exclude: 'password',
        },
        where: { id },
    });
    if (!user) {
        return { type: 404, message: 'User does not exist' };
    }
    return { type: null, message: user };
};

module.exports = {
    insertUser,
    findAllUsers,
    findUserById,
};