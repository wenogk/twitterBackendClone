const {
  Tweet
} = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
/**
 * Create a new tweet
 * @param {Object} tweetBody
 * @returns {Promise<Tweet>}
 */
const createTweet = async (tweetBody) => {
  return Tweet.create(tweetBody);
};

/**
 * Update a tweet
 * @param {Object} tweetBody
 * @returns {Promise<Tweet>}
 */
const updateTweet = async (tweetId, userId, updateBody) => {
  const tweet = await Tweet.findOne({
    _id: tweetId,
    user: userId
  });

  if (!tweet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tweet not found');
  }

  Object.assign(tweet, updateBody);
  await tweet.save();
  return tweet
};

/**
 * Delete a tweet
 * @param {Object} tweetBody
 * @returns {Promise<null>}
 */
const deleteTweet = async (tweetId, userId) => {
  const deletedTweet = await Tweet.deleteOne({
    _id: tweetId,
    user: userId
  });
  return deletedTweet
};


/**
 * Get tweets
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getTweets = async (filters, options) => {
  const chatMsgs = await Tweet.paginate(filters, {
    ...options,
    populate: ['user', 'threadedTweet', 'retweetedTweet', 'likes']
  });
  return chatMsgs;
};

/**
 * Get a tweet
 * @param tweetId
 * @returns {Promise<null>}
 */
const getTweetById = async (tweetId) => {
  const tweet = await Tweet.findOne({
    _id: tweetId
  });
  return tweet;
};

/**
 * Like a tweet
 * @param tweetId
 * @param userId
 * @returns {Promise<Tweet>}
 */
const likeTweet = async (tweetId, userId) => {
  const tweet = await Tweet.findOne({
    _id: tweetId,
  });

  if (!tweet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tweet not found');
  }

  return await Tweet.updateOne({
    _id: tweetId
  }, {
    $addToSet: {
      likes: userId
    }
  })
};

/**
 * Unike a tweet
 * @param tweetId
 * @param userId
 * @returns {Promise<Tweet>}
 */
 const unlikeTweet = async (tweetId, userId) => {
  const tweet = await Tweet.findOne({
    _id: tweetId,
  });

  if (!tweet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tweet not found');
  }

  return await Tweet.updateOne({
    _id: tweetId
  }, {
    $pull: {
      likes: userId
    }
  })
};

module.exports = {
  getTweets,
  createTweet,
  updateTweet,
  deleteTweet,
  getTweets,
  getTweetById,
  likeTweet,
  unlikeTweet
};
