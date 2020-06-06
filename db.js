var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/social', () => {
    console.log('mongodb connect');
})

module.exports = mongoose;