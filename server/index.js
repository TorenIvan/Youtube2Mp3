//"strict mode" -> ECMAScript and above
"use strict";

//require modules
const express = require("express");
const http = require("http");
const Socket = require("socket.io");
const cors = require("cors");
const ytdl = require("ytdl-core");
const contentDisposition = require("content-disposition");
const helmet = require("helmet");
const path = require("path");
const readline = require("readline");
const ffmpeg = require('./ffmpeg');
require('dotenv').config();
//custom requires
const YouTubeParser = require("./youtubeclasses/youtubebasic");

//create express app -> server(from app) -> socket(attached to server) -> port(from-environment or 5005)
const app = express();
const server = http.createServer(app);
const io = Socket(server);
const PORT = process.env.PORT;

//server listen to port
server.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});

//connect to socket
io.on("connection", (socket) => {
  console.log("a user connected");
});

//path to serve static files
app.use(express.static(path.join(__dirname, "../")));

//request to homepage
app.get("/", (req, res) => {
  res.sendFile("../../index.html");
});

//middleware usage
app.use(cors()); //to enable all CORS(Cross-Origin Resource Sharing) requests
app.use(helmet()); //to secure the Express app by setting various HTTP headers

//Main Usage
app.get("/songs", function (req, res) {
  let url = req.query.url;
  let video = new YouTubeParser(url);

  if (video.YouTubeValidateURL(url) == true) {
    //handler to add if video exists

    video.YouTubeGetInfo().then((message) => {
      //.catch to add and length checker
      console.log(message.videoDetails.title);
      console.log(message.videoDetails.lengthSeconds);

      let title = `${message.videoDetails.title}`;
      title = encodeRFC5987ValueChars(title) + ".mp3";

      res.set("Content-Disposition", contentDisposition(title));
      res.header({ "Content-Type": "audio/mpeg" });

      let stream = ytdl(url, { filter: "audioonly", quality: "highestaudio" });
      let starttime;
      // stream.pipe(res);
      stream.once("response", () => {
        starttime = Date.now();
      });
      stream.on("progress", (chunkLength, downloaded, total) => {
        const percent = downloaded / total;
        const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
        const estimatedDownloadTime =
          downloadedMinutes / percent - downloadedMinutes;
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
        process.stdout.write(
          `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
            total /
            1024 /
            1024
          ).toFixed(2)}MB)\n`
        );
        process.stdout.write(
          `running for: ${downloadedMinutes.toFixed(2)}minutes`
        );
        process.stdout.write(
          `, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `
        );
        readline.moveCursor(process.stdout, 0, -1);
        io.emit("message", `${(percent * 100).toFixed(2)}%`);
      });
      stream.on("end", () => {
        process.stdout.write("\n\n");
        console.log("Stream ended");
      });

      // Send compressed audio data
      ffmpeg()
        .input(stream)
        .audioCodec("libmp3lame")
        .toFormat("mp3")
        .on("error", function (err, stdout, stderr) {
          console.log("an error happened: " + err.message);
          console.log("ffmpeg stdout: " + stdout);
          console.log("ffmpeg stderr: " + stderr);
        })
        .on("end", function () {
          console.log("Processing finished !");
        })
        .pipe(res, { end: true });
    });
  }
});

app.get("/videos", function (req, res) {
  let url = req.query.url;
  let video = new YouTubeParser(url);

  if (video.YouTubeValidateURL(url) == true) {
    //handler to add if video exists

    video.YouTubeGetInfo().then((message) => {
      //.catch to add and length checker
      console.log(message.videoDetails.title);
      console.log(message.videoDetails.lengthSeconds);

      let title = `${message.videoDetails.title}`;
      title = encodeRFC5987ValueChars(title) + ".mp4";

      res.set("Content-Disposition", contentDisposition(title));
      res.header({ "Content-Type": "video/mp4" });
      let stream = ytdl(url, {
        filter: "audioandvideo",
        quality: "highestvideo",
      });
      let starttime;
      stream.pipe(res);
      stream.once("response", () => {
        starttime = Date.now();
      });
      stream.on("progress", (chunkLength, downloaded, total) => {
        const percent = downloaded / total;
        const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
        const estimatedDownloadTime =
          downloadedMinutes / percent - downloadedMinutes;
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
        process.stdout.write(
          `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
            total /
            1024 /
            1024
          ).toFixed(2)}MB)\n`
        );
        process.stdout.write(
          `running for: ${downloadedMinutes.toFixed(2)}minutes`
        );
        process.stdout.write(
          `, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `
        );
        readline.moveCursor(process.stdout, 0, -1);
        io.emit("message", `${(percent * 100).toFixed(2)}%`);
      });
      stream.on("end", () => {
        process.stdout.write("\n\n");
      });
    });
  }
});

function encodeRFC5987ValueChars(str) {
  return (
    encodeURIComponent(str)
      // Note that although RFC3986 reserves "!", RFC5987 does not,
      // so we do not need to escape it
      .replace(/['()]/g, escape) // i.e., %27 %28 %29
      .replace(/\*/g, "%2A")
      // The following are not required for percent-encoding per RFC5987,
      // so we can allow for a little better readability over the wire: |`^
      .replace(/%(?:7C|60|5E)/g, unescape)
  );
}
