const router = require('express').Router();
const { getThoughts, createThought, getOneThought, forgetThought, updateThought } = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router
.route('/:thoughtId')
.get(getOneThought)
.put(updateThought)
.delete(forgetThought);



module.exports = router;