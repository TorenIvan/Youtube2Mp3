const ytdl = require("ytdl-core");
const getYoutubeTitle = require("get-youtube-title");

class YouTubeParser {
  constructor(url) {
    this.url = url;
  }

  getUrl() {
    return this.url;
  }

  YouTubeGetID() {
    let ID = "";
    let url = this.url
      .replace(/(>|<)/gi, "")
      .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    } else {
      ID = url;
    }
    return ID;
  }

  YouTubeGetID2() {
    return ytdl.getURLVideoID(this.url);
  }

  YouTubeValidateId() {
    let id = ytdl.getURLVideoID(this.url);
    return ytdl.validateID(id);
  }

  YouTubeValidateURL() {
    return ytdl.validateURL(this.url);
  }

  YouTubeGetTitle() {
    return new Promise((resolve) => {
      getYoutubeTitle(ytdl.getURLVideoID(this.url), function (title) {
        resolve(title);
      });
    });
  }

  YouTubeGetInfo() {
    return new Promise((resolve, reject) => {
      ytdl
        .getInfo(this.url, function (err, info) {
          if (err) reject(err);
          resolve(info);
        })
        .then((result) => {
          resolve(result);
        })
        .catch((_message) => {
          reject(_message);
        });
    });
  }
}

module.exports = YouTubeParser;
