//"strict mode" -> ECMAScript and above
'use strict';

//require modules
const express            = require('express'); 
const http               = require('http');
const Socket             = require('socket.io');
const cors               = require('cors');
const ytdl               = require('ytdl-core');
const ffmpeg             = require('fluent-ffmpeg');
const contentDisposition = require('content-disposition');
const helmet             = require("helmet");
const path               = require('path');
const readline = require('readline');
//custom requires
const YouTubeParser      = require('../youtubeclasses/youtubebasic');

//create express app -> server(from app) -> socket(attached to server) -> port(from-environment or 5005)
const app     = express();
const server  = http.createServer(app); 
const io      = Socket(server);
const PORT    = process.env.PORT || 5005; 

//server listen to port
server.listen(PORT, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on PORT", PORT); 
});

//connect to socket
io.on('connection', (socket) => {
    console.log('a user connected');
});

//path to serve static files
app.use(express.static(path.join(__dirname, '../../')));

//request to homepage
app.get('/', (req, res) => { 
    res.sendFile('../../index.html');
});

//middleware usage
app.use(cors());            //to enable all CORS(Cross-Origin Resource Sharing) requests
app.use(helmet());          //to secure the Express app by setting various HTTP headers


//Main Usage
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
            .input(
                ytdl(url, {quality: 'highest'})
                .on('response', function(res) {
                    var totalSize = res.headers['content-length'];
                    var dataRead = 0;
                    res.on('data', function(data) {
                      dataRead += data.length;
                      var percent = dataRead / totalSize;
                      process.stdout.cursorTo(0);
                      process.stdout.clearLine(1);
                      var message = (percent * 100).toFixed(2) + '% ';
                      process.stdout.write(message);
                      io.emit('message', message);
                    })
                    res.on('end', function() {
                      process.stdout.write('\n');
                    })
                })
            )
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
            
            let title = `${message.videoDetails.title}`;
            title     =  encodeRFC5987ValueChars(title) + ".mp4"
            
            res.set('Content-Disposition', contentDisposition(title));
            res.header({ "Content-Type": "video/mp4" });
            console.log('edwsa');
            ytdl(url, {quality: 'highest'})
            .on('response', function(res) {
                var totalSize = res.headers['content-length'];
                console.log('mpikkakskaa');
                var dataRead = 0;
                res.on('data', function(data) {
                    dataRead += data.length;
                    var percent = dataRead / totalSize;
                   // console.log('totalSize ' + totalSize);
                   // console.log('dataRead ' + dataRead);
                   // console.log('datLength '+ data.length);
                   // console.log('percent ' + percent);
                    process.stdout.cursorTo(0);
                    process.stdout.clearLine(1);
                    var message = (percent * 100).toFixed(2) + '% ';
                    process.stdout.write(message);
                    io.emit('message', message);
                })
                res.on('end', function() {
                    console.log('gt etsi?');
                    process.stdout.write('\n');
                })
            })
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


  
