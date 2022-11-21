const jwt = require('jsonwebtoken');

const tokenMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
       const { data } = jwt.verify(authorization, process.env.JWT_SECRET);  
       req.user = data; 
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }

    next();
};

module.exports = tokenMiddleware;
