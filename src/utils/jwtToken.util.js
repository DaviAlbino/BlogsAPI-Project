require('dotenv/config');
const jwt = require('jsonwebtoken');

const getToken = (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET, {
        expiresIn: '1d',
        algorithm: 'HS256',
    });
    return token;
};

const tokenValidation = (token) => {
    if (!token) {
        return { type: 401, message: 'No authorization' };
    }
    try {
        const userToken = jwt.verify(token, process.env.JWT_SECRET);
        return { type: null, message: userToken };
    } catch (error) {
        return { type: 401, message: 'No authorization' };
    }
};

module.exports = { 
    getToken,
    tokenValidation,
};