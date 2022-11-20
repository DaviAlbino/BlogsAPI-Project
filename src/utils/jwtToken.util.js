require('dotenv/config');
const jwt = require('jsonwebtoken');

const getToken = (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET, {
        expiresIn: '1d',
        algorithm: 'HS256',
    });
    return token;
};

module.exports = getToken;