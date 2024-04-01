const express = require("express");
const router = express.Router();
const checkinController = require("../controller/checkin.controller");
const { authJwt } = require("../middleware/auth");

// Update
router.put("/checkin/:activity_id/:enroll_token",authJwt.verifyToken, checkinController.checkin);
router.put("/checkin/list",authJwt.verifyToken, checkinController.checkinlist);
router.put("/checkin/cancel",authJwt.verifyToken, checkinController.cancelcheckinlist);
// Delete
router.delete("/checkin/:activity_id/:enroll_token",authJwt.verifyToken, checkinController.cancelcheckin);

module.exports = router;
  