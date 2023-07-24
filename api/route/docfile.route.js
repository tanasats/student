const express = require("express");
const router = express.Router();
const docfileController = require("../controller/docfile.controller");
const { authJwt } = require("../middleware/auth");

// Read
router.get("/docfiles",/*authJwt.verifyToken,*/docfileController.getall);
router.get("/docfile/:name",/*authJwt.verifyToken,*/ docfileController.openfile);
//router.get("/docfile/:id",/*authJwt.verifyToken,*/ docfileController.getbyId);
router.get("/docfile/:tablename/:tableid/:userid",docfileController.getbyTable);

// Create
// router.post("/docfile", /*authJwt.verifyToken,*/ docfileController.create);
// Update
router.put("/docfile/:id", /*authJwt.verifyToken,*/ docfileController.update);
// Delete
router.delete("/docfile/:id", /*authJwt.verifyToken,*/ docfileController.delete);
// Upload file
router.post("/docfile/upload",authJwt.verifyToken,docfileController.upload)

module.exports = router;
