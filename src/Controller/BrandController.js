const Brand = require("../models/Brand");

//[GET] /Brand
const GetBrand = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const brands = await Brand.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    const count = await Brand.countDocuments().exec();

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      brands: brands,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Lỗi khi tìm kiếm các brand",
      error: error.message,
    });
  }
};

//[Get] /Brand/:id/Details
const GetBrandDetails = async (req, res, next) => {
  Brand.findById(req.params.id)
    .then((brand) => {
      res.status(200).send({
        message: "success",
        data: brand,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  GetBrand,
  GetBrandDetails,
};
