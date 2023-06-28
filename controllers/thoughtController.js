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
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
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
    async updateThought(req, res){
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!thought){
                return res.status(404).json({ message: 'No thought with this ID'});
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
};


 // const { userId, thoughtText } = req.body;

            // const user = await User.findById(userId);

            // if (!user) {
            //     return res.status(404).json({ message: 'No user with this ID' });
            // }

            // const thought = await Thought.create({
            //     thoughtText,
            //     username: user.username
                
            // });

            // user.thoughts.push(thought._id);
            // await user.save();