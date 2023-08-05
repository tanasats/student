const express = require("express");
const router = express.Router();
const studentController = require("../controller/student.controller");
const { authJwt } = require("../middleware/auth");

// router.route("/").get((req,res)=>{
//     console.log("User api....");
//     res.send("User api...")
// })

// Get all user
//router.get("/students",studentController.getall);
router.get("/students",studentController.filter);
//router.get("/students", /*authJwt.verifyToken,*/studentController.listallUser);

// Get all user by user_name
router.get("/student/:studentcode",/*authJwt.verifyToken,*/studentController.getbyStudentcode);

// Create new user
router.post("/student", /*authJwt.verifyToken,*/ studentController.create);
// Update user
router.put("/student/:studentcode", /*authJwt.verifyToken,*/ studentController.update);
// Delete user
router.delete("/student/:id", /*authJwt.verifyToken,*/ studentController.delete);



module.exports = router;