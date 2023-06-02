const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');
// const catchAsync = require('./../utils/catchAsync');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested route
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  // console.log(req.body.tour, req.body.user);
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.getReview = factory.getOne(Review);

// exports.getAllReviews = catchAsync(async (req, res, next) => {
//   let filter = {};
//   if (req.params.tourId) filter = { tour: req.params.tourId };
//   const review = await Review.find(filter);
//   res.status(200).json({
//     status: 'success',
//     results: review.length,
//     data: {
//       review,
//     },
//   });
// });

// exports.createReview = catchAsync(async (req, res, next) => {
//   // Allow nested route
//   if (!req.body.tour) req.body.tour = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user.id;
//   const newReview = await Review.create(req.body);
//   res.status(201).json({
//     status: 'Success',
//     data: {
//       review: newReview,
//     },
//   });
// });
