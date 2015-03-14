var mongoose = require('mongoose')
    Schema = mongoose.Schema;
   notesSchema = new mongoose.Schema({
        content: { 'type': String, 'default': 'empty text...' }
       , title: { 'type': String, 'default': 'empty text...' }
       , category  : { type : String }
       , createdAt : {type : Date, default : Date.now}
       , isPrivate : {type : Boolean, default : true}
       , userId  : { type: String }
       , rating  : { type: Number, default: 0 }
  });

module.exports = mongoose.model('Note', notesSchema);