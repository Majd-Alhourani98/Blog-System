const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');

const app = express();

// parse JSON Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving Static Folder
app.use(express.static('public'));

// templating Engine
app.use(expressEjsLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./routes/viewsRoutes'));
app.use('/', require('./routes/adminRoutes'));

// Database connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
