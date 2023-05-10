module.exports = {
  multipleMongooseToObject: (mongooseArray) =>
    mongooseArray.map((item) => item.toObject()),

  mongooseObject: (mongooseObject) =>
    mongooseObject ? mongooseObject.toObject() : mongooseObject,
};
