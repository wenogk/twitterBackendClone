const express = require('express');
const validate = require('../../middlewares/validate');
const tweetValidation = require('../../validations/tweet.validation');
const tweetController = require('../../controllers/tweet.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/', validate(tweetValidation.getTweets), auth(), tweetController.getTweets);

router.route('/:tweetId')
    .get(validate(tweetValidation.getTweet), tweetController.getTweet)
    .put(validate(tweetValidation.updateTweet), auth(), tweetController.updateTweet)
    .delete( validate(tweetValidation.updateTweet), auth(), tweetController.updateTweet);

router.post('/', validate(tweetValidation.createTweet), auth(), tweetController.createTweet);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Tweet
 *   description: Tweet endpoints
 */

/**
 * @swagger
 * /tweet:
 *   post:
 *     summary: Post a new Tweet
 *     tags: [Tweet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tweetText
 *               - type
 *             properties:
 *               tweetText:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: ['tweet', 'retweet', 'threaded']
 *             example:
 *               tweetText: this is a tweet!
 *               type: tweet
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /tweet/{tweetId}:
 *   get:
 *     summary: Get a single tweet
 *     tags: [Tweet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         schema:
 *           type: string
 *         description: Tweet id
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /tweet/{tweetId}:
 *   put:
 *     summary: Update a single tweet (only your own)
 *     tags: [Tweet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tweetText
 *             properties:
 *               tweetText:
 *                 type: string
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         schema:
 *           type: string
 *         description: Tweet id
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /tweet/{tweetId}:
 *   delete:
 *     summary: Delete a single tweet (only yours)
 *     tags: [Tweet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         schema:
 *           type: string
 *         description: Tweet id
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /tweet:
 *   get:
 *     summary: Get all tweets
 *     description: Only admins can retrieve all users.
 *     tags: [Tweet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: OPTIONAL - get tweets by User Id
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: ['tweet', 'retweet', 'threaded']
 *         description: OPTIONAL - get tweets of a specific type ['tweet', 'retweet', 'threaded']
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
