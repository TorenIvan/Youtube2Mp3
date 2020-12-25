import {validateYouTubeUrl} from '/js/validator.js';

// Selecting elements from DOM
var submit = document.querySelector('#submit');


// AJAX
submit.addEventListener('click', function(){   
    if(validateYouTubeUrl(document.querySelector('#url').value) === false){
        console.log('ee');
        return false;
    }
    var request = new XMLHttpRequest();

    // The onreadystatechange property defines a function to be executed when the readyState changes.
    request.onreadystatechange = function(){
        // The readyState property holds the status of the XMLHttpRequest.
        // 0   UNSENT               open() has not been called yet.
        // 1   OPENED               send() has been called.
        // 2   HEADERS_RECEIVED     send() has been called, and headers and status are available.
        // 3   LOADING              Downloading; responseText holds partial data.
        // 4   DONE                 The operation is complete.
        if(request.readyState == 4){
            console.log("perase to 4");
            console.log("request.status: " + request.status);
            // In local files, status is 0 upon success in Mozilla Firefox
            if(request.status === 0 || (request.status >= 200 && request.status < 300)){
                console.log("100");
                //Get Response Here
            }
            else{
                console.log("not");
            }
        }   
    };

    request.open("POST", "http://127.0.0.1:5500/index.html", true);
    request.send();

});
