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
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        return data;
    } catch (error) {
        return { type: 401, message: 'Expired or invalid token' };
    }
};

module.exports = { 
    getToken,
    tokenValidation,
};