var express = require('express');
var router = express.Router();
router.use(express.static(__dirname + '/../templates'));
router.use(express.static(__dirname + '/../assets'));

router.get('/', (req,res) => {
    res.sendfile('layouts/app.html');
})

module.exports = router;