const Orders = require("../models/OrdersModels");

class OrderController {
  //[Get] /orders
  GetOrder = (req, res, next) => {
    Orders.find({})
      .then((order) => {
        res.status(200).send(order);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  };
  // [POST] /orders/CreateOrders
  CreateOrders = async (req, res, next) => {
    const { UserName, Email, Address, PhoneNumber, Product,totalPrice } = req.body;
    const user = req.user;
    try {
      const order = await new Orders({
        UserName: user.UserName,
        Email: user.Email,
        Address: user.Address,
        PhoneNumber: user.PhoneNumber,
        totalPrice:totalPrice,
        Product: Product.map((item) => {
          return item;
        }),
      }).save();
      console.log(order);
      res.status(200).send({
        message: "success",
        data: order,
      });
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  };

  //[Get] /orders/:id/detail
  GetDetailsOrder = (req, res, next) => {
    Orders.findById({ _id: req.params.id })
      .then((orderDetail) => {
        res.status(201).send(orderDetail);
      })
      .catch((err) => {
        res.status(500).send("lỗi server");
      });
  };

  //[PUT] /orders/:id/updateorder
  PutOrder = (req, res, next) => {
    Orders.updateOne({ _id: req.params.id }, req.body)
      .then((order) => {
        res.status(201).send(order);
      })
      .catch((err) => {
        res.status(500).send("lỗi server");
      });
  };
}

module.exports = new OrderController();
