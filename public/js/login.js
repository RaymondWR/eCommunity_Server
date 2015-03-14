var loginusername = localStorage.getItem("username");
console.log(loginusername)
if(loginusername != null){
    window.location.href = "index.html"
}

var adminlogin = document.getElementById('login');

    adminlogin.onclick = function() {
    var email = $( "#email" ).val();
    var password = $( "#password" ).val();

    $.post( "/users/session", {email:email,password:password})
        .done(function( data ) {
        	if(data == "invalid"){
        			$('#myModal').modal('show');
        	}else{
        		localStorage.setItem("username", data.username);
        		window.location.href = "index.html"
        	}
        	console.log(data);

    });

};