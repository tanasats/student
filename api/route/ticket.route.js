const express = require("express");
const router = express.Router();
const ticketController = require("../controller/ticket.controller");
const { authJwt } = require("../middleware/auth");

// Read
//router.get("/tickets",/*authJwt.verifyToken,*/ticketController.filter);
router.get("/tickets",/*authJwt.verifyToken,*/ticketController.getall);
router.get("/ticket/:id",/*authJwt.verifyToken,*/ ticketController.getById);
// Create
router.post("/ticket", /*authJwt.verifyToken,*/ ticketController.create);
// Update
router.put("/ticket/:id", /*authJwt.verifyToken,*/ ticketController.update);
// Delete
router.delete("/ticket/:id", /*authJwt.verifyToken,*/ ticketController.delete);

router.post("/ticket/gen",ticketController.genticket);


module.exports = router;
