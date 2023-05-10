// Using Node.js `require()`
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

const Customers = new Schema(
  {
    UserName: { type: String, required: true, unique: true },
    Email: { type: String, required: true, unique: true },
    PhoneNumber: { type: Number, required: true, unique: true },
    Address: { type: String, required: true, unique: true },
    Password: { type: String, required: true, unique: true },
    Type: { type: String },
    Avatar: { type: String },
  },
  { timestamps: true, collection: "customers" }
);

//add plugin
mongoose.plugin(slug);
// Course.plugin(mongoose_delete, {
//   deletedAt: true,
//   overrideMethods: "all",
// });
module.exports = mongoose.model("customers", Customers);
