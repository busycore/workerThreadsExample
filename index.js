const express = require('express');
const app = express();
const { Worker } = require('worker_threads');

app.get('/', function (req, res) {
  const worker = new Worker(__dirname+"/worker.js",{
      //Here we pass anything to the worker
      workerData:{ms:'toastie'}
    })

    worker.on('message',(pi)=>{
        res.send(`Pi Value, ${pi}`);
    })

    worker.on('error',(err)=>{
        res.status(500).json({ message: err.message });
    })

    worker.on('exit',(code)=>{
        if(code!==0){
            res.status(500).json({ message: code });
        }
    })
    //Here we pass the message as argument to the child worker threads
    worker.postMessage('Yo Main this is a msg a')
});

app.get('/hello', function (req, res) {
  res.send(`hello world`);
});

app.listen(3333);