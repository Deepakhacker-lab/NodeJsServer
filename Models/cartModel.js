const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
      user_id: {
          type: String,
          required: true
      },
      title: {
        type: String,
        required: true
      },
      
      content: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: new Date()
    }
  }
  );
  
  module.exports = mongoose.model('cart', cartSchema);