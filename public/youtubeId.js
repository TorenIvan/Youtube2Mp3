const ytdl = require('ytdl-core');
const getYoutubeTitle = require('get-youtube-title');
const { getInfo } = require('ytdl-core');

 class YouTubeParser {

  //constructor
  constructor(url){
    this.url = url;
    console.log(this.url);
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


  //get video title
   async YouTubeGetInfo(){
    let id = ytdl.getURLVideoID(this.url);
    let info = await ytdl.getInfo(id);
    return info;
  }
 
}


let kana = new YouTubeParser('https://www.youtube.com/watch?v=dlFA0Zq1k2A');
console.log(kana.YouTubeGetID());
console.log(kana.YouTubeGetID());
console.log(kana.YouTubeValidateURL());
console.log(kana.YouTubeValidateId());
// console.log(kana.YouTubeGetTitle());
// kana.YouTubeGetTitle();
// kana.YouTubeGetTitle();
(async () => {
  console.log(await kana.YouTubeGetInfo());
})()


