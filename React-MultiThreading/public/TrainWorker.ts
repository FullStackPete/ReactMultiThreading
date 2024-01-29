let TrainMargin = -260;
let trainMessage = "";
onmessage = (e) => {
  trainMessage = e.data;
};

setInterval(() => {
  if (trainMessage == "Train comes") {
    TrainMargin += 4;
    self.postMessage(TrainMargin);
  } else if (trainMessage == "resetTrain") {
    TrainMargin = -260;
    self.postMessage("Train has been reset");
  }
}, 10);
