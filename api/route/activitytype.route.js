const express = require("express");
const router = express.Router();
const activitytypeController = require("../controller/activitytype.controller");
const { authJwt } = require("../middleware/auth");

// Read
//router.get("/activitytypes",/*authJwt.verifyToken,*/activitytypeController.filter);
router.get("/activitytypes",/*authJwt.verifyToken,*/activitytypeController.getall);
router.get("/activitytype/:id",/*authJwt.verifyToken,*/ activitytypeController.getById);
// Create
router.post("/activitytype", /*authJwt.verifyToken,*/ activitytypeController.create);
// Update
router.put("/activitytype/:id", /*authJwt.verifyToken,*/ activitytypeController.update);
// Delete
router.delete("/activitytype/:id", /*authJwt.verifyToken,*/ activitytypeController.delete);

module.exports = router;
