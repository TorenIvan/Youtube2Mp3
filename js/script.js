// Selecting elements from DOM
const submit = document.querySelector('#submit');


//check if youtube link is valid
function validateYouTubeUrl(url) {    
    if (url != undefined || url != '') {  
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            return true;         
        } else {
            return false;
        }
    }
}


// AJAX
submit.addEventListener('click', function(){   
    if(validateYouTubeUrl(document.querySelector('#url').value) == false){
        // console.log('ee');
        return false;
    }
    let request = new XMLHttpRequest();
    console.log("mpike");
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if(request.status >= 200 && request.status < 300){
                // console.log("kati");
            }
        }   
    };

    request.open("POST", "file:///home/jyr/Documents/projects/Youtube2Mp3/index.html", true);
    request.send();
});
