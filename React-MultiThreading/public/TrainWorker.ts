let TrainMargin = -260;
let trainMessage = "";
let trainMarginStep = 8;
onmessage = (e) => {
  trainMarginStep= e.data[1];
  trainMessage = e.data[0];  
};

setInterval(() => {
  if (trainMessage == "Train comes") {
    TrainMargin += trainMarginStep;
    self.postMessage(TrainMargin);
  } else if (trainMessage == "resetTrain") {
    TrainMargin = -260;
    self.postMessage("Train has been reset");
  }
}, 16.666);
