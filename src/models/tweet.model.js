const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const tweetSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    tweetText: {
      type: String,
      required: true
    },
    type: {
        type: String,
        enum: ['tweet','retweet','threaded'],
        required: true
    },
    likes : [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    }],
    threadedTweet: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Tweet',
    },
    retweetedTweet: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Tweet',
    }
  },
  {
    timestamps: true,
  }
);

tweetSchema.plugin(toJSON);
tweetSchema.plugin(paginate);


/**
 * @typedef Tweet
 */
const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
