let carMargin2 = 0;
let message2 = "";
let car2SpeedStep = 2;
onmessage = (e) => {
  message2 = e.data[0];
car2SpeedStep=e.data[1]
};

setInterval(() => {
  if (message2 == "Cars drive") {
    carMargin2 += car2SpeedStep; // Różnica w prędkości
    self.postMessage(carMargin2);
  } else if (message2 == "Cars stop") {
    self.postMessage(carMargin2);
  } else if (message2 == "resetCar") {
    carMargin2 = 0;
    self.postMessage("Car has been reset");
  }
}, 16.666);