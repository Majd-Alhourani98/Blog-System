const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updateAt: {
    type: Date,
    default: Date.now,
  },
});

// Create text indexes in your Post model or MongoDB shell
postSchema.index({ title: 'text', body: 'text' });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
