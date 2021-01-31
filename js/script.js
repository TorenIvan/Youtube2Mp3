import {validateYouTubeUrl} from '/js/validator.js';
import loading              from '/js/loading.js';


// Selecting elements from DOM
let submit = document.querySelector('#submit');
let mp3    = document.querySelector('#mp3');
let mp4    = document.querySelector('#mp4');
let url    = document.querySelector('#url');
let loader = document.querySelector('#loader');


//Path of final youtube url, globally; why not though?
var path;

//Hide the loading element
loader.style.display = 'none';

// Event listener
submit.addEventListener('click', function(event){

    event.preventDefault();

    loading();

    if(url){   
        if(validateYouTubeUrl(url.value) === false){
            return;
        }
    }

    if(mp3.classList.contains("active")){
        path = "http://localhost:5005/songs?url=" + url.value;
    }

    if(mp4.classList.contains("active")){
        path = "http://localhost:5005/videos?url=" + url.value;
    }

    //trigger download using fetch, (other ways: 1.window.open(path,"_blank");   2.window.location.href = path;   but needed to keep information)
    fetch(path,{
        method: 'GET'
    })
    .then(res => {
        let filename = res.headers.get('Content-Disposition').split('filename=')[1];
        let type     = res.headers.get('Content-Disposition').split('.')[1];
        res.blob().then(blob => {
            let link      = document.createElement("a");
            link.href     = window.URL.createObjectURL(blob);
            link.download = filename || "video." + type;
            link.click();
            window.URL.revokeObjectURL(link.href);
        })
    })
});