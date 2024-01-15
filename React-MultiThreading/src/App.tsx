import CarRoad from "./components/Roads/CarRoad";
import Car from "./components/Vehicles/Car";
import Train from "./components/Vehicles/Train";
import TrainRoad from "./components/Roads/TrainRoad";
import ControlPanel from "./components/ControlPanel";
import { useState, useRef, useEffect } from "react";

function App() {
  const [carState, setCarState] = useState<string | undefined>("Cars drive");
  const [marginValue, setMarginValue] = useState<number>(0);
  const [marginLeft, setMarginLeft] = useState<number>(-260);
  const [carRoadHeight, setCarRoadHeight] = useState<number>();
  const [carRoadWidth, setCarRoadWidth] = useState<number>();
  const [trainRoadHeight, setTrainRoadHeight] = useState<number>();
  const [trainRoadWidth, setTrainRoadWidth] = useState<number>();
  const [appIsRunning, setAppIsRunning] = useState<boolean>(true);

  const marginValueRef = useRef(marginValue);
  const marginLeftRef = useRef(marginLeft);

  const appStartHandler = () => {
    console.log(appIsRunning);
    return setAppIsRunning(true);
  };
  const appStopHandler = () => {
    console.log(appIsRunning);
    return setAppIsRunning(false);
  };
  useEffect(() => {
    marginLeftRef.current = marginLeft;
  }, [marginLeft]);
  useEffect(() => {
    marginValueRef.current = marginValue;
  }, [marginValue]);

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
          setMarginLeft(-260);
          if (marginValueRef.current < 520) {
            return "Cars stop";
          } else return "Cars drive";
        }
      });
    };

    const carInterval = setInterval(() => {
      if (carState === "Cars drive") {
        //        console.log(marginValueRef.current,carRoadHeight)
        if (marginValueRef.current > carRoadHeight!) {
          setMarginValue(0);
        }

        setMarginValue((prev) => {
          const newValue = prev + 2;
          return newValue;
        });
      } else if (carState === "Cars stop") {
        if (marginValueRef.current < 400) {
          setMarginValue((prev) => prev + 2);
        } else {}
        if (marginLeftRef.current > trainRoadWidth! / 2) {
          setCarState("Cars drive");
        }
      }
    }, 10);

    const trainInterval = setInterval(() => {
      setMarginLeft((prev) => prev + 4);
    }, 15);

    return () => {
      clearInterval(carInterval);
      clearInterval(trainInterval);
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
          <Car marginValue={marginValue} />
        </CarRoad>
        <TrainRoad>
          <Train marginLeft={marginLeft} />
        </TrainRoad>
      </div>
    </>
  );
}

export default App;
