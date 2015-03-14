var loginusername = localStorage.getItem("username");
if(loginusername == null){
    window.location.href = "login.html"
}

$(function() {

    $('#side-menu').metisMenu();

});


$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100;
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
});

var addAdmin = document.getElementById('addAdmin');

addAdmin.onclick = function() {
    var adminemail = $( "#adminemail" ).val();
    var adminusername = $( "#adminusername" ).val();
    var adminfullname = $( "#adminfullname" ).val();
    var adminpassword = $( "#adminpassword" ).val();
    var adminrepassword = $( "#adminrepassword" ).val();
    var user = {
        email : adminemail,
        username : adminusername,
        fullname : adminfullname,
        password : adminpassword
    };

    if(adminpassword != adminrepassword){
        $('#myModalfail').modal('show');

    }else{

    $.post( "/admincreate", user)
      .done(function( data ) {

        if(data == "user exist"){

            $('#myModalexist').modal('show');
        }else{
          $('#myModal').modal('show');
      $( "#adminemail" ).val("");
      $( "#adminusername" ).val("");
     $( "#adminfullname" ).val("");
     $( "#adminpassword" ).val("");
     $( "#adminrepassword" ).val("");
        }

    });
  }

};
