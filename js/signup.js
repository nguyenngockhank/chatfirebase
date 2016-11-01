// Initialize Firebase
var config = {
  apiKey: "AIzaSyD35tOVqrZqmUl9jSleREBxZiKs6B-i-RU",
  authDomain: "chat-73df9.firebaseapp.com",
  databaseURL: "https://chat-73df9.firebaseio.com",
  storageBucket: "chat-73df9.appspot.com",
  messagingSenderId: "565901499572"
};
var mainApp = firebase.initializeApp(config);

function displayError(messages){
  $('#errorMessages').html(messages);
}


function signUp(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(user){
      console.log('SUccess', user);
      $('#errorMessages').html('');
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
      signUp(email, pass);
  })
}





firebase.auth().onAuthStateChanged(function(user) { 
  if (user) {
    console.log('LOGIN HERE' ,user)
  } else {
      console.log('here')
    // $('#user-info').hide();
    // chat._chat.enterRoom('-Iy1N3xs4kN8iALHV0QA')
  }
});





(function(){
  onAppRun();
})()


// mainApp.database().ref("messages").set("hi");
// mainApp.database().ref("messages").set("hihi");


// var email = 'teo@gmail.com';
// var password = '123456';

//