const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  tweetService
} = require('../services');
const pick = require('../utils/pick');

const createTweet = catchAsync(async (req, res) => {
  const tweet = await tweetService.createTweet({
    ...req.body,
    user: req.user.id
  });
  res.status(httpStatus.CREATED).send({
    tweet
  });
});

const updateTweet = catchAsync(async (req, res) => {
  const tweet = await tweetService.updateTweet(req.params.tweetId, req.user.id, {
    ...req.body
  });
  res.status(httpStatus.OK).send({
    tweet
  });
});

const likeTweet = catchAsync(async (req, res) => {
  const tweet = await tweetService.likeTweet(req.params.tweetId, req.user.id);
  res.status(httpStatus.OK).send({
    tweet
  });
});

const unlikeTweet = catchAsync(async (req, res) => {
  const tweet = await tweetService.unlikeTweet(req.params.tweetId, req.user.id);
  res.status(httpStatus.OK).send({
    tweet
  });
});

const deleteTweet = catchAsync(async (req, res) => {
  const tweet = await tweetService.deleteTweet(req.params.tweetId, req.user.id);
  res.status(httpStatus.OK).send({
    tweet
  });
});

const getTweet = catchAsync(async (req, res) => {
  const tweet = await tweetService.getTweetById(req.params.tweetId);
  res.status(httpStatus.OK).send({
    tweet
  });
});

const getTweets = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user', 'type']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const tweets = await tweetService.getTweets(filter, options);
  res.send({
    tweets
  });
});

module.exports = {
  createTweet,
  updateTweet,
  likeTweet,
  unlikeTweet,
  deleteTweet,
  getTweet,
  getTweets
};
