const { MongoClient } = require("mongodb");
const Customers = require("../models/CustomerModels");
const uri = "mongodb://localhost:27017/B-Store";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const jwt = require("jsonwebtoken");

const authenticateCustomer = async (req, res, next) => {
  try {
    // Kết nối đến MongoDB
    await client.connect();
    const database = client.db("B-Store");
    const collection = database.collection("customers");
    // Kiểm tra khách hàng tồn tại
    const { Email, Password } = req.body;
    const customer = await collection.findOne({
      Email,
    });
    console.log(customer, "cus");
    if (!customer) {
      return res.status(401).json({ message: "Invalid Email " });
    }

    // Xác thực tài khoản/mật khẩu
    if (customer.Password !== req.body.Password) {
      return res.status(401).json({ message: "Invalid  password." });
    }

    // // Lưu thông tin khách hàng vào đối tượng req để sử dụng cho các middleware khác
    req.customer = customer;

    // // // Đóng kết nối
    await client.close();

    // Tiếp tục thực thi các middleware tiếp theo
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const auth = async (req, res, next) => {
  // Lấy mã thông báo xác thực từ header
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("thông tin đăng nhập không đúng");
  }
  console.log(token);
  try {
    // Giải mã mã thông báo xác thực
    const decoded = jwt.verify(token, "trongbao");
    console.log(decoded);
    // Tìm thông tin người dùng trong cơ sở dữ liệu
    const user = await Customers.findOne({ _id: decoded.userId });
    // // Lưu thông tin người dùng vào request object và cho phép truy cập vào API
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    // Gửi phản hồi lỗi nếu mã thông báo xác thực không hợp lệ
    res.status(401).send({ message: "Không có quyền truy cập." });
  }
};

module.exports = {
  authenticateCustomer,
  auth,
};
