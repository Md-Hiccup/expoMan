const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  items: [
    {
      date: {
        type: Date,
        default: Date.now
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Items = mongoose.model("items", ItemSchema);
