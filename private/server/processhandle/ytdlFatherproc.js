const fatherProc  =  require('child_process');

var path = require('path');
const childProc    = fatherProc.fork(path.join(__dirname, 'ytdlChildproc.js'), { silent: true });


//edo ftiaxnoume to mp3 ;i to mp4, type is mp3 or mp4
function build(url, type){

  childProc.on('message', (m) => {
      console.log('PARENT got message:', m);
    });
    
  // Causes the child to print: CHILD got message: { hello: 'world' }
  childProc.send({ hello: 'world' });

  // Father process will make the youtube download. If receives the message to kill it will be killed , otherwise continue

}


module.exports = build;