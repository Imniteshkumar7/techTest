const User = require("../models/userModel");

const createProfile = async (req, res) => {
    try {
        const { name, email, phone, address, age } = req.body;

        if (!name || !email || !phone || !address || !age) {
            return res.status(400).json({
                message: "all fields are required"
            })

        }
        const totalUsers = await User.countDocuments();
        const id = `P${1001 + totalUsers}`;

        const profile = await User.create({
            id,
            name,
            email,
            phone,
            address,
            age
        })
        res.status(200).json({
            message: "user created successfully",
            data: profile
        })
    } catch (error) {
        console.log(error)
    }
}
//get one user
const getUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const foundUser = await User.findOne({
            $or: [{ id: userId }, { _id: userId }]
        })

        if (!foundUser) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        res.status(200).json(foundUser);

    } catch (err) {
        console.log(err);
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const foundUser = await User.findOne({ email: req.params.email });

        if (!foundUser) {
            return res.status(404).json({ message: "user not found" });
        }

        res.status(200).json(foundUser);
    } catch (err) {
        console.log(err);
    }
};

//update profile
const updateProfile = async (req, res) => {
    try {

        const { name, email, phone, address, age } = req.body;
        const userId = req.params.id;
        const updatedUser = await User.findOneAndUpdate({
            $or: [{ id: userId }, { _id: userId }]
        }, {
            name,
            email,
            phone,
            address,
            age
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        res.status(200).json(updatedUser);

    } catch (err) {
        console.log(err);
    }
};

//get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { createProfile, getUser, getUserByEmail, updateProfile, getUsers }