const fatherProc  =  require('child_process');

const childProc    = fatherProc.fork(`ytdlChildproc.js`);


//edo ftiaxnoume to mp3 ;i to mp4, type is mp3 or mp4
export default function(url, type){

  childProc.on('message', (m) => {
      console.log('PARENT got message:', m);
    });
    
  // Causes the child to print: CHILD got message: { hello: 'world' }
  childProc.send({ hello: 'world' });

  // Father process will make the youtube download. If receives the message to kill it will be killed , otherwise continue

}