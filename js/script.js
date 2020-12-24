import {validateYouTubeUrl as validate} from 'validator.js';

// Selecting elements from DOM
const converter = document.querySelector('#converter');
const url       = document.querySelector('#url');
const submit    = document.querySelector('#submit');

//check if youtube link is valid
if(validate(url) === false){
    alert(
        'Enter a valid YouTube url. ' +
        `${url} is not valid.`
    );
    return false;
}

// Manipulating style
converter.style.color = '#0a4137';

// Variables initilization
const path    = "file:///home/jyr/Documents/projects/Youtube2Mp3/index.html";
const method  = "POST";

// AJAX
submit.addEventListener('click', function(){   
    const request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if(request.status >= 200 && request.status < 300){
                onLoadedFunc.call(null, request.responseText);
            }
        }   
    };

    request.open(method, path, true);
    request.send();
});
