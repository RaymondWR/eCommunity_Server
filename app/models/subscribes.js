var mongoose = require('mongoose')
    Schema = mongoose.Schema;
    subscribeSchema = new mongoose.Schema({
        category  : { type : String }
        amount : {type: Number, default: 0}
       , createdAt : {type : Date, default : Date.now}
       , user  : { type : Schema.ObjectId, ref : 'User' }
  });

module.exports = mongoose.model('Subscribe', subscribeSchema);