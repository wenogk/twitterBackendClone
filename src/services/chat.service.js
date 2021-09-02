const {
  Chat
} = require('../models');

/**
 * Create a chat
 * @param {Object} msgBody
 * @returns {Promise<Chat>}
 */
const sendMessage = async (msgBody) => {
  return Chat.create(msgBody);
};

/**
 * Get chat messages
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getChat = async (userOne, userTwo, options) => {
  const filter = {
    $or: [{
      from: userOne,
      to: userTwo
    }, {
      from: userTwo,
      to: userOne
    }]
  }
  console.log("filter = " + JSON.stringify(filter))
  const chatMsgs = await Chat.paginate(filter, options);
  return chatMsgs;
};

module.exports = {
  getChat,
  sendMessage
};
