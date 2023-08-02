const express = require("express");
const router = express.Router();
const picfileController = require("../controller/picfile.controller");
const { authJwt } = require("../middleware/auth");

// Get all user
router.get("/files",picfileController.getListFiles);
router.get("/file/picture/:name",picfileController.picturefile)
router.get("/file/:name",picfileController.download)
router.post("/file/upload",picfileController.upload);

router.post("/file/docfile",picfileController.docfileUpload);

module.exports = router; 