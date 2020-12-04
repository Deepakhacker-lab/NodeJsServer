const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    
    content: {
      type: String,
      required: true
  },
  read: {
      type: String,
      default: 'Unread',
      required: true
  },
  url: {
    type: String,
    required: true
  }
}
);

module.exports = mongoose.model('Post', postSchema);