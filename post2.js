// routes/post2.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


router.get('/new', (req, res) => {
    res.render('new-post');
});

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    await post.save();
    res.redirect('/');
});

router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('post', { post: post });
});


router.post('/:id/delete', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;
