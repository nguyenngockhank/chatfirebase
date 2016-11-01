import navbarController from './common/nav'

import onlineDB from '../firebase/online'


import publicRoom from '../firebase/publicRoom'


class Waitingontroller{

	setEvent(){

		var submit = function(){
			var content = $('#inputMessageContent').val();
			if(content == '') {
				return;
			}
			publicRoom.send(content);
			$('#inputMessageContent').val('')
		}

		
		$('#btnSendMessage').click(function(){
			submit();
		})

		$('#inputMessageContent').keypress(function (e) {
		  	if (e.which != 13) {
		   		return;
		  	}
		  	submit();
		});

		$("#emotionsList").emotions({handle: null, style: null});

		/////// SET EMOTION
		$('#btnPopupEmotion').popover({
	        html : true, 
	        content: function() {
	          return $("#emotionsList").html();
	        },
	        placement: 'top',
	        title: 'Icon List'
	    });
	}

	setEventAuthen(){
		var self = this;
		firebase.auth().onAuthStateChanged(function(user) { 
	  		if (user) {
	  			// console.log(user)
	  			navbarController.setNav(user);
	  			onlineDB.init(user);
	  			publicRoom.init(user);

	  		} else {
	  			setTimeout(function(){
	  				location.href = "index.html"	
	  			}, 200)
	  			
	  		}
	  	})
	}


	run(){
		navbarController.run(onlineDB);
		this.setEventAuthen();
		this.setEvent();
	}	

}

export default new Waitingontroller

