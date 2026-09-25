const mongoose = require(mongoose);
const user = require("../models/userModel");

const createProfile = async(req, res) =>{
    try{
        const {name, email, phone, address, age} = req.body;
        
        if(!name || !email || !phone || !address || !age){
            return res.status(400).json({
                message: "all fields are required"
            })
            
        }
        user.create({
            name,
            email,
            phone, 
            address,
            age
        })
        res.status(200).json({
            message: "user created successfully"
        })       
    }catch(error){
        console.log(error)
    }
}
//get one user
const getUser = async(req, res) =>{
    try{
        const userId = req.params.id;

        const user = user.findByid(userId)
        
        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }
        res.status(200).json(user);

    }catch(err){
        console.log(err);
    }
};

//update profile
const updateProfile = async(req, res) =>{
    try{
        
        const {name, email, phone, address, age} = req.body;
        const userId = req.params.id;
        const user = await user.findByIdAndUpdate(userId, {
            name,
            email,
            phone,
            address,
            age
        });

        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }
        res.status(200).json(user);

    }catch(err){
        console.log(err);
    }
};

module.exports = {createProfile, getUser, updateProfile}