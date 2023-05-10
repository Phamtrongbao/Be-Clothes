const Admin = require("../../src/models/AdminModels");
const jwt = require("jsonwebtoken");
const AdminAuthenicate = (req, res, next) => {
  Admin.findOne({ Type: "Admin" })
    .then((admin) => {
      if (admin) {
        next();
      } else {
        res.status(403).send("Không có quyền truy cập");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Lỗi máy chủ");
    });
};

const authAdmin = async (req, res, next) => {
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
    const admin = await Admin.findOne({ _id: decoded.adminId });
    // // Lưu thông tin người dùng vào request object và cho phép truy cập vào API
    req.admin = admin;
    next();
  } catch (error) {
    console.log(error);
    // Gửi phản hồi lỗi nếu mã thông báo xác thực không hợp lệ
    res.status(401).send({ message: "Không có quyền truy cập." });
  }
};
module.exports = {
  AdminAuthenicate,
  authAdmin,
};
