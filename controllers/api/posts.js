var Post = require('../../models/post');
var router = require('express').Router();

router.get('/', (req, res, next) => {
    Post.find().sort('-date').exec((err, posts) => {
        if (err) { return next(err); }
        res.json(posts);
    });
});

router.post('/', function (req, res, next) {
    var post = new Post({
        body: req.body.body});
    post.username = (typeof req.auth !== 'undefined') ? req.auth.username : 'anon';
    post.save((err, post) => {
        if (err) { return next(err); }
        res.json(201, post);
    });
});

module.exports = router;