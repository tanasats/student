const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const { authJwt } = require("../middleware/auth");

// Get all user
router.post("/auth/signin",authController.signin);
router.get("/auth/tokenizer",authJwt.verifyToken,authController.tokenizer); // with header:x-access-token
router.get("/auth/me",authJwt.verifyToken, authController.me);

router.post("/auth/register",authJwt.verifyToken,authController.register);
// router.post("/auth/setpassword",authController.setpassword);

//router.post("/auth/changerole/:role_id",authJwt.verifyToken,authController.changerole);

module.exports = router;
