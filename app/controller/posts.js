var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Note = mongoose.model('Note');
var util = {};

util.validate = function( input ) {
  return input.text
}

util.fixid = function( doc ) {
  if( doc._id ) {
    doc.id = doc._id.toString()
    delete doc._id
  }
  else if( doc.id ) {
    doc._id = new mongodb.ObjectID(doc.id)
    delete doc.id
  }
  return doc
}


  exports.create = function( req, res ) {
    console.log("post created");
    console.log(req.body);
    var input = JSON.parse(req.body.mydata); 
    post=new Post({
      text: input.comments,
      createdAt: new Date().getTime(),
      note: input.noteId,
      rating: input.rating,
      user: input.userId,
      username: input.username
    })
    post.save(function (err) {
    if (err) console.log(err)
      res.send( post )
      })
  },
 exports.totalcomments= function (req, res) {
  Post.count({}, function(err, result){
    res.send(result.toString());
  });
  
}
exports.latestcomments= function (req, res) {
  Post.find({}, null, {limit:3}, function(err, result){
    res.send(result);
  });
  
}

  exports.read= function( req, res ) {
    var input = req.query
    
    post.find({'_id':  input.id}, null, null, function(error, result){
    if(error) {
        console.log(error);
    } else {

        res.send(result)
    }
  });
  },


  exports.listbyUser= function( req, res ) {
    
    var input = req.params.userId;
    var options = {sort:[['_id','desc']]};
    post.find({'user':  input}, null, null, function(error, result){
    if(error) {
        console.log(error);
    } else {
        var reviews = [];
        var reviewdetails;
        
        function asyncLoop( i, callback ) {
          if( i < result.length ) {
          var re=result[i];
           
          User.find({'_id':  result[i].user}, null, null, function(error, resultuser){
             var users=resultuser[0];
             Movie.find({'_id':  re.movie}, null, null, function(error, resultmovie){
                var moviedetai = resultmovie[0];
                reviewdetails={ 'user':users, 'movie':moviedetai, 'review': re};
                reviews.push(reviewdetails);
                asyncLoop( i+1, callback );      
            });
             
          });
        }else {
        callback();
        }
      }
        
        asyncLoop( 0, function() {
          res.send(reviews);
        });
        
    }
  });
  },

  exports.listbySubject= function( req, res ) {
    var input = req.params.subjectId;
    console.log(input.toObjectId())
    
    Post.find({'note':  input.toObjectId()}, null, null, function(error, result){
    if(error) {
        console.log(error);
    } else {
       res.send(result);
        
    }
  });
  }
  String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};


