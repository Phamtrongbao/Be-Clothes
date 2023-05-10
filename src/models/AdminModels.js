// Using Node.js `require()`
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

const Admin = new Schema(
  {
    Email: { type: String, unique: true },
    PassWord: { type: String || Number, unique: true },
    Type: { type: String },
    slug: { type: String, slug: "Name", unique: true },
  },
  { timestamps: true, collection: "Admin" }
);

//add plugin
mongoose.plugin(slug);
// Course.plugin(mongoose_delete, {
//   deletedAt: true,
//   overrideMethods: "all",
// });
module.exports = mongoose.model("Admin", Admin);
