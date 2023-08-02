const express = require("express");
const router = express.Router();
//const uploadImageController = require("../controller/uploadimage.controller");
const picfileController = require("../controller/picfile.controller");


const { authJwt } = require("../middleware/auth");

// Get all user
router.get("/pics",picfileController.getListFiles);
router.get("/pic/:name",picfileController.download)
router.post("/pic/upload",picfileController.upload);

module.exports = router;  