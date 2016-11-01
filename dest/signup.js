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

	var _signup = __webpack_require__(3);

	var _signup2 = _interopRequireDefault(_signup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_signup2.default.run();

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
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SignupController = function () {
		function SignupController() {
			_classCallCheck(this, SignupController);
		}

		_createClass(SignupController, [{
			key: 'displayError',
			value: function displayError(messages) {
				$('#errorMessages').html(messages);
			}
		}, {
			key: 'signUp',
			value: function signUp(email, password) {
				var self = this;
				firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
					self.displayError('');

					console.log('SUccess', user);
				}).catch(function (error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					// ...

					self.displayError(errorMessage);
					console.log(error);
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
					self.signUp(email, pass);
				});
			}
		}, {
			key: 'setEventAuthen',
			value: function setEventAuthen() {
				firebase.auth().onAuthStateChanged(function (user) {
					if (user) {
						console.log(user);
						location.href = "index.html";
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

		return SignupController;
	}();

	exports.default = new SignupController();

/***/ }
/******/ ]);