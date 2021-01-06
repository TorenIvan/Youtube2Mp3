'use strict';

var express = require('express'); 

var URL = require('url');
const fs = require('fs');
const cors = require('cors');
const ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');
var app = express();  
var PORT = process.env.PORT || 5005; 
 
const path = require('path');

app.use(cors());

app.use(express.static(path.join(__dirname, '../../')));


app.listen(PORT, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on PORT", PORT); 
});



app.get('/', (req, res) => { 
    res.sendFile('../../index.html');
});


app.get('/songs', function (req, res) { 
    var url = req.query.url;

    res.header('Content-Disposition', 'attachment; filename="video.mp3"');
    res.set({ "Content-Type": "audio/mpeg" });

    // Send compressed audio mp3 data
    ffmpeg()
    .input(ytdl(url))
    .audioCodec('libmp3lame')
    .toFormat('mp3')
    .pipe(res, {end:true});
}); 


app.get('/videos', function (req, res) { 
    var url = req.query.url;
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    
    ytdl(url, {format: 'mp4'}).pipe(res);
}); 


  

