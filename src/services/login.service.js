const { UserModel } = require('../models/User');
const jwtToken = require('../utils/jwtToken.util');

const insertLogin = async (email, password) => {
    const user = await UserModel.findOne({
        where: {
            email,
            password,
        },
    });

    if (!user || user.password !== password) {
        return { status: 400, message: 'Invalid fields' };
    }
    const token = jwtToken(user);
    return token;
};

module.exports = { insertLogin };
