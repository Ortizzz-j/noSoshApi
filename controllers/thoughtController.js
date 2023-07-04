const { Thought, User } = require('../models');

module.exports = {

    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID' });
            }

            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    createThought(req, res) {

        return Thought.create(req.body)
            .then(data => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: data._id } },
                    { new: true }
                )
            })
            .then(data => {
                console.log(data);
                if (!data) {
                    return res.status(404).json({ message: 'Thought created but no user with this username' }
                    );
                }
                return res.status(201).json(data);
            })
            .catch(err => res.json(err));

    },
    async forgetThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID' });
            }

            res.json(thought);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID' });
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

/* 
Todo:
-create Post and Delete routes for reactions that is stored in a single thought's reactions array field.
*/