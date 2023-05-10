const cors = require("cors");
const BrandRouter = require("./Brand.router");
const AdminRouter = require("./AdminRouter/Admin.router");
const Product = require("./productRouter/ProductsRouter");
const Orders = require("./OrderRouter/OrderRouter");
const Customers = require("./customerRouter/CustomerRouter");
const reviews = require("./Reviews/ReviewsRouter");
function routers(app) {
  app.use("/reviews", cors(), reviews);
  app.use("/customer", cors(), Customers);
  app.use("/Orders", cors(), Orders);
  app.use("/product", cors(), Product);
  app.use("/admin", cors(), AdminRouter);
  app.use("/", cors(), BrandRouter);
}

module.exports = routers;
