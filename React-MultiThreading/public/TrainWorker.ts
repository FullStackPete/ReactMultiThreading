function TrainComes(){
  self.postMessage("Train comes");
}

onmessage = (e)=>{

}

setInterval(TrainComes,10000)