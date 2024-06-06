const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const Post = require('./models/Post');
const postRoutes = require('./routes/posts');
const env = require('dotenv');
env.config();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/posts', postRoutes);

app.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('index', { posts: posts });
});

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});