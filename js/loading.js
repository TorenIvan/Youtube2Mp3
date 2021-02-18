function init(){
    var loader   = document.getElementById('loader');         
    var uri      = document.getElementById('url');
    var progress = document.getElementById('progress-bar');

    document.getElementById('submit').disabled = true;

    uri.style.display      = "none";
    // loader.style.display   = "";
    progress.style.display = "";
}


function endLoader(){
    var loader   = document.getElementById('loader');         
    var uri      = document.getElementById('url');

    document.getElementById('submit').disabled = false;

    uri.style.display    = "";
    loader.style.display = "none"; 
}

function hideLoader(){
    var loader = document.getElementById('loader');         
    if(loader.className = "hidden") loader.classList.remove('hidden');
}

function endProgress(){
    var progress = document.getElementById('progress-bar');         
    var uri      = document.getElementById('url');

    document.getElementById('submit').disabled = false;

    uri.style.display      = "";
    progress.style.display = "none"; 
}

function hideProgress(){
    var progress = document.getElementById('progress-bar');          
    if(progress.className = "hidden") progress.classList.remove('hidden');
}

function changeProgress(progress){
    var progressBar   = document.getElementById('progress-bar');
    progressBar.style.setProperty('--width', progress); 
    console.log(progress);
}

export {init, endLoader, hideLoader, endProgress, hideProgress, changeProgress}