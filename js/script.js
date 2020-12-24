import {validateYouTubeUrl} from '/js/validator.js';

// Selecting elements from DOM
var submit = document.querySelector('#submit');


// AJAX
submit.addEventListener('click', function(){   
    if(validateYouTubeUrl(document.querySelector('#url').value) == false){
        console.log('ee');
        return false;
    }
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if(request.status >= 200 && request.status < 300){
                console.log("100");
                //Get Response Here
            }
            else{
                console.log("not");
            }
        }   
    };

    request.open("GET", "http://127.0.0.1:5500/index.html", true);
    request.send();
});
