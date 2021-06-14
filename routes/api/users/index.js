const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/users');
const guard = require('../../../helpers/guard');
// const {validationCreateUser, validationUpdateToken, validationUpdateContactFavorite, validateMongoId} =  require('./validation')

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.patch('/user', ctrl.userUpdate);
router.post('/logout', guard, ctrl.logout);

module.exports = router;
