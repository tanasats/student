const express = require("express");
const router = express.Router();
const docfileController = require("../controller/docfile.controller");
const { authJwt } = require("../middleware/auth");

// Read
router.get("/documents",/*authJwt.verifyToken,*/docfileController.getall);
router.get("/document/:name",/*authJwt.verifyToken,*/ docfileController.openfile);
router.get("/document/:tablename/:tableid/:userid",docfileController.getbyTable);

// Create
// router.post("/docfile", /*authJwt.verifyToken,*/ docfileController.create);
// Update
router.put("/document/:id", /*authJwt.verifyToken,*/ docfileController.update);
// Delete
router.delete("/document/:id", /*authJwt.verifyToken,*/ docfileController.delete);
// Upload file
router.post("/document/upload",authJwt.verifyToken,docfileController.upload)

module.exports = router;
