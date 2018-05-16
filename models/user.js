var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    email: {
      type: String
    },
    filename: {
      type: Number
    },
    loc :  { 
        type: {type:String},
        coordinates: [Number]
    },

});

function getNextSequenceValue(sequenceName){

    var sequenceDocument = db.counters.findAndModify({
       query:{filename: sequenceName },
       update: {$inc:{sequence_value:1}},
       new:true
    });
     
    return sequenceDocument.sequence_value;
 }
  module.exports = mongoose.model('user', schema);