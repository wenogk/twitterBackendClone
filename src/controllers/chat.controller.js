const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { chatService } = require('../services');

const sendMessage = catchAsync(async (req, res) => {
  const chatMessage = await chatService.sendMessage({...req.body, from: req.user.id});
  res.status(httpStatus.CREATED).send({ chatMessage });
});

const getMessages = catchAsync(async (req, res) => {
    const chatMessage = await chatService.getChat(req.user.id,req.query.otherUserId,{limit : req.query.limit, page : req.query.page, sortBy : req.query.sortBy});
    res.send({ chatMessage });
});

module.exports = {
    sendMessage,
    getMessages
};