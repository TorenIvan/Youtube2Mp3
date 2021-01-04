import {validateYouTubeUrl} from '/js/validator.js';

// Selecting elements from DOM
var submit = document.querySelector('#submit');


// AJAX
submit.addEventListener('click', function(){   
    if(validateYouTubeUrl(document.querySelector('#url').value) === false){
        return false;
    }
    var url = document.querySelector('#url').value;
    var path = "http://localhost:5005/songs?url=" + url;

    window.open(path,"_blank");


});
