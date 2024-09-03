const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const locals = {
    title: 'NodeJs Blog',
    description: 'Simple Blog created with Node.js, Express & MongoDB',
  };

  res.render('index', locals);
});

module.exports = router;
