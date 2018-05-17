var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    email: {
      type: String
    },
    filename: {
      type: String
    },
    loc : {
      lat:Number,
      long:Number
    }
    ,
    heading:Number,
    code:String
});

  module.exports = mongoose.model('user', schema);