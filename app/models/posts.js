var mongoose = require('mongoose')
    Schema = mongoose.Schema;
   postsSchema = new mongoose.Schema({
        text: { 'type': String, 'default': 'empty text...' }
       , rating: { 'type': String, 'default': '0' }
       , note  : { type : Schema.ObjectId, ref : 'Note' } 
       , createdAt : {type : Date, default : Date.now}
       , user  : { type : Schema.ObjectId, ref : 'User' }
       , username  : { 'type': String, 'default': 'empty text...' }
  });

module.exports = mongoose.model('Post', postsSchema);