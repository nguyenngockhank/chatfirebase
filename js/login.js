// Initialize Firebase
var config = {
  apiKey: "AIzaSyD35tOVqrZqmUl9jSleREBxZiKs6B-i-RU",
  authDomain: "chat-73df9.firebaseapp.com",
  databaseURL: "https://chat-73df9.firebaseio.com",
  storageBucket: "chat-73df9.appspot.com",
  messagingSenderId: "565901499572"
};
var mainApp = firebase.initializeApp(config);


function signIn(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(user){
      console.log('SUccess', user);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...

    displayError(errorMessage)
    console.log(error);
  });
}


function onAppRun(){
  $('#submit').click(function(){
    var email = $('#email').val();
    var pass = $('#password').val();
      // console.log('submit')
      signIn(email, pass);
  })
}

function logOut(){
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
}

firebase.auth().onAuthStateChanged(function(user) { 
  if (user) {
    console.log('LOGIN HERE' ,user)

    var refChat = firebase.database().ref('/chat');
    var onlineList = refChat.child('onlines');
    var online = onlineList.child(user.uid);

    online.onDisconnect().set(null);
    online.set({
      uid: user.uid,
      name: user.displayName ? user.displayName : 'No name'
    });

    onlineList.on('value', function(users) {
      console.log(users.val());
    });

    // console.log(refChat)

  } else {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).catch(function(error) {
      console.log("Error authenticating user:", error);
    });
  }
});



(function(){
  onAppRun();
})()
