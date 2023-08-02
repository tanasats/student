const express = require("express");
const router = express.Router();
const enrollController = require("../controller/enroll.controller");
const { authJwt } = require("../middleware/auth");

// Read
//router.get("/enrolls",/*authJwt.verifyToken,*/enrollController.filter);
router.get("/enrolls",/*authJwt.verifyToken,*/enrollController.getall);
router.get("/enroll/:id",/*authJwt.verifyToken,*/ enrollController.getById);
// Create
router.post("/enroll", /*authJwt.verifyToken,*/ enrollController.create);
// Update
router.put("/enroll/:id", /*authJwt.verifyToken,*/ enrollController.update);
// Delete
router.delete("/enroll/:id", /*authJwt.verifyToken,*/ enrollController.delete);

router.get("/enroll/useractivity/:user_id/:activity_id",enrollController.useractivity);
router.get("/enroll/activity/:studentcode",enrollController.activitybyuser);
router.get("/enroll/registrant/:activity_id",enrollController.registrant)



module.exports = router;
 