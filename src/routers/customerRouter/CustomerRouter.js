const express = require("express");
const CustomerController = require("../../Controller/CustomerController");
const {
  authenticateCustomer,
  auth,
} = require("../../MiddleWare/authenticateCustomer");

const router = express.Router();

router.post("/login", authenticateCustomer, CustomerController.login);
router.post("/Register", CustomerController.Register);
router.put("/:id/UpdateUser", auth, CustomerController.UpdateUser);
router.get("/protected", auth, CustomerController.protected);
router.get("/", CustomerController.GetCustomer);

module.exports = router;
