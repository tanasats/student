const express = require("express");
const router = express.Router();
const guestController = require("../controller/guest.controller");
//const { authJwt } = require("../middleware/auth");

router.get("/guest/activitys",/*authJwt.verifyToken,*/guestController.activity);

module.exports = router;