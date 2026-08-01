const express = require("express");
const router = express.Router();

const { addUser, liste, deleteUser, updateUser} = require("../controllers/personnelController");

router.post("/addUser", addUser);
router.get("/liste", liste);
router.delete("/deleteUser", deleteUser);
router.put("/updateUser",updateUser)
module.exports = router;