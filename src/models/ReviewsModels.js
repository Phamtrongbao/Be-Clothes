// Using Node.js `require()`
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

const Reviews = new Schema(
  {
    Name: { type: String },
    Image: { type: String },
    slug: { type: String, slug: "Name", unique: true },
    Comment: { type: String },
    Rating: { type: Number },
  },
  { timestamps: true, collection: "reviews" }
);

//add plugin
mongoose.plugin(slug);
// Course.plugin(mongoose_delete, {
//   deletedAt: true,
//   overrideMethods: "all",
// });
module.exports = mongoose.model("reviews", Reviews);
