const express = require("express");
const router = express.Router();
const uploadImageController = require("../controller/uploadimage.controller");
const { authJwt } = require("../middleware/auth");

// Get all user
router.get("/images",uploadImageController.getListFiles);
router.get("/image/:name",uploadImageController.download)
router.post("/image/upload",uploadImageController.upload);

module.exports = router; 