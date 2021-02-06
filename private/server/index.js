'use strict';

const express = require('express'); 
const cors    = require('cors');
const ytdl    = require('ytdl-core');
const ffmpeg  = require('fluent-ffmpeg');
const helmet  = require("helmet");
const path    = require('path');
const contentDisposition = require('content-disposition');
const ffmpegOnProgress = require('ffmpeg-on-progress');

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

const logProgress = (progress, event) => {
    // progress is a floating point number from 0 to 1
    console.log('progress', (progress * 100).toFixed())
  }
const durationEstimate = 4000

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

            let title = `${message.videoDetails.title}`;
            title     =  encodeRFC5987ValueChars(title) + ".mp3"

            res.set('Content-Disposition', contentDisposition(title));
            res.header({ "Content-Type": "audio/mpeg" });
        
            // Send compressed audio mp3 data
            ffmpeg()
            .input(ytdl(url, {quality: 'highestaudio'}))
            .audioCodec('libmp3lame')
            .toFormat('mp3')
            .on('progress', ffmpegOnProgress(logProgress, durationEstimate))
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
            
            let title = `${message.videoDetails.title}`;
            title     =  encodeRFC5987ValueChars(title) + ".mp4"
            
            res.set('Content-Disposition', contentDisposition(title));
            res.header({ "Content-Type": "video/mp4" });

            ytdl(url, {quality: 'highestaudio', format: 'mp4'})
            .pipe(res);
            
        });
    }
}); 


function encodeRFC5987ValueChars (str) {
    return encodeURIComponent(str).
        // Note that although RFC3986 reserves "!", RFC5987 does not,
        // so we do not need to escape it
        replace(/['()]/g, escape). // i.e., %27 %28 %29
        replace(/\*/g, '%2A').
            // The following are not required for percent-encoding per RFC5987, 
            // so we can allow for a little better readability over the wire: |`^
            replace(/%(?:7C|60|5E)/g, unescape);
}


  
