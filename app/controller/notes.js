var mongoose = require('mongoose');
var Note = mongoose.model('Note');

exports.create = function( req, res ) {
    var input = JSON.parse(req.body.mydata);
    note=new Note({
      content: input.content,
      createdAt: new Date().getTime(),
      title: input.title,
      category: input.category,
      isPrivate: input.isPrivate,
      userId: input.userId
    })
    note.save(function (err) {
    if (err) console.log(err)
      res.send( note )
      })
  },
  exports.readList= function( req, res ) {
    var userId = req.params.userId
     Note.find({'userId':  userId}, null, null, function(error, result){
    if(error) {
        console.log(error);
    } else {

        res.send(result)
    }
  });
  },
exports.deleteNote= function( req, res ) {

    var noteId = req.params.noteId;
     Note.remove({
            _id: noteId
        }, function(err, notes) {
            if (err)
                res.send(err);

            Note.find(function(err, notes) {
                if (err)
                res.send(err)
                res.json(notes);
            });
     });
  },

  exports.getSubCategory= function( req, res ) {
    var id = req.params.subCategoryId;
    Note.find({'category':  id}, null, null, function(error, result){
    if(error) {
        console.log(error);
    } else {
        console.log(result);
        res.send(result)
    }
  });


  }
