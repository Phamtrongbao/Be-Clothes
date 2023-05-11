const Brand = require("../models/Brand");
const Admin = require("../models/AdminModels");
const jwt = require("jsonwebtoken");
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb://localhost:27017/B-store?retryWrites=true&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//[POST] /admin/Create-Brand
const CreateBrand = async (req, res, next) => {
  const { Name, Price, Description, Image, Color, Size } = req.body;
  try {
    const brand = await new Brand({
      Name: Name,
      Price: Price,
      Description: Description,
      Image: Image,
      Color: Color,
      Size: Size,
    }).save();
    console.log(brand);
    res.status(200).send(brand);
  } catch (error) {
    console.log(error);
    res.status(500).send("faild");
  }
};

const LoginAdmin = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    const admin = await Admin.findOne({ Email, Password });
    if (!admin) {
      res.status(401).send("Email hoặc mật khẩu  không đúng");
    }
    // Tạo payload và chuỗi token
    const token = jwt.sign({ adminId: admin._id }, "trongbao", {
      expiresIn: "48h",
    });
    // Gửi chuỗi bearer token trở lại cho người dùng
    res.status(200).send({
      message: "Login successful.",
      adminId: admin,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send("login failure");
  }
};

const SearchProduct = async (req, res) => {
  try {
    const query = req.query.q;
    const collection = client.db("B-Store").collection("products");
    const result = await collection
      .find({ Name: { $regex: query, $options: "i" } })
      .toArray();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Lỗi máy chủ");
  }
};

const SearchCustomer = async (req, res) => {
  try {
    const query = req.query.q;
    const collection = client.db("B-Store").collection("customers");
    const result = await collection
      .find({ Name: { $regex: query, $options: "i" } })
      .toArray();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Lỗi máy chủ");
  }
};

const SearchOrders = async (req, res) => {
  try {
    const query = req.query.q;
    const collection = client.db("B-Store").collection("orders");
    const result = await collection
      .find({ Name: { $regex: query, $options: "i" } })
      .toArray();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Lỗi máy chủ");
  }
};

module.exports = {
  CreateBrand,
  LoginAdmin,
  SearchProduct,
  SearchCustomer,
  SearchOrders,
};
