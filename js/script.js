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

    window.open(path,"_blank");


});
