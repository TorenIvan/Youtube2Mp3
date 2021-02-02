import  validateYouTubeUrl  from '/js/validator.js';
import {loading,endloading,hiding} from '/js/loading.js';

// Selecting elements from DOM
let submit = document.querySelector('#submit');
let mp3    = document.querySelector('#mp3');
let mp4    = document.querySelector('#mp4');
let url    = document.querySelector('#url');

//Hide the loading element
hiding();
endloading();

// Event listener
submit.addEventListener('click', function(event){

    var path = "http://localhost:5005/";                                                //path declaration and assign

    if(url){
        //Check Validations
        if (url.checkValidity()) event.preventDefault();
        else return;                                                                    //check html5 validations and the prevent default
                                                                                        
        loading();                                                                      //change the css, to show that it's converting
     
        if(validateYouTubeUrl(url.value) === false) {                                   //check js validations, else popup and return
            endloading();               
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

    //trigger download using fetch, (other ways: 1.window.open(path,"_blank");   2.window.location.href = path;   but needed to keep information)
    fetch(path,{                                                                        //request options
        method: 'GET'
    })
    .then(res => {
        let filename = res.headers.get('Content-Disposition').split('filename=')[1];    //get filename from response header
        let type     = res.headers.get('Content-Disposition').split('.')[1];            //get option from response header
        console.log(filename);
        res.blob()                                                                      //return a blob
        .then(blob => {
            console.log('mpika');
            let link      = document.createElement("a");
            link.href     = window.URL.createObjectURL(blob);
            link.download = filename || "video." + type;
            link.click();
            window.URL.revokeObjectURL(link.href);
            link.remove();
            endloading();
        })
        .catch(res => console.log(res))
    })
    .catch(res => console.log(res))
});