const express = require("express");
const {GetBrand ,GetBrandDetails} = require("../Controller/BrandController")


const router = express.Router();
router.get("/Brand/:id", GetBrandDetails);
router.get("/Brand", GetBrand);

module.exports = router;
