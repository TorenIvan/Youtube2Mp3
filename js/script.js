// import io from 'socket.io-client';
// import { endProgress } from './loading';
import * as helper from '/js/loading.js';
import  validateYouTubeUrl  from '/js/validator.js';

// Selecting elements from DOM
let submit = document.querySelector('#submit');
let mp3    = document.querySelector('#mp3');
let mp4    = document.querySelector('#mp4');
let url    = document.querySelector('#url');

// Declare socket -> connect
let socket = io();
console.log('connected');

//Hide the loading element
helper.hideProgress();
helper.endProgress();

// Event listener
submit.addEventListener('click', function(event){

    helper.hideProgress();
    helper.endProgress();

    var path = "http://localhost:5005/";                                                //path declaration and assign

    if(url){
        //Check Validations
        if (!url.checkValidity()) return;
        event.preventDefault();                                                     //check html5 validations and the prevent default
                                                                                        
        helper.init();                                                                   //change the css, to show that it's converting
     
        if(validateYouTubeUrl(url.value) === false) {                                   //check js validations, else popup and return
            // endLoader();  
            endProgress();             
            window.alert('eeerrprr')                  
            return;         
        }                    
    }

    //check what option is active; and concatenate right path for the request
    if(mp3.classList.contains("active")){                       
        path += "songs?url=" + url.value;
    }

    if(mp4.classList.contains("active")){
        path += "videos?url=" + url.value;
    }

    //initializing progress
    console.log('initializing');
   

    //xhr to send the request, get the response, trigger download
    let xhr = new XMLHttpRequest();                                                     //create a new xhr object

    //listener, when the request completes successfully, alternatively onreadystatechange
    xhr.onload = () => {
        // 4: request finished and response is ready,   200: "OK"
        if (xhr.readyState === 4 && xhr.status === 200) { 
            //get infos from response header
            let filename    = decodeURIComponent(xhr.getResponseHeader('Content-Disposition').split("filename=")[1]).split(";")[0]; 
            let filetype    = xhr.getResponseHeader('Content-Disposition').split('.')[1];        
            let contenttype = xhr.getResponseHeader('Content-Type');

            let blob = new Blob([xhr.response], {type: contenttype});

            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                window.navigator.msSaveBlob(blob, filename);
            } else {
                let URL = window.URL || window.webkitURL;
                let downloadUrl = URL.createObjectURL(blob);
                // use HTML5 a[download] attribute to specify filename
                let a = document.createElement("a");
                // safari doesn't support this yet
                if (typeof a.download === 'undefined') {
                    window.location = downloadUrl;
                } else {
                    a.href = downloadUrl;
                    a.download = filename || "video." + filetype;
                    document.body.appendChild(a);
                    a.click();
                }
                // helper.endLoader();
                helper.endProgress();
                setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
                url.value = '';
            }
        }
    }

    xhr.open('GET', path);                                                          //prepares the http request to be sent
    xhr.responseType = 'arraybuffer';                                               //fixed-length raw binary data buffer
    xhr.send();                                                                     //sent the request

    //get the download progress via socket
    socket.on('message', (msg) => {
        helper.changeProgress(parseFloat(msg));
    });
    
    //To do's:
        // 1) modal popup based on error + try catch
        // 2) show loading process (client side)
    });