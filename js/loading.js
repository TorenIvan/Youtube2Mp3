function init(){
    var loader   = document.getElementById('loader');         
    var uri      = document.getElementById('url');
    var progress = document.getElementById('progress-bar');

    document.getElementById('submit').disabled = true;

    uri.style.display      = "none";
    progress.style.display = "none";
    loader.style.display   = "";
}


function endLoader(){
    var loader   = document.getElementById('loader');         
    var uri      = document.getElementById('url');
    var progress = document.getElementById('progress-bar');

    document.getElementById('submit').disabled = false;

    progress.style.display    = "";
    loader.style.display      = "none"; 
    uri.style.display          = "none"; 
}

function hideLoader(){
    var loader = document.getElementById('loader');         
    if(loader.className = "hidden") loader.classList.remove('hidden');
}

function endProgress(){
    var progress = document.getElementById('progress-bar');         
    var uri      = document.getElementById('url');

    document.getElementById('submit').disabled = false;

    progress.style.display = "none"; 
    uri.style.display      = "";
}

function hideProgress(){
    var progress = document.getElementById('progress-bar');          
    if(progress.className = "hidden") progress.classList.remove('hidden');
}

function changeProgress(progress){
    var progressBar   = document.getElementById('progress-bar');
    var loader = document.getElementById('loader'); 

    if (loader.style.display != "none") loader.style.display = "none";
    if (progressBar.style.display == "none") progressBar.style.display = "";
    
    progressBar.style.setProperty('--width', progress); 
    console.log(progress);
    
    //end
    if (progress == 100) hideAll();
}

function hideAll(){
    var loader   = document.getElementById('loader');         
    var uri      = document.getElementById('url');
    var progress = document.getElementById('progress-bar');

    document.getElementById('submit').disabled = false;
    console.log('mpika');

    uri.style.display      = "";
    progress.style.display = "none";
    loader.style.display   = "none";
}

export {init, endLoader, hideLoader, endProgress, hideProgress, changeProgress}