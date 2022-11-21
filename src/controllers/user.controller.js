const userService = require('../services/user.service');
const userValidation = require('../utils/userValidation.util');

const insertUser = async (req, res) => {
   const checkUser = userValidation.userValidation(req.body);
   if (checkUser.status) {
    return res.status(checkUser.status).json({ message: checkUser.message });
   }
   const token = await userService.insertUser(checkUser);

//    req.user = token;
   
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

const deleteUser = async (req, res) => {
    const { id } = req.user;
    await userService.deleteUser(id);
    return res.status(204).end();
};

module.exports = {
    insertUser,
    findAllUsers,
    findUserById,
    deleteUser,
};