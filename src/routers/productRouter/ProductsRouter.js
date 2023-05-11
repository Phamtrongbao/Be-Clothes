const express = require("express");
const {  GetDeteilsProduct, PutProduct, CreateProduct, GetProduct} =require("../../Controller/ProductController")
const { AdminAuthenicate, authAdmin } = require("../../MiddleWare/Admin");
const { auth } = require("../../MiddleWare/authenticateCustomer");
const router = express.Router();
router.put(
  "/:id/Updateproduct",
  auth,
  AdminAuthenicate,
  PutProduct
);
router.get("/:id/:slug",GetDeteilsProduct);
router.post(
  "/CreateProduct",
  auth,
  AdminAuthenicate,
  CreateProduct
);
router.get("/", GetProduct);

module.exports = router;
