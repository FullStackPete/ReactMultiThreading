let carMargin = 0;
let message = "";
let car1SpeedStep = 2;
onmessage = (e) => {

  message = e.data[0];
  car1SpeedStep=e.data[1]
};
setInterval(() => {
  if (message == "Cars drive") {
    carMargin += car1SpeedStep;
    self.postMessage(carMargin);
  } else if (message == "Cars stop") {
    self.postMessage(carMargin);
  } else if (message == "resetCar") {
    carMargin = 0;
    self.postMessage("Car has been reset");
  }
}, 16.666);
