$(document).ready(function(){

    var firebaseConfig = {
        apiKey: "AIzaSyB5ZY45YF5RzZ-eP_GgA-Eswyule7frVFg",
        authDomain: "fitifitapp.firebaseapp.com",
        databaseURL: "https://fitifitapp-default-rtdb.firebaseio.com",
        projectId: "fitifitapp",
        storageBucket: "fitifitapp.appspot.com",
        messagingSenderId: "443712603898",
        appId: "1:443712603898:web:b5f92196349bc4a0002b43",
        measurementId: "G-5CKQ6K87C4"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();


    $("#loginBtn").click(function(){

        var email = $("#email").val();
        var password = $("#password").val();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(){
                window.location.href = "index.html";
            }).catch(function(error){
                alert(error.message);
        })


    })

})