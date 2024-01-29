import CarRoad from "./components/Roads/CarRoad";
import Car from "./components/Vehicles/Car";
import Train from "./components/Vehicles/Train";
import TrainRoad from "./components/Roads/TrainRoad";
import ControlPanel from "./components/ControlPanel";
import { useState, useRef, useEffect } from "react";

function App() {
  const [carState, setCarState] = useState<string | undefined>("Cars drive");
  const [marginCar, setmarginCar] = useState<number>(0);
  const [marginTrain, setMarginTrain] = useState<number>(-260);
  const [carRoadHeight, setCarRoadHeight] = useState<number>();
  const [carRoadWidth, setCarRoadWidth] = useState<number>();
  const [trainRoadHeight, setTrainRoadHeight] = useState<number>();
  const [trainRoadWidth, setTrainRoadWidth] = useState<number>();
  const [appIsRunning, setAppIsRunning] = useState<boolean>(true);

  const marginCarRef = useRef(marginCar);
  const marginTrainRef = useRef(marginTrain);

  const appStartHandler = () => {
    console.log(appIsRunning);
    return setAppIsRunning(true);
  };
  const appStopHandler = () => {
    console.log(appIsRunning);
    return setAppIsRunning(false);
  };
  useEffect(() => {
    marginTrainRef.current = marginTrain;
  }, [marginTrain]);
  useEffect(() => {
    marginCarRef.current = marginCar;
  }, [marginCar]);

  useEffect(() => {
    // Poniższy kod zostanie wykonany po zamontowaniu komponentu
    const trainRoadElement = document.getElementById("TrainRoad");
    const carRoadElement = document.getElementById("CarRoad");
    if (carRoadElement && trainRoadElement) {
      setTrainRoadHeight(trainRoadElement.offsetHeight);
      setTrainRoadWidth(trainRoadElement.offsetWidth);
      setCarRoadHeight(carRoadElement.offsetHeight);
      setCarRoadWidth(carRoadElement.offsetWidth);
      console.log("Car road height",carRoadHeight);
      console.log("Car road width", carRoadWidth);
      console.log("Train road height",trainRoadHeight);
      console.log("Train road width", trainRoadWidth);
    }
  }, [carRoadHeight, carRoadWidth]);

  useEffect(() => {
    if (!appIsRunning) return;
    const car = new Worker("CarWorker.ts");
    const train = new Worker("TrainWorker.ts");
    car.postMessage("Cars drive");
    train.postMessage("Train comes");

    car.onmessage = (e) => {
      setmarginCar(e.data);
      if (e.data == "Car has been reset") {
        car.postMessage("Cars drive");
      }
    };

    train.onmessage = (e) => {
      setMarginTrain(e.data);
      if (e.data == "Train has been reset") {
        train.postMessage("Train comes");
      }
    };

    const gameUpdate = setInterval(() => {
      //resetujemy pozycję autka, gdy przejedzie cały ekran
      if (marginCarRef.current > carRoadHeight!) {
        car.postMessage("resetCar");
        console.log("resetCar")
      }
      if (marginTrainRef.current > trainRoadWidth!) {
        train.postMessage("resetTrain");
      }
      if (
        marginTrainRef.current < trainRoadWidth! / 2 &&
        marginCarRef.current < carRoadHeight! / 2 - trainRoadHeight! &&
        marginCarRef.current >
          carRoadHeight! / 2 - (1 / 3) * (carRoadHeight! / 2)
      ) {
        car.postMessage("Cars stop");
      } else {
        car.postMessage("Cars drive");
      }
    },20);

    return () => {
      clearInterval(gameUpdate);
      car.terminate();
      train.terminate();
    };
  }, [carState, carRoadHeight, appIsRunning]);

  return (
    <>
      <ControlPanel
        appStartHandler={appStartHandler}
        appStopHandler={appStopHandler}
      />
      <div className="h-screen">
        <CarRoad>
          <Car marginCar={marginCar} />
        </CarRoad>
        <TrainRoad>
          <Train marginLeft={marginTrain} />
        </TrainRoad>
      </div>
    </>
  );
}

export default App;
