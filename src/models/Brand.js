// Using Node.js `require()`
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

const Brand = new Schema(
  {
    Name: { type: String },
    slug: { type: String, slug: "Name", unique: true },
  },
  { timestamps: true, collection: "Brand" }
);

//add plugin
mongoose.plugin(slug);
// Course.plugin(mongoose_delete, {
//   deletedAt: true,
//   overrideMethods: "all",
// });
module.exports = mongoose.model("Brand", Brand);
