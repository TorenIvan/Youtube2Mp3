const fatherProc  =  require('child_process');

const path = require('path');
const childProc   =  fatherProc.fork(path.join(__dirname, 'ytdlChildproc.js'), { silent: true });


function build(url, type){

  childProc.on('message', (m) => {
      console.log('PARENT got message:', m);
    });
    
  // Causes the child to print: CHILD got message: { hello: 'world' }
  childProc.send({ hello: 'world' });

  // Father process will make the youtube download. If receives the message to kill it will be killed , otherwise continue

}


module.exports = build;