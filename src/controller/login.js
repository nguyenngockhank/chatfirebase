class LoginController{

	displayError(messages){
	  	$('#errorMessages').html(messages);
	}


	loginBasic(email, password) {
		var self = this;
	  	firebase.auth().signInWithEmailAndPassword(email, password)
	  	.then(function(user){
	  		self.displayError('')
	     	 console.log('SUccess', user);
	  	})
	  	.catch(function(error) {
		    // var errorCode = error.code;
		    var errorMessage = error.message;
		    self.displayError(errorMessage)
		    console.log(error);
	  	});
	}

	popupLogin(providerName){
		switch(providerName) {
			case 'google':
				var provider = new firebase.auth.GoogleAuthProvider();
				break;
			case 'facebook':
				var provider = new firebase.auth.FacebookAuthProvider();
				break;
			default:
				return;
		}
			 
	    firebase.auth().signInWithPopup(provider).catch(function(error) {
	      	console.log("Error authenticating user:", error);
	    });
	}


	setEvent(){
		var self = this;
		$('#submit').click(function(){
		    var email = $('#email').val();
		    var pass = $('#password').val();
		    // validate 
		    self.loginBasic(email, pass);
		})

		// popup
		$('#loginGoogle').click(function(){
			self.popupLogin('google');
		})

		$('#loginFacebook').click(function(){
			self.popupLogin('facebook');
		})

	}

	setEventAuthen(){
		firebase.auth().onAuthStateChanged(function(user) { 
	  		if (user) {
	  			console.log('Current ' , user)
	  			location.href = "waiting-room.html"
	  		}
	  	})
	}


	run(){
		this.setEventAuthen();
		this.setEvent();
	}	

}

export default new LoginController

