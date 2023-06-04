const express = require("express");
const router = express.Router();
const _templateController = require("../controller/_template.controller");
const { authJwt } = require("../middleware/auth");

// Read
//router.get("/_templates",/*authJwt.verifyToken,*/_templateController.filter);
router.get("/_templates",/*authJwt.verifyToken,*/_templateController.getall);
router.get("/_template/:id",/*authJwt.verifyToken,*/ _templateController.getById);
// Create
router.post("/_template", /*authJwt.verifyToken,*/ _templateController.create);
// Update
router.put("/_template/:id", /*authJwt.verifyToken,*/ _templateController.update);
// Delete
router.delete("/_template/:id", /*authJwt.verifyToken,*/ _templateController.delete);

module.exports = router;
