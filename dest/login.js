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

	var _login = __webpack_require__(2);

	var _login2 = _interopRequireDefault(_login);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_login2.default.run();

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
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginController = function () {
		function LoginController() {
			_classCallCheck(this, LoginController);
		}

		_createClass(LoginController, [{
			key: 'displayError',
			value: function displayError(messages) {
				$('#errorMessages').html(messages);
			}
		}, {
			key: 'loginBasic',
			value: function loginBasic(email, password) {
				var self = this;
				firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
					self.displayError('');
					console.log('SUccess', user);
				}).catch(function (error) {
					// var errorCode = error.code;
					var errorMessage = error.message;
					self.displayError(errorMessage);
					console.log(error);
				});
			}
		}, {
			key: 'popupLogin',
			value: function popupLogin(providerName) {
				switch (providerName) {
					case 'google':
						var provider = new firebase.auth.GoogleAuthProvider();
						break;
					case 'facebook':
						var provider = new firebase.auth.FacebookAuthProvider();
						break;
					default:
						return;
				}

				firebase.auth().signInWithPopup(provider).catch(function (error) {
					console.log("Error authenticating user:", error);
				});
			}
		}, {
			key: 'setEvent',
			value: function setEvent() {
				var self = this;
				$('#submit').click(function () {
					var email = $('#email').val();
					var pass = $('#password').val();
					// validate 
					self.loginBasic(email, pass);
				});

				// popup
				$('#loginGoogle').click(function () {
					self.popupLogin('google');
				});

				$('#loginFacebook').click(function () {
					self.popupLogin('facebook');
				});
			}
		}, {
			key: 'setEventAuthen',
			value: function setEventAuthen() {
				firebase.auth().onAuthStateChanged(function (user) {
					if (user) {
						console.log('Current ', user);
						location.href = "waiting-room.html";
					}
				});
			}
		}, {
			key: 'run',
			value: function run() {
				this.setEventAuthen();
				this.setEvent();
			}
		}]);

		return LoginController;
	}();

	exports.default = new LoginController();

/***/ }
/******/ ]);