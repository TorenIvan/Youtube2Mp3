const ytdl = require('ytdl-core');
const getYoutubeTitle = require('get-youtube-title');

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
   YouTubeGetTitle(){
    let id = ytdl.getURLVideoID(this.url);
    getYoutubeTitle(id, function (err, title) {
      title = title.replace(/[^a-z0-9\-]/gi, '_');
      // console.log(title); // 'SLCHLD - EMOTIONS (feat. RIPELY) (prod. by GILLA)'
      return title;
    });
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
  let x = await kana.YouTubeGetTitle();
  console.log(x);
})()


