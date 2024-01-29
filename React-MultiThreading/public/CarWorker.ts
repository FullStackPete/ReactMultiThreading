let carMargin = 0;
let message = "";

onmessage = (e) => {
  message = e.data;
};
setInterval(() => {
  if (message == "Cars drive") {
    carMargin += 8;
    self.postMessage(carMargin);
  } else if (message == "Cars stop") {
    self.postMessage(carMargin);
  } else if (message == "resetCar") {
    carMargin = 0;
    self.postMessage("Car has been reset");
  }
}, 10);
