const express = require("express");
const { auth } = require("../../MiddleWare/authenticateCustomer");
const ReviewsController = require("../../Controller/ReviewsController");

const router = express.Router();
router.put("/:id/updateComment", auth, ReviewsController.PutComment);
router.post("/postComment", auth, ReviewsController.PostComment);
router.get("/", auth, ReviewsController.GetComment);
module.exports = router;
