const express = require("express")
const cors = require("cors")
const connectDb = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const dotenv = require("dotenv")    

const app = express()

dotenv.config()
connectDb()

app.use(cors())
app.use(express.json())
app.use("/api/user", userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
})
