const express = require('express');
const router = express.Router();
const { getUserById, createUser, login, updateUser, deleteUser } = require('../controllers/users');
const { verifyTokenHandler } = require('../middlewares/jwtHandler');


router.get('/profile',[verifyTokenHandler], getUserById);
router.post('/signup', createUser);
router.post('/login', login);
router.patch('/profile',[verifyTokenHandler], updateUser);
router.delete('/profile', [verifyTokenHandler],deleteUser)


module.exports = router;