// Using Node.js `require()`
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

const Product = new Schema(
  {
    Name: { type: String },
    Price: { type: Number },
    Image: { type: String },
    slug: { type: String, slug: "Name", unique: true },
    Description: { type: String },
    Rating: { type: Number },
    Amount: { type: Number },
    Size: { type: Array },
    Color: { type: Array },
    Type: { type: String },
    QuantityLeftInStock: { type: Number },
    Discount: { type: String },
    PriceDiscount: { type: Number },
    HotProduct: { type: String},
  },
  { timestamps: true, collection: "products" }
);

//add plugin
mongoose.plugin(slug);
// Course.plugin(mongoose_delete, {
//   deletedAt: true,
//   overrideMethods: "all",
// });
module.exports = mongoose.model("products", Product);
