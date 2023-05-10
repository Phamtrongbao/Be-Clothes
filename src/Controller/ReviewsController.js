const Reviews = require("../models/ReviewsModels");

class ReviewsController {
  //[GET] /reviews
  GetComment = async (req, res, next) => {
    Reviews.find({})
      .then((reviews) => {
        res.status(200).send(reviews);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  };
  //[POST] /reviews/postComment
  PostComment = async (req, res, next) => {
    const { Name, Image, Comment, Rating } = req.body;

    const user = req.user;
    console.log(user);
    try {
      const Comments = await new Reviews({
        Name: user.Email,
        Image:
          "https://tse3.mm.bing.net/th?id=OIP.sDZF4IhUT_zIvUKAK0N5iAHaH-&pid=Api&P=0",
        Comment,
        Rating,
      });
      Comments.save();
      res.status(201).send({
        message: "success",
        data: Comments,
      });
    } catch (error) {
      res.status(401).send(error);
    }
  };

  //[PUT] /reviews/:id/updateComment
  PutComment = async (req, res, next) => {
    Reviews.updateOne({ _id: req.params.id }, req.body)
      .then((review) => {
        res.status(201).send(review);
      })
      .catch((err) => {
        res.status(401).send(err);
      });
  };
}

module.exports = new ReviewsController();
