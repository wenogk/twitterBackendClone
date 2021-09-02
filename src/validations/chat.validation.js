const Joi = require('joi');
const { objectId } = require('./custom.validation');

const sendChatMessage = {
  body: Joi.object().keys({
    to: Joi.required().custom(objectId),
    message: Joi.string().required()
  }),
};

const getChat = {
    query: Joi.object().keys({
        otherUserId: Joi.required().custom(objectId),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
        sortBy : Joi.string()
      }),
}


module.exports = {
    sendChatMessage,
    getChat
  };