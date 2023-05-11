const express = require("express");
const {PutOrder,GetDetailsOrder,CreateOrders,GetOrder} = require("../../Controller/OrdersController");
const { auth } = require("../../MiddleWare/authenticateCustomer");

const router = express.Router();
router.put("/:id/UpdateOrder", auth, PutOrder);
router.get("/:id/GetDetailsOrders", auth, GetDetailsOrder);
router.post("/CreateOrders", auth,CreateOrders);
router.get("/", auth, GetOrder);

module.exports = router;
