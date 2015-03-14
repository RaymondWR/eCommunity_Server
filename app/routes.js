var users = require('./controller/users');
var notes = require('./controller/notes');
var posts= require('./controller/posts');
var google = require('./controller/googleDriveCtrl')
module.exports = function(app,auth,passport) {


   app.post('/users', users.create);
   app.get('/userlogin', users.login);
   app.post('/admincreate', users.admincreate);
   app.get('/totalusers', users.totalusers);
   app.get('/totalnotes', notes.totalnotes);
   app.get('/totalcomments', posts.totalcomments);
   app.get('/latestcomments', posts.latestcomments);
   app.get('/latestnotes', notes.latestnotes);
   app.get('/listdoc/:subCategoryId', google.listdocs);
   app.get('/logout', users.logout);
   app.post('/socialusers', users.createsocial);
   app.post('/note', notes.create);
   app.post('/note/addcomment', posts.create);
   app.get('/note/listbysubject/:subjectId', posts.listbySubject);
   app.get('/read/:userId',notes.readList);
   app.delete('/read/:noteId',notes.deleteNote);
   app.post('/users/session', passport.authenticate('local', {failureRedirect: '/userlogin', failureFlash: 'Invalid email or password.'}), users.session)
   app.post('/fileupload',google.upload);
   app.get('/fileretrive/:fileId',google.fileretirve);
   app.get('/getSubCategory/:subCategoryId', notes.getSubCategory);
   
};