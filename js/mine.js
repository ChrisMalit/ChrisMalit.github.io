function adduser(){
    alert("adding user!");
    var email=document.getElementById("userEmail").value
    var password = document.getElementById("userPw").value
    firebase.auth().createUserWithEmailAndPassword(email,
        password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("error"+ error.message);
    });
}

var logged = 0
function signIn(){
    var email=document.getElementById("userEmail").value
    var password = document.getElementById("userPw").value
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        alert("Error signing in");
        var errorCode = error.code;
        var errorMessage = error.message;
    });
    logged = 1
}

function signOut(){
    firebase.auth().signOut().then(function() {
        alert("Signed out!");
    }).catch(function(error) {
    });
    logged = 0
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.toJSON());
    } else {
    }
});

//get references to th 3 html elments on the page
var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("fileButton");
var holder = document.getElementById("holder");
//get a ref to Firebase Storage
var storage = firebase.storage();
function getImageForPath(p){
    var storageRef = firebase.storage().ref();
    var spaceRef = storageRef.child(p);
    storageRef.child(p).getDownloadURL().then(function(url) {
        var fullurl = url;
        holder.src = fullurl;
    }).catch(function(error) {
    });
}
getImageForPath('images/1.jpg');

fileButton.addEventListener('change', function(e){
    alert("Uploading file...");
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('images/'+file.name);
    var task = storageRef.put(file);
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            uploader.value = percentage;
        },
        function error(err){
            cosole.log(err);
        },
        function complete(){
            alert("File succesfully uploaded");
        }
    );
});

$('html, body').animate({ scrollTop: $(document).height() - $(window).height() }, 1000, function() {
    $(this).animate({ scrollTop: 0 }, 1000);
});