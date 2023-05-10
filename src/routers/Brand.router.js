const express = require("express");
const BrandController = require("../Controller/BrandController");


const router = express.Router();
router.get("/Brand/:id", BrandController.GetBrandDetails);
router.get("/Brand", BrandController.GetBrand);

module.exports = router;
