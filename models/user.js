var db = require('../db');

var user = db.Schema({
    username: {type: String, required: true},
    password: {type: String, select: false, required: true}
});

module.exports = db.model('User', user);