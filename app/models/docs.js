var mongoose = require('mongoose')
    Schema = mongoose.Schema;
   docsSchema = new mongoose.Schema({
         url: { 'type': String, 'default': 'empty text...' }
       , title: { 'type': String, 'default': 'empty text...' }
       , category  : { type : String }
       , createdAt : {type : Date, default : Date.now}
       , description : {type: String}
       , username : { type: String }
  });

module.exports = mongoose.model('Doc', docsSchema);