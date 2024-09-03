const express = require('express');
const User = require('./../models/userModel');

const router = express.Router();

const adminLayout = '../views/layouts/admin';

router.get('/admin', async (req, res) => {
  try {
    const locals = {
      title: 'NodeJs Blog',
      description: 'Simple Blog created with Node.js, Express & MongoDB',
    };

    res.render('admin/index', { locals, layout: adminLayout });
  } catch (err) {}
});

router.post('/admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (req.body.username === 'admin' && req.body.password === 'password') {
      res.send('You are logged in.');
    } else {
      res.send('Wrong username or password');
    }

    res.redirect('/admin');
  } catch (err) {}
});

module.exports = router;
