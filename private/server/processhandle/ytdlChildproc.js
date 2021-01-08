process.on('message', (m) => {
    console.log('CHILD got message:', m);
  });
  
  // Causes the parent to print: PARENT got message: { foo: 'bar', baz: null }
  process.send({ foo: 'bar', baz: NaN });


  // Child process will do thw ytdl.getInfo and if conditions it will send a signal(or message) to father to exit 
                                          //else it will send a signal(or message) to father to pipe the mp3(or mp4 to the response)