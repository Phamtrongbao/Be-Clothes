// Using Node.js `require()`
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");
const OrderSchema = new Schema({
  Amount: { type: Number },
  Color: { type: String },
  price: { type: Number },
  Name: String,
  Price: Number,
  Size: String,
  Image: String,
  Discount: { type: String },
  PriceDiscount: String,
});
const Orders = new Schema(
  {
    UserName: { type: String },
    Email: { type: String },
    PhoneNumber: { type: Number },
    Address: { type: String },
    totalPrice:{type:Number},
    Product: { type: [OrderSchema] },
  },
  { timestamps: true, collection: "orders" }
);

//add plugin
mongoose.plugin(slug);
// Course.plugin(mongoose_delete, {
//   deletedAt: true,
//   overrideMethods: "all",
// });
module.exports = mongoose.model("orders", Orders);
