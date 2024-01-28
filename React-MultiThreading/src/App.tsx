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
      console.log(carRoadHeight);
      console.log(carRoadWidth);
      console.log(trainRoadHeight);
      console.log(trainRoadWidth);
    }
  }, [carRoadHeight, carRoadWidth]);

  useEffect(() => {
    if (!appIsRunning) return;
    const car = new Worker("CarWorker.ts");
    const train = new Worker("TrainWorker.ts");

    train.onmessage = (e) => {
      console.log("Received message from TrainWorker:", e.data);
      // Use a callback to ensure you get the correct state
      setCarState((prevCarState) => {
        if (e.data === "Train comes") {
          setMarginTrain(-260);
          if (marginCarRef.current < carRoadHeight! / 2) {
            console.log("CARS STOP!!!!!!!!!!!!!");
            return "Cars stop";
          } else return "Cars drive";
        }
      });
    };

    const gameUpdate = setInterval(() => {
      setMarginTrain((prev) => prev + 4);

      if (carState === "Cars drive") {
        //        console.log(marginCarRef.current,carRoadHeight)
        if (marginCarRef.current > carRoadHeight!) {
          setmarginCar(0);
        }

        setmarginCar((prev) => {
          const newValue = prev + 3;
          return newValue;
        });
      } else if (carState === "Cars stop") {
        console.log(carRoadHeight! / 2 - trainRoadHeight! * 2);
        if (marginCarRef.current <= carRoadHeight! / 2 - trainRoadHeight! * 2) {
          // sprawdzay czy auto jest przy drodze pociagu.
          setmarginCar((prev) => prev + 3); //jesli jeszcze nie dojechalo to auto jedzie
        } else if (marginTrainRef.current >= trainRoadWidth!) {
          setCarState("Cars drive");
        } else {
          setmarginCar((prev) => prev);
        }
      }
    }, 5);

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
