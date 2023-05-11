const Customers = require("../models/CustomerModels");
const jwt = require("jsonwebtoken");


  //[Get] /customer
 const GetCustomer = (req, res, next) => {
    Customers.find()
      .then((customer) => {
        res.status(200).send({
          message: "success",
          data: customer,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: "server error",
          data: err,
        });
      });
  };

  //[POST] /customer/login
 const login = async (req, res, next) => {
    try {
      const { Email, UserName } = req.body;
      const user = await Customers.findOne({ Email });
      // Tạo payload và chuỗi token
      const token = jwt.sign({ userId: user._id }, "trongbao", {
        expiresIn: "48h",
      });
      // Gửi chuỗi bearer token trở lại cho người dùng
      res.status(200).send({
        message: "Login successful.",
        UserId: user,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(401).send("login failure");
    }
  };

  //[POST] /customer/Register
 const Register = async (req, res) => {
    try {
      const { Email, Password, Address, Type, UserName, PhoneNumber, Avatar } =
        req.body;
      // Kiểm tra email và password đã tồn tại hay chưa
      const existingUser = await Customers.findOne({
        $or: [{ Email }, { Password }],
      });
      if (existingUser) {
        if (existingUser.Email === Email) {
          return res.status(400).json({ message: "Email already exists" });
        } else if (existingUser.Password === Password) {
          return res.status(400).json({ message: "Password already exists" });
        }
      }
      const user = await new Customers({
        Email,
        Password,
        Address,
        Type: "User",
        UserName,
        PhoneNumber,
        Avatar:
          "https://tse3.mm.bing.net/th?id=OIP.yFaRQRu38C-JTYdoS31-bAHaHa&pid=Api&P=0",
      });
      await user.save();
      res.status(201).json({
        message: "success",
        data: user,
      });
    } catch (error) {
      res.status(401).send("Incorrect information");
    }
  };

  //[PUT] /Customer/:id/UpdateUser
 const UpdateUser = async (req, res, next) => {
    const user = req.user;
    Customers.updateOne({ _id: req.params.id }, req.body)
      .then((userUpdate) => {
        res.status(201).send({
          message: "success",
          data: userUpdate,
          AccountID: user._id,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).send("Thông tin không chính xác");
      });
  };

  //protected
const  protected = (req, res, next) => {
    const user = req.user;
    res.json(user);
  };

module.exports = {
  GetCustomer,
  login,
  Register,
  UpdateUser
};
