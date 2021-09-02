const Joi = require('joi');
const {
  objectId
} = require('./custom.validation');

const createTweet = {
  body: Joi.object().keys({
    tweetText: Joi.string().required(),
    type: Joi.valid('tweet', 'retweet', 'threaded').required(),
    threadedTweet: Joi.custom(objectId),
    retweetedTweet: Joi.custom(objectId),
  }),
};

const updateTweet = {
  body: Joi.object().keys({
    tweetText: Joi.string().required(),
  }),
  params: Joi.object().keys({
    tweetId: Joi.custom(objectId),
  }),
};

const deleteTweet = {
  params: Joi.object().keys({
    tweetId: Joi.custom(objectId),
  }),
};

const getTweets = {
  query: Joi.object().keys({
    user: Joi.custom(objectId),
    type: Joi.valid('tweet', 'retweet', 'threaded'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    sortBy: Joi.string()
  }),
}

const getTweet = {
  params: Joi.object().keys({
    tweetId: Joi.custom(objectId)
  }),
}


module.exports = {
  createTweet,
  updateTweet,
  deleteTweet,
  getTweet,
  getTweets
};
