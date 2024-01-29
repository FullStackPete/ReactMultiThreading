import CarRoad from "./components/Roads/CarRoad";
import Car from "./components/Vehicles/Car";
import Train from "./components/Vehicles/Train";
import TrainRoad from "./components/Roads/TrainRoad";
import ControlPanel from "./components/ControlPanel";
import { useState, useRef, useEffect } from "react";

function App() {
  const [trainSpeed, setTrainSpeed] = useState<number>(8);
  const [car1Speed,setCar1Speed] = useState<number>(2);
  const [car2Speed,setCar2Speed] = useState<number>(2);
  const [numberOfCars, setNumberOfCars] = useState<number>(1);
  const [marginCar2, setMarginCar2] = useState<number>(0);
  const [marginCar, setmarginCar] = useState<number>(0);
  const [marginTrain, setMarginTrain] = useState<number>(-260);
  const [carRoadHeight, setCarRoadHeight] = useState<number>();
  const [carRoadWidth, setCarRoadWidth] = useState<number>();
  const [trainRoadHeight, setTrainRoadHeight] = useState<number>();
  const [trainRoadWidth, setTrainRoadWidth] = useState<number>();
  const [appIsRunning, setAppIsRunning] = useState<boolean>(true);

  const marginCarRef = useRef(marginCar);
  const marginCar2Ref = useRef(marginCar2);
  const marginTrainRef = useRef(marginTrain);

  const handleCar1SpeedChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
const newCar1Speed = parseInt(event.target.value,10);
setCar1Speed(newCar1Speed);
  }
  const handleCar2SpeedChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const newCar2Speed = parseInt(event.target.value,10);
    setCar2Speed(newCar2Speed);
      }
  const handleTrainSpeedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTrainSpeed = parseInt(event.target.value, 10);
    setTrainSpeed(newTrainSpeed);
  };
  const appRestartHandler = () => {
    setAppIsRunning(false);
    setTimeout(() => {
      setAppIsRunning(true);
    }, 50);
  };
  useEffect(() => {
    marginTrainRef.current = marginTrain;
    marginCarRef.current = marginCar;
    marginCar2Ref.current = marginCar2;
  }, [marginCar, marginCar2, marginTrain]);

  const numOfCarsChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedNumberOfCars = parseInt(event.target.value, 10);
    setNumberOfCars(selectedNumberOfCars);
    console.log(selectedNumberOfCars);
    appRestartHandler();
  };
  useEffect(() => {
    // Poniższy kod zostanie wykonany po zamontowaniu komponentu
    const trainRoadElement = document.getElementById("TrainRoad");
    const carRoadElement = document.getElementById("CarRoad");
    if (carRoadElement && trainRoadElement) {
      setTrainRoadHeight(trainRoadElement.offsetHeight);
      setTrainRoadWidth(trainRoadElement.offsetWidth);
      setCarRoadHeight(carRoadElement.offsetHeight);
      setCarRoadWidth(carRoadElement.offsetWidth);
    }
  }, [carRoadHeight, carRoadWidth]);

  useEffect(() => {
    const car = new Worker("CarWorker.ts");
    const car2 = new Worker("CarWorker2.ts");
    const train = new Worker("TrainWorker.ts");
    car.postMessage(["Cars drive",car1Speed]);
    if (numberOfCars == 2) {
      car2.postMessage(["Cars drive",car2Speed]);
    }
    train.postMessage(["Train comes",trainSpeed]);
    if (!appIsRunning) return;

    car.onmessage = (e) => {
      setmarginCar(e.data);
      if (e.data == "Car has been reset") {
        car.postMessage(["Cars drive",car1Speed]);
      }
    };

    if (numberOfCars == 2) {
      car2.onmessage = (e) => {
        setMarginCar2(e.data);
        if (e.data == "Car has been reset") {
          car2.postMessage(["Cars drive",car2Speed]);
        }
      };
    }

    train.onmessage = (e) => {
      setMarginTrain(e.data);
      if (e.data == "Train has been reset") {
        train.postMessage(["Train comes",trainSpeed]);
      }
    };

    const gameUpdate = setInterval(() => {
      //resetujemy pozycję autka, gdy przejedzie cały ekran
      if (marginCarRef.current > carRoadHeight!) {
        car.postMessage(["resetCar",car1Speed]);
      }

      if (marginCar2Ref.current > carRoadHeight! && numberOfCars == 2) {
        car2.postMessage(["resetCar",car2Speed]);
      }

      if (marginTrainRef.current > trainRoadWidth!) {
        train.postMessage(["resetTrain",trainSpeed]);
      }
      if (
        marginTrainRef.current < trainRoadWidth! / 2 &&
        marginCarRef.current < carRoadHeight! / 2 - trainRoadHeight! &&
        marginCarRef.current >
          carRoadHeight! / 2 - (1 / 3) * (carRoadHeight! / 2)
      ) {
        car.postMessage(["Cars stop",car1Speed]);
      } else {
        car.postMessage(["Cars drive",car1Speed]);
      }

      if (
        marginTrainRef.current < trainRoadWidth! / 2 &&
        marginCar2Ref.current < carRoadHeight! / 2 - trainRoadHeight! &&
        marginCar2Ref.current >
          carRoadHeight! / 2 - (1 / 3) * (carRoadHeight! / 2) &&
        numberOfCars == 2
      ) {
        car2.postMessage(["Cars stop",car2Speed]);
      } else {
        car2.postMessage(["Cars drive",car2Speed]);
      }
    }, 5);

    return () => {
      clearInterval(gameUpdate);
      car.terminate();
      car2.terminate();
      train.terminate();
    };
  }, [carRoadHeight, appIsRunning,trainSpeed,car1Speed,car2Speed]);

  return (
    <>
      <ControlPanel
      car2Exists={numberOfCars==2}
      car1Speed={car1Speed}
      car2Speed={car2Speed}
      handleCar1SpeedChange={handleCar1SpeedChange}
      handleCar2SpeedChange={handleCar2SpeedChange}
        trainSpeed={trainSpeed}
        handleTrainSpeedChange={handleTrainSpeedChange}
        numberOfCarsChanged={(event) => numOfCarsChanged(event)}
        appRestartHandler={appRestartHandler}
      />
      <div className="h-screen">
        <CarRoad>
          <Car imageName="Car1.png" customClass="ml-1" marginCar={marginCar} />
          {numberOfCars == 2 && (
            <Car
              imageName="Car2.png"
              customClass="ml-2"
              marginCar={marginCar2}
            />
          )}
        </CarRoad>
        <TrainRoad>
          <Train marginLeft={marginTrain} />
        </TrainRoad>
      </div>
    </>
  );
}

export default App;
