import {validateYouTubeUrl} from '/js/validator.js';

// Selecting elements from DOM
let submit = document.querySelector('#submit');
let mp3Active = document.getElementById('mp3').className;
let mp4Active = document.getElementById('mp4').className;
let url = document.querySelector('#url');
//Path of final youtube url
var path;

// AJAX
submit.addEventListener('click', function(){   
    if(url.value && validateYouTubeUrl(url.value) === false){
        return;
    }

    if(mp3Active =='active' && url.value){
        path = "http://localhost:5005/songs?url=" + url.value;
    }

    if(mp4Active == 'active' && url.value){
        path = "http://localhost:5005/videos?url=" + url.value;
    }

    window.open(path,"_blank");


});
