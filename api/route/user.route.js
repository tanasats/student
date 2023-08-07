const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const { authJwt } = require("../middleware/auth");

// router.route("/").get((req,res)=>{
//     console.log("User api....");
//     res.send("User api...")
// })

// Get all user
router.get("/users",userController.getall);
//router.get("/users", /*authJwt.verifyToken,*/userController.listallUser);

// Create new user
router.post("/user", /*authJwt.verifyToken,*/ userController.create);
// Update user
router.put("/user/:username", /*authJwt.verifyToken,*/ userController.update);
// Delete user
router.delete("/user/:id", /*authJwt.verifyToken,*/ userController.delete);

// Get all user by user_name
router.get("/user/id/:id",authJwt.verifyToken,userController.getbyid)
router.get("/user/:username",authJwt.verifyToken,userController.getbyusername);

module.exports = router;