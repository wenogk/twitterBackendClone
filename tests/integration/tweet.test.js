const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const {
  Tweet
} = require('../../src/models');
const {
  userOne,
  userTwo,
  admin,
  insertUsers
} = require('../fixtures/user.fixture');
const {
  userOneAccessToken,
  userTwoAccessToken,
  adminAccessToken
} = require('../fixtures/token.fixture');

setupTestDB();

describe('Tweet routes', () => {
  describe('POST /v1/tweet', () => {
    test('should return 201 and successfully create new normal tweet if data is ok', async () => {
      await insertUsers([userOne, userTwo]);

      let newTweet = {
        tweetText: "testing message",
        type: "tweet"
      }

      const res = await request(app)
        .post('/v1/tweet')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newTweet)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        tweet: {
            likes: expect.any(Array),
            tweetText: newTweet.tweetText,
            type: newTweet.type,
            user: String(userOne._id),
            id: expect.anything()
          }
      });
    });

    test('should return 201 and successfully create new threaded tweet if data is ok', async () => {
        await insertUsers([userOne, userTwo]);
  
        let newTweet = {
          tweetText: "testing message",
          type: "tweet"
        }
  
        const savedTweet = await request(app)
          .post('/v1/tweet')
          .set('Authorization', `Bearer ${userOneAccessToken}`)
          .send(newTweet)
          .expect(httpStatus.CREATED);

        let tweetInsertId = String(JSON.parse(savedTweet.text).tweet.id)

        let newThreadedTweet = {
            threadedTweet : tweetInsertId,
            tweetText: "testing message",
            type: "threaded"
          }
        
        const res = await request(app)
          .post('/v1/tweet')
          .set('Authorization', `Bearer ${userOneAccessToken}`)
          .send(newThreadedTweet)
          .expect(httpStatus.CREATED);
        
        expect(res.body).toEqual({
          tweet: {
              likes: expect.any(Array),
              threadedTweet: tweetInsertId,
              tweetText: newThreadedTweet.tweetText,
              type: newThreadedTweet.type,
              user: String(userOne._id),
              id: expect.anything()
            }
        });
      });

      test('should return 201 and successfully retweet if data is ok', async () => {
        await insertUsers([userOne, userTwo]);
  
        let newTweet = {
          tweetText: "testing message",
          type: "tweet"
        }
  
        const savedTweet = await request(app)
          .post('/v1/tweet')
          .set('Authorization', `Bearer ${userOneAccessToken}`)
          .send(newTweet)
          .expect(httpStatus.CREATED);

        let tweetInsertId = String(JSON.parse(savedTweet.text).tweet.id)

        let newRetweetedTweet = {
            retweetedTweet : tweetInsertId,
            type: "retweet"
          }
        
        const res = await request(app)
          .post('/v1/tweet')
          .set('Authorization', `Bearer ${userOneAccessToken}`)
          .send(newRetweetedTweet)
          .expect(httpStatus.CREATED);
        
        expect(res.body).toEqual({
          tweet: {
              likes: expect.any(Array),
              retweetedTweet: tweetInsertId,
              type: newRetweetedTweet.type,
              user: String(userOne._id),
              id: expect.anything()
            }
        });
      });
  });

  describe('GET /v1/tweet', () => {
    test('should return 200 and successfully get all tweets', async () => {
        await insertUsers([userOne]);

      let newTweet = {
        tweetText: "testing message",
        type: "tweet"
      }

      await request(app)
        .post('/v1/tweet')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newTweet)
        .expect(httpStatus.CREATED);

      const res = await request(app)
        .get('/v1/tweet')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .query({})
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        tweets: {
          results: expect.any(Array),
          page: 1,
          limit: 10,
          totalPages: 1,
          totalResults: 1
        },
      });
    });

    
  });

  describe('GET /v1/tweet/:tweetId', () => {
    test('should return 200 and successfully get specific tweet', async () => {
        await insertUsers([userOne]);

      let newTweet = {
        tweetText: "testing message",
        type: "tweet"
      }

      let savedTweet = await request(app)
        .post('/v1/tweet')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newTweet)
        .expect(httpStatus.CREATED);

    let tweetInsertId = String(JSON.parse(savedTweet.text).tweet.id)
      const res = await request(app)
        .get(`/v1/tweet/${tweetInsertId}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .query({})
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        tweet: {
            likes: expect.any(Array),
            tweetText: newTweet.tweetText,
            type: newTweet.type,
            user: String(userOne._id),
            id: tweetInsertId
          }
      });
    });
  });

  describe('PUT /v1/tweet/:tweetId', () => {
    test('should return 200 and successfully update specific tweet', async () => {
        await insertUsers([userOne]);

      let newTweet = {
        tweetText: "testing message",
        type: "tweet"
      }

      let newTweetText = "this is an updated tweet"

      let savedTweet = await request(app)
        .post('/v1/tweet')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newTweet)
        .expect(httpStatus.CREATED);

    let tweetInsertId = String(JSON.parse(savedTweet.text).tweet.id)
      const res = await request(app)
        .put(`/v1/tweet/${tweetInsertId}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send({
            tweetText : newTweetText
        })
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        tweet: {
            likes: expect.any(Array),
            tweetText: newTweetText,
            type: newTweet.type,
            user: String(userOne._id),
            id: tweetInsertId
          }
      });
    });
  });

  describe('DELETE /v1/tweet/:tweetId', () => {
    test('should return 200 and successfully delete specific tweet', async () => {
        await insertUsers([userOne]);

      let newTweet = {
        tweetText: "testing message",
        type: "tweet"
      }

      let savedTweet = await request(app)
        .post('/v1/tweet')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newTweet)
        .expect(httpStatus.CREATED);

    let tweetInsertId = String(JSON.parse(savedTweet.text).tweet.id)
        await request(app)
        .delete(`/v1/tweet/${tweetInsertId}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

        const findTweet = await request(app)
        .get(`/v1/tweet/${tweetInsertId}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .query({})
        .expect(httpStatus.OK);
    
      expect(findTweet.body.tweet).toEqual(null);
    });
  });

});
