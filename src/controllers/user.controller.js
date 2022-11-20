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

const findAllUsers = async (_req, res) => {
    const usersList = await userService.findAllUsers();
    return res.status(200).json(usersList);
};

const findUserById = async (req, res) => {
    const { id } = req.params;
    const user = await userService.findUserById(id);
    if (user.type) {
        return res.status(user.type).json({ message: user.message });
    }

    return res.status(200).json(user.message);
};

module.exports = {
    insertUser,
    findAllUsers,
    findUserById,
};