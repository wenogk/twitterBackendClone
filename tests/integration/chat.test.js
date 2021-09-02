const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const {
  User
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

describe('Chat routes', () => {
  describe('POST /v1/chat', () => {
    test('should return 201 and successfully create new chat message if data is ok', async () => {
      await insertUsers([userOne, userTwo]);

      let newChatMessage = {
        to: userTwo._id,
        message: "testing message"
      }

      const res = await request(app)
        .post('/v1/chat')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newChatMessage)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        chatMessage: {
          id: expect.anything(),
          to: String(newChatMessage.to),
          from: String(userOne._id),
          message: newChatMessage.message
        }
      });
    });
  });

  describe('GET /v1/chat', () => {
    test('should return 200 and successfully get chat messages between two users', async () => {
      await insertUsers([userOne, userTwo]);

      let newChatMessage = {
        to: String(userTwo._id),
        message: "testing message"
      }

      let newChatMessage2 = {
        to: String(userOne._id),
        message: "testing message back"
      }

      await request(app)
        .post('/v1/chat')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newChatMessage)
        .expect(httpStatus.CREATED);
    
      await request(app)
        .post('/v1/chat')
        .set('Authorization', `Bearer ${userTwoAccessToken}`)
        .send(newChatMessage2)
        .expect(httpStatus.CREATED);

      const res = await request(app)
        .get('/v1/chat')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .query({
          otherUserId: String(userTwo._id)
        })
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        chatMessage: {
          results: expect.any(Array),
          page: 1,
          limit: 10,
          totalPages: 1,
          totalResults: 2
        },
      });
    });
  });

});
