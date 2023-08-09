const express = require("express");
const router = express.Router();
const checkinController = require("../controller/checkin.controller");
const { authJwt } = require("../middleware/auth");

// Update
router.put("/checkin/:enroll_token",authJwt.verifyToken, checkinController.checkin);

module.exports = router;
 