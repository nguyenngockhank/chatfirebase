/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _firebase = __webpack_require__(1);

	var _firebase2 = _interopRequireDefault(_firebase);

	var _waiting = __webpack_require__(4);

	var _waiting2 = _interopRequireDefault(_waiting);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_waiting2.default.run();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  apiKey: "AIzaSyD35tOVqrZqmUl9jSleREBxZiKs6B-i-RU",
	  authDomain: "chat-73df9.firebaseapp.com",
	  databaseURL: "https://chat-73df9.firebaseio.com",
	  storageBucket: "chat-73df9.appspot.com",
	  messagingSenderId: "565901499572"
	};
	var mainApp = firebase.initializeApp(config);

	exports.default = mainApp;

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _nav = __webpack_require__(5);

	var _nav2 = _interopRequireDefault(_nav);

	var _online = __webpack_require__(6);

	var _online2 = _interopRequireDefault(_online);

	var _publicRoom = __webpack_require__(8);

	var _publicRoom2 = _interopRequireDefault(_publicRoom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Waitingontroller = function () {
		function Waitingontroller() {
			_classCallCheck(this, Waitingontroller);
		}

		_createClass(Waitingontroller, [{
			key: 'setEvent',
			value: function setEvent() {

				var submit = function submit() {
					var content = $('#inputMessageContent').val();
					if (content == '') {
						return;
					}
					_publicRoom2.default.send(content);
					$('#inputMessageContent').val('');
				};

				$('#btnSendMessage').click(function () {
					submit();
				});

				$('#inputMessageContent').keypress(function (e) {
					if (e.which != 13) {
						return;
					}
					submit();
				});
			}
		}, {
			key: 'setEventAuthen',
			value: function setEventAuthen() {
				var self = this;
				firebase.auth().onAuthStateChanged(function (user) {
					if (user) {
						// console.log(user)
						_nav2.default.setNav(user);
						_online2.default.init(user);
						_publicRoom2.default.init(user);
					} else {
						setTimeout(function () {
							location.href = "index.html";
						}, 200);
					}
				});
			}
		}, {
			key: 'run',
			value: function run() {
				_nav2.default.run(_online2.default);
				this.setEventAuthen();
				this.setEvent();
			}
		}]);

		return Waitingontroller;
	}();

	exports.default = new Waitingontroller();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NavbarController = function () {
		function NavbarController() {
			_classCallCheck(this, NavbarController);
		}

		_createClass(NavbarController, [{
			key: 'logOut',
			value: function logOut() {
				var self = this;
				self.onlineRef.logout().then(function () {
					return firebase.auth().signOut();
				}).then(function () {
					console.log('LOG OUT SUCCESS');
				}, function (error) {
					// An error happened.
				});
			}
		}, {
			key: 'setNav',
			value: function setNav(user) {
				if (user.displayName) {
					$('#navName').html(user.displayName);
				}

				if (user.photoURL) {
					$('#navAvatar img').attr('src', user.photoURL);
				}
			}
		}, {
			key: 'setEvent',
			value: function setEvent() {
				var self = this;
				$('#navLogout').click(function () {
					self.logOut();
				});
			}
		}, {
			key: 'run',
			value: function run(OnlineRef) {
				this.onlineRef = OnlineRef;
				this.setEvent();
			}
		}]);

		return NavbarController;
	}();

	exports.default = new NavbarController();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _firebaseDb = __webpack_require__(7);

	var _firebaseDb2 = _interopRequireDefault(_firebaseDb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var onlineList = _firebaseDb2.default.child('onlines');

	onlineList.on('value', function (users) {
		var data = users.val();

		// GET NUMBER ONLINE
		var num = _.keys(data).length;
		Online.setPublicNum(num);
	});

	var Online = function () {
		function Online() {
			_classCallCheck(this, Online);
		}

		_createClass(Online, [{
			key: 'init',
			value: function init(user) {
				var online = this.userOnline = onlineList.child(user.uid);

				online.onDisconnect().set(null);
				online.set({
					uid: user.uid,
					name: user.displayName ? user.displayName : 'No name'
				});
			}
		}, {
			key: 'logout',
			value: function logout() {
				// console.log('HIHIHIHI')
				return this.userOnline.set(null);
				// this.userOnline.off();
				// onlineList.off();
			}
		}], [{
			key: 'setPublicNum',
			value: function setPublicNum(num) {
				$('#publicNum').html(num);
			}
		}]);

		return Online;
	}();

	exports.default = new Online();

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var refChat = firebase.database().ref('/chat');

	exports.default = refChat;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _firebaseDb = __webpack_require__(7);

	var _firebaseDb2 = _interopRequireDefault(_firebaseDb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var publicRoom = _firebaseDb2.default.child('publicRoom/message'); //.limitToLast(100);
	var lastMessage = publicRoom.limitToLast(10);

	// publicRoom.on('child_added', function(data) {
	// 	console.log(data.val(), data.key)
	// });

	var MessageRender = function () {
		function MessageRender(props) {
			_classCallCheck(this, MessageRender);

			// dest

			this.container = $(props.container);
			this.user = props.user;
			this.last_user_uid = null;
		}

		_createClass(MessageRender, [{
			key: 'htmlMessage',
			value: function htmlMessage(message) {
				var classMessage = 'message';
				if (this.user.uid == message.user_uid) {
					classMessage += ' my-message';
				}

				var htmlUser = '';
				if (this.user.uid != message.user_uid && this.last_user_uid != message.user_uid) {
					htmlUser = '<div class="message-user">' + message.user + '</div>';
				}
				var content = message.content;
				var html = '<div class="' + classMessage + '">\n\t\t\t\t\t\t' + htmlUser + '\n\t\t\t\t\t\t<div class="message-content">' + content + '</div>\n\t\t\t\t\t</div><div class="clearfix" />';
				return html;
			}
		}, {
			key: 'add',
			value: function add(message) {
				var html = this.htmlMessage(message);
				this.last_user_uid = message.user_uid;
				this.container.append(html);
			}
		}, {
			key: 'scroll',
			value: function scroll() {
				this.container.animate({ scrollTop: this.container.prop("scrollHeight") }, 200);
			}
		}]);

		return MessageRender;
	}();

	var Room = function () {
		function Room() {
			_classCallCheck(this, Room);
		}

		_createClass(Room, [{
			key: 'send',
			value: function send(content) {
				var self = this;
				var newPostRef = publicRoom.push();
				newPostRef.set({
					content: content,
					user: self.user.displayName,
					user_uid: self.user.uid
				});
			}
		}, {
			key: 'init',
			value: function init(user) {
				this.messageRender = new MessageRender({
					container: '#publicMessages',
					user: user
				});

				this.user = user;

				var self = this;

				lastMessage.on('child_added', function (data) {
					self.messageRender.add(data.val());
					self.messageRender.scroll();
				});

				this.setEvent();
			}
		}]);

		return Room;
	}();

	exports.default = new Room();

/***/ }
/******/ ]);