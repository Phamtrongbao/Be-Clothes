const Product = require("../models/ProductModels");

class ProductController {
  //[GET] /Shirt
  GetProduct = (req, res, next) => {
    Product.find({})
      .then((shirt) => {
        res.status(200).json(shirt);
      })
      .catch(() => {
        res.status(500).send("");
      });
  };

  //[POST] /shirt/AddShirt
  CreateProduct = async (req, res, next) => {
    const {
      id,
      Amount,
      Name,
      Price,
      Image,
      Color,
      Description,
      Size,
      Rating,
      QuantityLeftInStock,
      Type,
      Discount,
      PriceDiscount,
      HotProduct
    } = req.body;
    try {
      const item = await new Product({
        id,
        Amount: 1,
        Name,
        Price,
        Image,
        Color,
        Description,
        Size,
        Rating,
        QuantityLeftInStock,
        Type,
        Discount,
        PriceDiscount,
        HotProduct
      }).save();
      res.status(200).send({
        data: item,
        message: "success",
      });
    } catch (error) {
      console.log(error);
      res.status(406).send("Input data is incorrect");
    }
  };

  //[GET] /Shirt/:id
  GetDeteilsProduct = (req, res, next) => {
    Product.findById(req.params.id)
      .then((shirtID) => {
        console.log(shirtID);
        res.status(200).send(shirtID);
      })
      .catch((err) => {
        res.status(500).send("Sever Err or id fail");
      });
  };

  //[PUT] /Shirt/:id/UpdateShirt
  PutProduct = (req, res, next) => {
    Product.updateOne({ id: req.params._id }, req.body)
      .then((shirt) => {
        res.status(200).send({
          message: "success",
          data: shirt,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message:
            "Yêu cầu của bạn bị lỗi, thiếu thông tin bắt buộc hoặc sai định dạng dữ liệu.",
          data: err,
        });
      });
  };
}

module.exports = new ProductController();
