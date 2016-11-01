import refDB from '../config/firebase-db'


var onlineList = refDB.child('onlines');


onlineList.on('value', function(users) {
	var data = users.val();

	// GET NUMBER ONLINE
	var num = _.keys(data).length;
	Online.setPublicNum(num);
});


class Online{

	static setPublicNum(num){
		$('#publicNum').html(num);
	}

	init(user){
		var online = this.userOnline = onlineList.child(user.uid);

		online.onDisconnect().set(null);
	    online.set({
	      uid: user.uid,
	      name: user.displayName ? user.displayName : 'No name'
	    });
	}

	logout() {
		// console.log('HIHIHIHI')
		return this.userOnline.set(null);
		// this.userOnline.off();
		// onlineList.off();
	}
}


export default new Online