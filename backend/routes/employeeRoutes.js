// routes/employeeRoutes.js
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const authorizeRole =  require("../middleware/authorizeRole.js");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, employeeController.getAllEmployees);
router.get("/:id", verifyToken, employeeController.getEmployeeById);
router.post("/", verifyToken, employeeController.createEmployee);
router.put("/:id", verifyToken, authorizeRole("Admin"), employeeController.updateEmployee);
router.delete("/:id", verifyToken, authorizeRole("Admin"), employeeController.deleteEmployee);

module.exports = router;
