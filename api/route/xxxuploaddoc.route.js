const express = require("express");
const router = express.Router();
const uploaddocController = require("../controller/uploaddoc.controller");
const { authJwt } = require("../middleware/auth");

// Get all user
router.get("/docs",uploaddocController.getListFiles);
router.get("/doc/:name",uploaddocController.picturefile)
router.get("/doc/:name",uploaddocController.download)

router.post("/doc/upload",uploaddocController.docfileUpload);

module.exports = router; 