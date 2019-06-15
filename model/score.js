var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const scoreSchema=Schema({
    name:String,
    score:Number,
    date:Date,
})

module.exports = mongoose.model('score', scoreSchema);