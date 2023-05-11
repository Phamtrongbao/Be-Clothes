const express = require("express");

const {
  LoginAdmin,
  SearchCustomer,
  SearchOrders,
  SearchProduct,
} = require("../../Controller/AdminController");
const { AdminAuthenicate, authAdmin } = require("../../MiddleWare/Admin");
const { auth } = require("../../MiddleWare/authenticateCustomer");

const router = express.Router();
router.post("/LoginAdmin", LoginAdmin);
router.post("/CreateBrand", auth, AdminAuthenicate, CreateBrand);

router.get("/searchProduct", SearchProduct);
router.get("/searchCustomer", auth, AdminAuthenicate, SearchCustomer);
router.get("/searchOrders", SearchOrders);

module.exports = router;
