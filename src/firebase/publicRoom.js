import refDB from '../config/firebase-db'

var publicRoom = refDB.child('publicRoom/message'); //.limitToLast(100);
var lastMessage = publicRoom.limitToLast(10);


// publicRoom.on('child_added', function(data) {
// 	console.log(data.val(), data.key)
// });

class MessageRender{

	constructor(props) {
		// dest

		this.container = $(props.container);
		this.user = props.user;
		this.last_user_uid = null;
	}

	htmlMessage(message){
		var classMessage = 'message'; 
		if(this.user.uid == message.user_uid) {
			classMessage += ' my-message';
		}

		var htmlUser = '';
		if(this.user.uid != message.user_uid && this.last_user_uid != message.user_uid ) {
			htmlUser = `<div class="message-user">${message.user}</div>`
		}
		var content = message.content;
		var html = `<div class="${classMessage}">
						${htmlUser}
						<div class="message-content">${content}</div>
					</div><div class="clearfix" />`
		return html;
	}

	add(message){
		var html = this.htmlMessage(message);
		this.last_user_uid = message.user_uid;
		this.container.append(html)

		
	}

	scroll(){
		this.container.animate({ scrollTop: this.container.prop("scrollHeight")}, 200);
	}
}

class Room{


	send(content){
		var self = this;
		var newPostRef = publicRoom.push();
		newPostRef.set({
		    content: content, 
		    user: self.user.displayName,
		    user_uid: self.user.uid,
		})
		
	}

	init(user){
		this.messageRender = new MessageRender({
			container: '#publicMessages', 
			user: user,
		});

		this.user = user;

		var self = this;

		lastMessage.on('child_added', function(data) {
		  	self.messageRender.add(data.val())
		  	self.messageRender.scroll();
		});

		this.setEvent();
	}
}

export default new Room;