function initLoader(){
    var loader = document.getElementById('loader');         
    var uri    = document.getElementById('url');

    document.getElementById('submit').disabled = true;

    uri.style.display    = "none";
    loader.style.display = "";
}


function endLoader(){
    var loader = document.getElementById('loader');         
    var uri    = document.getElementById('url');

    document.getElementById('submit').disabled = false;

    uri.style.display    = "";
    loader.style.display = "none"; 
}

function hideLoader(){
    var loader = document.getElementById('loader');         
    if(loader.className = "hidden") loader.classList.remove('hidden');
}

export {initLoader, endLoader, hideLoader}