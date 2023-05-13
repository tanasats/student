const express = require("express");
const router = express.Router();
const agencyController = require("../controller/agency.controller");
const { authJwt } = require("../middleware/auth");

// Read
//router.get("/agencys",/*authJwt.verifyToken,*/agencyController.filter);
router.get("/agencys",/*authJwt.verifyToken,*/agencyController.getall);
router.get("/agency/:id",/*authJwt.verifyToken,*/ agencyController.getById);
// Create
router.post("/agency", /*authJwt.verifyToken,*/ agencyController.create);
// Update
router.put("/agency/:id", /*authJwt.verifyToken,*/ agencyController.update);
// Delete
router.delete("/agency/:id", /*authJwt.verifyToken,*/ agencyController.delete);

module.exports = router;
