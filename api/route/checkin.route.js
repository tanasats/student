const express = require("express");
const router = express.Router();
const checkinController = require("../controller/checkin.controller");
const { authJwt } = require("../middleware/auth");

// Update
router.put("/checkin/:activity_id/:enroll_token",authJwt.verifyToken, checkinController.checkin);

module.exports = router;
 