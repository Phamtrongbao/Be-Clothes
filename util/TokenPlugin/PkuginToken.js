const jwt = require("jsonwebtoken");
const addTokenPlugin = (schema, options) => {
  schema.add({
    Token: {
      type: String,
      required: true,
      default: () =>
        jwt.sign({ sub: this._id }, options.secretKey, { expiresIn: "6h" }),
    },
  });
};

module.exports = addTokenPlugin;
