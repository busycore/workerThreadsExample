const {parentPort,workerData} =require('worker_threads');

function getPi() {
    let sum = 0;

    for (let n = 0; n < 10000000000; n++) {
      let mult = n % 2 === 0 ? 1 : -1;
      sum += mult * (1 / (2 * n + 1));
    }

    return sum * 4;
  }

parentPort.on('message',(param)=>{
    //got from "post message"
    console.log(param);
    //Got from the workerData passed by the main thread
    console.log(workerData);
    //Now the magick happens
    const pi = getPi();
    //return the value to the main thread
    parentPort.postMessage(pi);
})