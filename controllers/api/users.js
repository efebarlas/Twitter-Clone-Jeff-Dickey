var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var User = require('../../models/user');
var config = require('../../config');

router.get('/', (req, res, next) => {
    if (!req.headers['x-auth']) {
        return res.send(401);
    }
    var auth = jwt.decode(req.headers['x-auth'], config.secret);
    User.findOne({ username: auth.username }, (err, user) => {
        if (err) { return next(err); }
        res.json(user);
    });
});

router.post('/', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .exec((err, user) => {
            if (err) { return next(err); }
            if (user) { return res.send(402); }
        });
    var user = new User({ username: req.body.username });
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) { return next(err); }
        user.password = hash;
        user.save((err) => {
            if (err) { return next(err); }
            res.send(201);
        });
    });
});

module.exports = router;