const loginService = require('../services/login.service');
const loginValidation = require('../utils/loginValidation.util');

const insertLogin = async (req, res) => {
//    const { email, password } = req.body;
   const checkLogin = loginValidation.validateUser(req.body);
   if (checkLogin.status) {
    return res.status(checkLogin.status).json({ message: checkLogin.message });
   }
   const { email, password } = checkLogin;
   const token = await loginService.insertLogin(email, password);
   if (token.status) {
    return res.status(token.status).json({ message: token.message });
   }
   return res.status(200).json({ token });
};

module.exports = {
    insertLogin,
};