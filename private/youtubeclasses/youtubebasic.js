const ytdl = require('ytdl-core');
const { getInfo } = require('ytdl-core');
const getYoutubeTitle = require('get-youtube-title');

class YouTubeParser {

  //constructor
  constructor(url){
    this.url = url;
  }

  getUrl(){
    return this.url;
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

  // videoExists(){
  //   return ytdl.chooseFormat(info.formats, { quality: '134' });
  // }

  // YouTubeGetTitle(){
  //   return getYoutubeTitle(ytdl.getURLVideoID(this.url), function (err, title) {
  //     console.log(title); // 'SLCHLD - EMOTIONS (feat. RIPELY) (prod. by GILLA)'
  //     // return title;
  //   })
  //   // console.log(title); 
  // }

  YouTubeGetTitle(){
    return new Promise((resolve) => {
      getYoutubeTitle(ytdl.getURLVideoID(this.url), function(title) {
        resolve(title);
      });
    });
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

// let yurl = new YouTubeParser('https://www.youtube.com/watch?v=dlFA0Zq1k2A');


// yurl.YouTubeGetTitle().then(message => console.log(message));
    


  //   console.log(message.videoDetails);
// console.log(yurl.YouTubeGetID());
// console.log(yurl.YouTubeValidateURL());
// console.log(yurl.YouTubeValidateId());

// yurl.YouTubeGetInfo()
// .then((message) => {
//   console.log(message.formats);
// //  console.log(message.videoDetails.title);
// //   console.log(message.videoDetails.lengthSeconds);
// }).catch((_message) => {
//   console.log('somethig is sooooo wrong');
// });



