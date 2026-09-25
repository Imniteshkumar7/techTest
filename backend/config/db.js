const mongoose = require("mongoose")
const dns = require("dns")

dns.setServers(["8.8.8.8", "8.8.4.4"])

const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI) 
        console.log("database connected");
    }catch(error){
        console.log("database error",error)
    }
}           

module.exports = connectDb