const express = require('express');
const dotenv = require('dotenv');
const expressEjsLayouts = require('express-ejs-layouts');

dotenv.config();

const app = express();

// Serving Static Folder
app.use(express.static('public'));

// templating Engine
app.use(expressEjsLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./routes/viewsRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
