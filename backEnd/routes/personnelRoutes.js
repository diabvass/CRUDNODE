const express = require("express");
const router = express.Router();

const { addUser, liste, deleteUser } = require("../controllers/personnelController");

router.post("/addUser", addUser);
router.get("/liste", liste);
router.delete("/deleteUser", deleteUser);

module.exports = router;