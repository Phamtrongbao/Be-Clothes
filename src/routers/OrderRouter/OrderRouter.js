const express = require("express");
const OrdersController = require("../../Controller/OrdersController");
const { auth } = require("../../MiddleWare/authenticateCustomer");

const router = express.Router();
router.put("/:id/UpdateOrder", auth, OrdersController.PutOrder);
router.get("/:id/GetDetailsOrders", auth, OrdersController.GetDetailsOrder);
router.post("/CreateOrders", auth,OrdersController.CreateOrders);
router.get("/", auth, OrdersController.GetOrder);

module.exports = router;
