import {validateYouTubeUrl} from '/js/validator.js';

// Selecting elements from DOM
var submit = document.querySelector('#submit');


// AJAX
submit.addEventListener('click', function(){   
    if(validateYouTubeUrl(document.querySelector('#url').value) === false){
        console.log('ee');
        return false;
    }
    var url = document.querySelector('#url').value;
    var path = "http://127.0.0.1:5005/song?url=" + url;

    // var request = new XMLHttpRequest();
    // request.open("GET", path, true);
    // request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    // // The onreadystatechange property defines a function to be executed when the readyState changes.
    // request.onreadystatechange = function(){
    //     // The readyState property holds the status of the XMLHttpRequest.
    //     if(request.readyState == 4){
    //         // In local files, status is 0 upon success in Mozilla Firefox
    //         if(request.status == 200){
    //             console.log("request");
    //             console.log(request.status);
    //             console.log(request.readyState);  
    //             // console.log("Url: "+ url);
    //             // console.log("Response: "+request.responseText);
    //         }
    //         else{
    //             console.log("not");
    //             console.log(request.status);
    //         }
    //     }   
    // };

    window.open(path,"_blank");


    // request.send();
    

});
