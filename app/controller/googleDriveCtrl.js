var mongoose = require('mongoose');
var formidable = require('formidable');
var Doc = mongoose.model('Doc');
var util = require('util');
var google = require('googleapis');
var drive = google.drive('v2');
var OAuth2Client = google.auth.OAuth2;
var fs = require('fs');
var GoogleTokenProvider = require("refresh-token").GoogleTokenProvider;
// var REFRESH_TOKEN = "1/1X2PEH7Z0ogRs5Wdizdwc8Gi4q2cwKPP6lHr6_SgmrQMEudVrK5jSpoR30zcRFq6";
// var CLIENT_ID = '350174872983-6910r0hd881d3qt6qs5g1have17s2i0c.apps.googleusercontent.com',
//     CLIENT_SECRET = '4xdT-aJZecZq1F-ZANA2se_D',
//     REDIRECT_URL = 'https://developers.google.com/oauthplayground',
//     SCOPE = 'https://www.googleapis.com/auth/drive.file';
var REFRESH_TOKEN = "1/4pimnD7gtbx14Q5SO-RyNjNBnp60PRbTNWgmDETIejsMEudVrK5jSpoR30zcRFq6";
var CLIENT_ID = '663938581833-pm34t1aelifceuf2ivjnr95q17aq2dbp.apps.googleusercontent.com',
    CLIENT_SECRET = 'zxryub0DdaGgI4BmaCeUU2RK',
    REDIRECT_URL = 'https://developers.google.com/oauthplayground',
    SCOPE = 'https://www.googleapis.com/auth/drive.file';
var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
var tokenProvider = new GoogleTokenProvider({
  'refresh_token': REFRESH_TOKEN,
  'client_id' : CLIENT_ID,
  'client_secret': CLIENT_SECRET
});

exports.fileretirve = function( req, res ) {
  var fileId = req.params.fileId
  tokenProvider.getToken(function(err, access_token) {
  oauth2Client.setCredentials({
  access_token: access_token
  });

    drive.files.get({
      fileId: fileId,
      auth: oauth2Client
    }, function(err, response) {
      console.log(response)
      res.send(response)
  });

});

}


exports.upload = function(req, res) {
  console.log(req.body)
  var input = req.body;
  var doc = new Doc({
      url: input.url,
      createdAt: new Date().getTime(),
      title: input.title,
      category: input.subject,
      username: input.username,
      description: input.description
    })
    doc.save(function (err) {
    if (err) console.log(err)
      res.send( doc )
  })
    
}
  
exports.listdocs= function(req, res) {
  var id = req.params.subCategoryId;
    Doc.find({'category':  id}, null, null, function(error, result){
    if(error) {
        console.log(error);
    } else {
        console.log(result);
        res.send(result)
    }
  });
    
}
  //console.log(req.files['fileToUpload'])
// var input = JSON.parse(req.body.mydata);
// var pdf = req.body.data;

// tokenProvider.getToken(function(err, access_token) {
//   oauth2Client.setCredentials({
//   access_token: access_token
// });


// drive.files.insert({
//   resource: {
//     title: 'testPdf',
//     mimeType: 'application/pdf',
   
//     parents: [ { id: "0B0udMUdXiYvEflR2R3dUd3pJYlNpeHBuUXJuekNsUFAwbDlGZUJUSWRqd1BsUmxla05KX2s" } ]
//   },
//   media: {
//     mimeType: 'application/pdf',
//     body: fs.createReadStream(__dirname + '/GSWLaTeX.pdf')
//   },
//   auth: oauth2Client
// }, function(err, response) {
//   if(err){
//     res.send("failed");
//   }
//     doc = new Doc({
//       url: response.webContentLink,
//       createdAt: new Date().getTime(),
//       title: input.title,
//       category: input.category,
//       description: input.description,
//       username: input.username
//     })
//     doc.save(function (err) {
//         if (err) console.log(err)
//              res.send( doc )
//       })
//   res.send( doc )
 
// });



// });


// };



// function callback () {
//   console.log("callback");
// }