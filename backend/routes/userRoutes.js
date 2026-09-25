const express = require("express")
const router = express.Router()

const { createProfile, getUser, getUserByEmail, updateProfile, getUsers } = require("../controller/userController")

router.post("/", createProfile)
router.get("/", getUsers)
router.get("/email/:email", getUserByEmail)
router.get("/:id", getUser)
router.put("/:id", updateProfile)

module.exports = router;