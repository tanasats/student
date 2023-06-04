const express = require("express");
const router = express.Router();
const fileController = require("../controller/file.controller");
const { authJwt } = require("../middleware/auth");

// Get all user
router.get("/files",fileController.getListFiles);
router.get("/file/:name",fileController.download)
router.post("/file/upload",fileController.upload);

router.post("/file/docfile",fileController.docfileUpload);

module.exports = router; 