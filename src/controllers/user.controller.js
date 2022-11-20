const userService = require('../services/user.service');
const userValidation = require('../utils/userValidation.util');

const insertUser = async (req, res) => {
//    const { email, password } = req.body;
   const checkUser = userValidation.userValidation(req.body);
   if (checkUser.status) {
    return res.status(checkUser.status).json({ message: checkUser.message });
   }
//    const { displayName, email, password, image } = checkUser;
   const token = await userService.insertUser(checkUser);
   if (token.type) {
    return res.status(token.type).json({ message: token.message });
   }
   return res.status(201).json({ token });
};

const findAllUsers = async (req, res) => {
    const usersList = await userService.findAllUsers();
    return res.status(200).json(usersList);
};

module.exports = {
    insertUser,
    findAllUsers,
};