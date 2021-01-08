const ytdl = require('ytdl-core');
const { getInfo } = require('ytdl-core');

class YouTubeParser {

  //constructor
  constructor(url){
    this.url = url;
    console.log('ir8e')
  }

  //get video id (aka vid or v)
  YouTubeGetID(){
    let ID = '';
    let url = this.url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    }
    else {
      ID = url;
    }
      return ID;
  }

  YouTubeGetID2(){
    return ytdl.getURLVideoID(this.url);
  }

  YouTubeValidateId(){
    let id = ytdl.getURLVideoID(this.url);
    return ytdl.validateID(id);
  }

  YouTubeValidateURL(){
    return ytdl.validateURL(this.url);
  }

  YouTubeGetInfo(){
    return new Promise((resolve, reject) => {
      ytdl.getInfo(this.url, function(err, info) {
        if (err) reject(err);
        resolve(info);
     }).then((result) => {
       resolve(result);
     }).catch((_message) => {
       reject(_message);
     });
    });
  }

}

module.exports = YouTubeParser;


//Example usage

// let kana = new YouTubeParser('https://www.youtube.com/watch?v=dlFA0Zq1k2A');

// console.log(kana.YouTubeGetID());
// console.log(kana.YouTubeGetID());
// console.log(kana.YouTubeValidateURL());
// console.log(kana.YouTubeValidateId());

// kana.YouTubeGetInfo()
// .then((message) => {
//   console.log(message.videoDetails.title);
//   console.log(message.videoDetails.lengthSeconds);
// }).catch((_message) => {
//   console.log('somethig is sooooo wrong');
// });



