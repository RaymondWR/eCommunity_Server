var loginusername = localStorage.getItem("username");
if(loginusername == null){
    window.location.href = "login.html"
}
      var CLIENT_ID = '350174872983-cish69jr242i6fs06gomoj6dmq4bh839.apps.googleusercontent.com';
      var SCOPES = 'https://www.googleapis.com/auth/drive';
      var UploadSuccess = (function() {
    "use strict";

    var elem,
        hideHandler,
        that = {};

    that.init = function(options) {
        elem = $(options.selector);
    };

    that.show = function(text) {
        clearTimeout(hideHandler);

        elem.find("span").html(text);
        elem.delay(200).fadeIn().delay(4000).fadeOut();
    };

    return that;
}());

      function handleClientLoad() {
        window.setTimeout(checkAuth, 1);
      }


      function checkAuth() {
        gapi.auth.authorize(
            {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': true},
            handleAuthResult);
      }


      function handleAuthResult(authResult) {
        //var authButton = document.getElementById('authorizeButton');
        var filePicker = document.getElementById('inputfile');
        //authButton.style.display = 'none';
        filePicker.style.display = 'none';
        if (authResult && !authResult.error) {
          // Access token has been successfully retrieved, requests can be sent to the API.
          filePicker.style.display = 'block';
          //filePicker.onchange = uploadFile;
        } else {
          // No access token could be retrieved, show the button to start the authorization flow.
          // authButton.style.display = 'block';
          // authButton.onclick = function() {
          //     gapi.auth.authorize(
          //         {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false},
          //         handleAuthResult);
          // };
        }
        $( "#logout" ).click(function() {
          localStorage.removeItem("username");
         window.location.href = "login.html"
        });
        var uploadPicker = document.getElementById('upload');

          uploadPicker.onclick = function() {

           var file = $('#inputfile')[0].files[0];

           uploadFile(file);


      };
 }


      function uploadFile(evt) {
        gapi.client.load('drive', 'v2', function() {
          var file = evt;
          insertFile(file);
        });
      }

      function insertFile(fileData, callback) {
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        var reader = new FileReader();
        reader.readAsBinaryString(fileData);
        reader.onload = function(e) {
          var contentType = fileData.type || 'application/octet-stream';
          var metadata = {
            'title': fileData.name,
            'mimeType': contentType,
            'parents':[{"id":"0B9ClAYOKU4TrOUhGUU9LTmRjQ2s"}]
          };

          var base64Data = btoa(reader.result);
          var multipartRequestBody =
              delimiter +
              'Content-Type: application/json\r\n\r\n' +
              JSON.stringify(metadata) +
              delimiter +
              'Content-Type: ' + contentType + '\r\n' +
              'Content-Transfer-Encoding: base64\r\n' +
              '\r\n' +
              base64Data +
              close_delim;

          var request = gapi.client.request({
              'path': '/upload/drive/v2/files',
              'method': 'POST',
              'params': {'uploadType': 'multipart'},
              'headers': {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
              },
              'body': multipartRequestBody});
          if (!callback) {
            callback = function(file) {
            console.log(file);
            var subject = $( "#subselect option:selected" ).text();
            var title = $( "#title" ).val();
            var description = $( "#description" ).val();

              var username = loginusername;
              var url = file.webContentLink;
              var data = { url:url, subject:subject,title:title,description:description,username:username}
              $.post( "/fileupload", data)
                    .done(function( data ) {
                    $('#myModal').modal('show');
                    $( "#subselect option:selected" ).text("");
                    $( "#title" ).val("");
                    $('#inputfile').val("");
                    var description = $( "#description" ).val("");
                    console.log(data);
              });

            };
          }
          request.execute(callback);
        }
      }



$.get( "/totalusers", function( data ) {
  $( "#displayusername" ).text(" Hi "+loginusername);
   $( "#registeredUsers" ).text(data);
});
$.get( "/totalnotes", function( data ) {
   $( "#totalnotes" ).text(data);
});

$.get( "/totalcomments", function( data ) {
   $( "#totalcomments" ).text(data);
});

$.get( "/latestnotes", function( data ) {

  $.each(data.reverse(), function( index, value ) {

    var date = new Date(value.createdAt);
    date = date.toString().replace(/GMT.*/g,"")
    if (index%2 == 0){
       $("#commendlists ul").append('<li><div class="timeline-badge danger"><i class="fa fa-file"></i></div><div class="timeline-panel"><div class="timeline-heading"><h4 class="timeline-title">'+value.title+'</h4><p><small class="text-muted"><i class="fa fa-file"></i> Subject: '+value.category+'</small></p><p><small class="text-muted"><i class="fa fa-clock-o"></i> Created At: '+date+'</small></p></div><div class="timeline-body"><p>'+value.content+'</p></div></div></li>');
     }else{
       $("#commendlists ul").append('<li class="timeline-inverted"><div class="timeline-badge info"><i class="fa fa-file"></i></div><div class="timeline-panel"><div class="timeline-heading"><h4 class="timeline-title">'+value.title+'</h4><p><small class="text-muted"><i class="fa fa-file"></i> Subject: '+value.category+'</small></p><p><small class="text-muted"><i class="fa fa-clock-o"></i> Created At: '+date+'</small></p></div><div class="timeline-body"><p>'+value.content+'</p></div></div></li>');
     }

  });

});



