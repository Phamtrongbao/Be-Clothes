const express = require("express");

const AdminController = require("../../Controller/AdminController");
const { AdminAuthenicate, authAdmin } = require("../../MiddleWare/Admin");
const { auth } = require("../../MiddleWare/authenticateCustomer");

const router = express.Router();
router.post("/LoginAdmin", AdminController.LoginAdmin);
router.post(
  "/CreateBrand",
  auth,
  AdminAuthenicate,
  AdminController.CreateBrand
);

router.get("/searchProduct", AdminController.SearchProduct);
router.get(
  "/searchCustomer",
  auth,
  AdminAuthenicate,
  AdminController.SearchCustomer
);
router.get("/searchOrders", AdminController.SearchOrders);

module.exports = router;
