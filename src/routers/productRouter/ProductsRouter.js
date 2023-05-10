const express = require("express");
const ProductController = require("../../Controller/ProductController");
const { AdminAuthenicate, authAdmin } = require("../../MiddleWare/Admin");
const { auth } = require("../../MiddleWare/authenticateCustomer");
const router = express.Router();
router.put(
  "/:id/Updateproduct",
  auth,
  AdminAuthenicate,
  ProductController.PutProduct
);
router.get("/:id/:slug", ProductController.GetDeteilsProduct);
router.post(
  "/CreateProduct",
  auth,
  AdminAuthenicate,
  ProductController.CreateProduct
);
router.get("/", ProductController.GetProduct);

module.exports = router;
