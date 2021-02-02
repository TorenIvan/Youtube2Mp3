'use strict';

const express = require('express'); 
const cors    = require('cors');
const ytdl    = require('ytdl-core');
const ffmpeg  = require('fluent-ffmpeg');
const helmet  = require("helmet");
const path    = require('path');
const contentDisposition = require('content-disposition')

// Custom requires
const YouTubeParser = require('../youtubeclasses/youtubebasic');


var app = express();
var PORT = process.env.PORT || 5005; 

// Middleware usage
app.use(cors());
app.use(helmet());

app.use(express.static(path.join(__dirname, '../../')));


app.listen(PORT, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on PORT", PORT); 
});



app.get('/', (req, res) => { 
    res.sendFile('../../index.html');
});


app.get('/songs', function (req, res) { 
    let url = req.query.url;
    let video = new YouTubeParser(url);
    
    if(video.YouTubeValidateURL(url) == true){//handler to add if video exists

        video.YouTubeGetInfo()
        .then((message) => {    //.catch to add and length checker
            console.log(message.videoDetails.title);
            console.log(message.videoDetails.lengthSeconds); 

            let title = `${message.videoDetails.title}`.replace(/[^a-zA-Z]/gm," ").replace(/\s*$/,'') + '.mp3';
            
            res.set('Content-Disposition', contentDisposition(title));
            res.header({ "Content-Type": "audio/mpeg" });
        
            // Send compressed audio mp3 data
            ffmpeg()
            .input(ytdl(url))
            .audioCodec('libmp3lame')
            .toFormat('mp3')
            .on('error', function(err,stdout,stderr) {
                console.log('an error happened: ' + err.message);
                console.log('ffmpeg stdout: ' + stdout);
                console.log('ffmpeg stderr: ' + stderr);
            })
            .on('end', function() {
                console.log('Processing finished !');
            })
            .pipe(res, {end:true});
        });
    }
}); 


app.get('/videos', function (req, res) { 
    let url = req.query.url;
    let video = new YouTubeParser(url);
    
    if(video.YouTubeValidateURL(url) == true){//handler to add if video exists

        video.YouTubeGetInfo()
        .then((message) => {    //.catch to add and length checker
            console.log(message.videoDetails.title);
            console.log(message.videoDetails.lengthSeconds); 
            
            // res.header('Content-Disposition', `attachment; filename=${message.videoDetails.title}.mp4`);
            let title = `${message.videoDetails.title}`.replace(/[^a-zA-Z]/gm," ").replace(/\s*$/,'') + '.mp4';
            
            res.set('Content-Disposition', contentDisposition(title));
            res.header({ "Content-Type": "audio/mpeg" });
        
            ytdl(url, {format: 'mp4'}).pipe(res);
            
        });
    }
}); 


  
