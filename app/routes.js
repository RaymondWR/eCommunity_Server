var users = require('./controller/users');
var notes = require('./controller/notes');
var google = require('./controller/googleDriveCtrl')
module.exports = function(app,auth,passport) {


   app.post('/users', users.create);
   app.post('/note', notes.create);
   app.get('/read/:userId',notes.readList);
   app.delete('/read/:noteId',notes.deleteNote);
   app.post('/users/session', passport.authenticate('local', {failureRedirect: '/userlogin', failureFlash: 'Invalid email or password.'}), users.session)
   app.get('/fileupload',google.upload);
   app.get('/getSubCategory/:subCategoryId', notes.getSubCategory);
    // app.post('/api/todos', function(req, res) {
    //     Todo.create({
    //         text: req.body.text,
    //         title: req.body.title,
    //         done: false
    //     }, function(err, todo) {
    //         if (err)
    //             res.send(err);
    //         Todo.find(function(err, todos) {
    //             if (err)
    //             res.send(err)
    //             res.json(todos);
    //         });
    //     });

    // });

    // app.delete('/api/todos/:todo_id', function(req, res) {
    //     Todo.remove({
    //         _id: req.params.todo_id
    //     }, function(err, todo) {
    //         if (err)
    //             res.send(err);

    //         Todo.find(function(err, todos) {
    //             if (err)
    //                 res.send(err)
    //             res.json(todos);
    //         });
    //     });
    // });

    // app.get('/api/event/:event_id', function(req, res) {
    //     Todo.find({
    //         _id: req.params.event_id
    //     }, function(err, events) {
    //         if (err)
    //             res.send(err)

    //         res.json(events);
    //     });
    // });

    // app.get('/api/subevents/:event_id', function(req, res) {
    //     SubEvent.find({
    //         ref_id: req.params.event_id
    //     }, function(err, subevents) {
    //         if (err)
    //             res.send(err)

    //         res.json(subevents);
    //     });
    // });

    // app.post('/api/subevents', function(req, res) {
    //     SubEvent.create({
    //         detail: req.body.text,
    //         title: req.body.title,
    //         ref_id: req.body.ref_id
    //     }, function(err, subevents) {
    //         if (err)
    //             res.send(err);

    //         SubEvent.find({
    //             ref_id: req.body.ref_id
    //         }, function(err, subevents) {
    //             if (err)
    //                 res.send(err)

    //             res.json(subevents);
    //         });
    //     });

    // });
    // app.post('/api/activity/:activity_id', function(req, res) {
    //     SubEvent.update({
    //         _id: req.params.activity_id
    //     },{vote_up : req.body.vote_up,vote_down : req.body.vote_down}, function(err, subevents) {
    //         if (err)
    //             res.send(err)
    //         console.log(subevents);
    //         res.json(subevents);
    //     });

    // });

    // app.get('/api/activity/:activity_id', function(req, res) {
    //     SubEvent.find({
    //         _id: req.params.activity_id
    //     }, function(err, subevents) {
    //         if (err)
    //             res.send(err)
    //         res.json(subevents);
    //     });

    // });
};