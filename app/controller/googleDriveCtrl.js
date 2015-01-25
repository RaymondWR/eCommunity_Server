var google = require('googleapis');
var drive = google.drive('v2');
var OAuth2Client = google.auth.OAuth2;
var fs = require('fs');
var GoogleTokenProvider = require("refresh-token").GoogleTokenProvider;
var REFRESH_TOKEN = "1/1X2PEH7Z0ogRs5Wdizdwc8Gi4q2cwKPP6lHr6_SgmrQMEudVrK5jSpoR30zcRFq6";
var CLIENT_ID = '350174872983-6910r0hd881d3qt6qs5g1have17s2i0c.apps.googleusercontent.com',
    CLIENT_SECRET = '4xdT-aJZecZq1F-ZANA2se_D',
    REDIRECT_URL = 'https://developers.google.com/oauthplayground',
    SCOPE = 'https://www.googleapis.com/auth/drive.file';
var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
var tokenProvider = new GoogleTokenProvider({
  'refresh_token': REFRESH_TOKEN,
  'client_id' : CLIENT_ID,
  'client_secret': CLIENT_SECRET
});
exports.upload = function( req, res ) {



tokenProvider.getToken(function(err, access_token) {
  oauth2Client.setCredentials({
  access_token: access_token
});


drive.files.insert({
  resource: {
    title: 'testPdf',
    mimeType: 'application/pdf',
    //mimeType: 'image/png',
    //mimeType: 'text/plain',
    parents: [ { id: "0B9ClAYOKU4TrOUhGUU9LTmRjQ2s" } ]
  },
  media: {
    mimeType: 'application/pdf',
    //mimeType: 'image/png',
    //mimeType: 'text/plain',
    //body: 'Hello World'
    body: fs.createReadStream(__dirname + '/GSWLaTeX.pdf')
  },
  auth: oauth2Client
}, function(err, response) {
  console.log('error:', err, 'inserted:', response.id);
});
});

};



function callback () {
  console.log("callback");
}