const fatherProc  =  require('child_process');

const childProc    = fatherProc.fork(`ytdlChildproc.js`);

childProc.on('message', (m) => {
    console.log('PARENT got message:', m);
  });
  
// Causes the child to print: CHILD got message: { hello: 'world' }
childProc.send({ hello: 'world' });

// Father process will make the youtube download. If receives the message to kill it will be killed , otherwise continue