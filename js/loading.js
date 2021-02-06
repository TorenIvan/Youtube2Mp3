function loading(){
    var loader = document.getElementById('loader');         
    var uri    = document.getElementById('url');

    document.getElementById('submit').disabled = true;

    uri.style.display    = "none";
    loader.style.display = "";
}


function endloading(){
    var loader = document.getElementById('loader');         
    var uri    = document.getElementById('url');

    document.getElementById('submit').disabled = false;

    uri.style.display    = "";
    loader.style.display = "none"; 
}

function hiding(){
    var loader = document.getElementById('loader');         
    if(loader.className = "hidden") loader.classList.remove('hidden');
}

export {loading, endloading, hiding}