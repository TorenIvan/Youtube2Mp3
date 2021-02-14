import {validateYouTubeUrl} from '/js/validator.js';

// Selecting elements from DOM
let submit = document.querySelector('#submit');
let mp3    = document.querySelector('#mp3');
let mp4    = document.querySelector('#mp4');
let url    = document.querySelector('#url');


//Path of final youtube url, globally; why not though?
var path = 'http://localhost:5005/';


// Event listener
submit.addEventListener('click', function(event){

    event.preventDefault();

    if(url){   
        if(validateYouTubeUrl(url.value) === false){
            return;
        }
    }

    if(mp3.classList.contains("active")){
        path += '/songs?url=' + url.value;
    }

    if(mp4.classList.contains("active")){
        path += '/videos?url=' + url.value;
    }

    // window.open(path,"_blank");
    window.location.href = path;

});
