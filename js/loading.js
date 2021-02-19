const loader      = document.getElementById('loader');         
const uri         = document.getElementById('url');
const progressBar = document.getElementById('progress-bar');
const submit      = document.getElementById('submit');


function init(){
    submit.disabled = true;

    uri.style.display         = "none";
    progressBar.style.display = "none";
    loader.style.display      = "";
}

function endLoader(){
    submit.disabled = false;

    if(loader.className = "hidden")             loader.classList.remove('hidden');
    progressBar.style.display = "";
    loader.style.display      = "none"; 
    uri.style.display         = "none"; 
}

function endProgress(){
    submit.disabled = false;

    if(progressBar.className  = "hidden")       progressBar.classList.remove('hidden');
    progressBar.style.display = "none"; 
    uri.style.display         = "";
}

function changeProgress(progress){
    if (loader.style.display != "none")         loader.style.display = "none";
    if (progressBar.style.display == "none")    progressBar.style.display = "";
    
    progressBar.style.setProperty('--width', progress); 
    
    //endAll
    if (progress == 100) hideAll();
}

function hideAll(){
    submit.disabled = false;

    uri.style.display         = "";
    progressBar.style.display = "none";
    loader.style.display      = "none";
    
    uri.value                 = "";
}


export {init, endLoader, endProgress, changeProgress}