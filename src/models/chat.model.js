const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const chatSchema = mongoose.Schema(
  {
    from: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    to: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

chatSchema.plugin(toJSON);
chatSchema.plugin(paginate);


/**
 * @typedef Chat
 */
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
