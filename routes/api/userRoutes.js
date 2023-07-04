const router = require('express').Router();
const { getAllUsers, createUser, getOneUser, deleteUser, userUp } = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router
.route('/:userId')
.get(getOneUser)
// .put(userUp)
.delete(deleteUser)

module.exports = router;