const express = require("express");
const router = express.Router();
//const uploadImageController = require("../controller/uploadimage.controller");
const picfileController = require("../controller/picfile.controller");


const { authJwt } = require("../middleware/auth");

// Get all user
router.get("/pictures",picfileController.getListFiles);
router.get("/picture/:name",picfileController.download)
router.post("/picture/upload",picfileController.upload);

module.exports = router;  