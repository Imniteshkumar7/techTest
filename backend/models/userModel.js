const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            required:true,
            unique: true
        },
        email:{
            type: String,
            required: tru,
            unique: true
        },
        phone:{
            type: String,
            required: true,
            empty: false
        },
        address:{
            type: String,
            required: true,
            empty: false

        },
        age:{
            type:Number,
            required: true,
        },   
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema)