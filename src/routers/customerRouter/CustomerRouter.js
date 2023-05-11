const express = require("express");
const { login, Register, UpdateUser, GetCustomer } = require("../../Controller/CustomerController");
const {
  authenticateCustomer,
  auth,
} = require("../../MiddleWare/authenticateCustomer");

const router = express.Router();

router.post("/login", authenticateCustomer, login);
router.post("/Register", Register);
router.put("/:id/UpdateUser", auth, UpdateUser);

router.get("/", GetCustomer);

module.exports = router;
