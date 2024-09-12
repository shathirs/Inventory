const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const postRoutes = require('./routes/posts'); // Ensure this path is correct

const app = express();
const PORT = 8000;
const DB_URL = 'mongodb+srv://sachinrasangika:sa22496508@seafoodre.iuvdn.mongodb.net/seafoodRe?retryWrites=true&w=majority';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Prefix routes with /api
app.use('/api', postRoutes);

mongoose.connect(DB_URL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log('DB connection error:', err));

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
