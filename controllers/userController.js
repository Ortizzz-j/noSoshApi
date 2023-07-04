const { User, Thought } = require('../models');

module.exports = {

    //Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();

            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate('thoughts')
            if (!user) {
                return res.status(404).json({ message: 'This is not the user you\'re looking for' });
            }

            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'This is not the user you\'re looking for' });
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async updateUser(req, res) {
        try {
            const userUp = User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            );

            if (!userUp) {
                return res.status(404).json({ message: 'This is not the user you\'re looking for' });
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

}
/* 
Todo:
-create Post and Delete routes for friends
*/