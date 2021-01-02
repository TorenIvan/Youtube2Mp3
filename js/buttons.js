//Button Variables   -   DOM
let btnMp3 = document.getElementById('mp3');
let btnMp4 = document.getElementById('mp4');


//Event Listeners
if(btnMp3 && btnMp4){

    //Remember previous onClick Class
    let previousClass = 'mp3';

    btnMp3.addEventListener('click', () => {
        btnMp3.className = 'active';
        btnMp4.className = 'inactive';
        previousClass = 'mp3';
    });

    btnMp3.addEventListener('mouseover', () => {
        btnMp3.className = 'active';
        btnMp4.className = 'inactive';
    });

    btnMp3.addEventListener('mouseout', () => {
        if(previousClass == 'mp4'){
            btnMp4.className = 'active';
            btnMp3.className = 'inactive';
        }
    });

    btnMp4.addEventListener('click', () => {
        btnMp4.className = 'active';
        btnMp3.className = 'inactive';
        previousClass = 'mp4';
    });

    btnMp4.addEventListener('mouseover', () => {
        btnMp4.className = 'active';
        btnMp3.className = 'inactive';
    });

    btnMp4.addEventListener('mouseout', () => {
        if(previousClass == 'mp3'){
            btnMp3.className = 'active';
            btnMp4.className = 'inactive';
        }
    });
}
