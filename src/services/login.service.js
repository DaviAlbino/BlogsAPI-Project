const { User } = require('../models');
const jwtToken = require('../utils/jwtToken.util');

const insertLogin = async (email, password) => {
    const user = await User.findOne({
        where: {
            email,
            password,
        },
    });

    if (!user || user.password !== password) {
        return { status: 400, message: 'Invalid fields' };
    }
    const token = jwtToken.getToken(user);
    return token;
};

module.exports = { insertLogin };
