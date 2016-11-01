
class NavbarController {

	logOut() {
		var self = this;
		self.onlineRef.logout().then(function(){
			return firebase.auth().signOut()

		}) .then(function() {  
			console.log('LOG OUT SUCCESS')
	    }, function(error) {
	      // An error happened.
	    });
	}

	setNav(user){
		if(user.displayName) {
			$('#navName').html(user.displayName);
		}

		if(user.photoURL) {
			$('#navAvatar img').attr('src', user.photoURL);
		}
	}

	setEvent(){
		var self = this;
		$('#navLogout').click(function(){
			self.logOut();
		})
	}


	run(OnlineRef){
		this.onlineRef = OnlineRef;
		this.setEvent();
	}	
}


export default new NavbarController