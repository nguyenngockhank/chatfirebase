class SignupController{

	displayError(messages){
	  	$('#errorMessages').html(messages);
	}


	signUp(email, password) {
		var self = this;
	  	firebase.auth().createUserWithEmailAndPassword(email, password)
	  	.then(function(user){
	  		self.displayError('')


	     	 console.log('SUccess', user);
	  	})
	  	.catch(function(error) {
	    	// Handle Errors here.
		    var errorCode = error.code;
		    var errorMessage = error.message;
		    // ...

		    self.displayError(errorMessage)
		    console.log(error);
	  	});
	}


	setEvent(){
		var self = this;
		$('#submit').click(function(){
		    var email = $('#email').val();
		    var pass = $('#password').val();
		    // validate 
		    self.signUp(email, pass);
		})
	}

	setEventAuthen(){
		firebase.auth().onAuthStateChanged(function(user) { 
	  		if (user) {
	  			console.log(user)
	  			location.href = "index.html"
	  		}
	  	})
	}


	run(){
		this.setEventAuthen();
		this.setEvent();
	}	

}

export default new SignupController

