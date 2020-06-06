var router = require('express').Router();
var User = require('../../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../config')

router.post('/', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .select('password').select('username').exec((err, user) => {
            if (err) { return next(err); }
            if (!user) { return res.send(401); }
            bcrypt.compare(req.body.password, user.password, (err, valid) => {
                if (err) { return next(err); }
                if (!valid) { return res.send(401); }
                var token = jwt.encode({ username: user.username }, config.secret);
                res.send(token);
            })
        });
});

module.exports = router;