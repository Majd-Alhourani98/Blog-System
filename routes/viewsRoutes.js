const express = require('express');
const Post = require('./../models/PostModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let perPage = 2;
    let page = req.query.page || 1;

    const posts = await Post.find()
      .sort('-createdAt')
      .skip(perPage * page - perPage)
      .limit(perPage);

    const count = await Post.countDocuments();
    const nextPage = parseInt(page + 1);
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    const locals = {
      title: 'NodeJs Blog',
      description: 'Simple Blog created with Node.js, Express & MongoDB',
    };

    res.render('index', {
      locals,
      posts,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);

    const locals = {
      title: post.title,
      description: 'Simple Blog created with Node.js, Express & MongoDB',
    };

    res.render('post', { locals, post });
  } catch (err) {
    console.log(err);
  }
});

router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: 'Serach',
      description: 'Simple Blog created with Node.js, Express & MongoDB',
    };

    let searchTerm = req.body.searchTerm;
    const searchTermNoSpecialChars = searchTerm.replace(/[^a-zA-Z09-]/g, '');
    // const posts = await Post.find({
    //   $or: [
    //     { title: { $regex: new RegExp(searchTermNoSpecialChars, 'i') } },
    //     { body: { $regex: new RegExp(searchTermNoSpecialChars, 'i') } },
    //   ],
    // });

    const posts = await Post.find({
      $text: { $search: searchTermNoSpecialChars },
    });

    res.render('search', { posts, locals });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
