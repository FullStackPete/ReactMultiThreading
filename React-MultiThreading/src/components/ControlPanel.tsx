import ControlBtn from "./ControlBtn";
import { ControlPanelType } from "../Models/model";

function ControlPanel({ appStartHandler, appStopHandler }: ControlPanelType) {
  return (
    <div className="flex bg-black justify-center items-center h-28 fixed top-0 w-full z-20">
      <ControlBtn appStateHandler={appStartHandler} actionType="Start" />
      <ControlBtn appStateHandler={appStopHandler} actionType="Stop" />
      <label htmlFor="numOfCars"></label>
      <div className="flex flex-col">
      <p className="text-white text-lg">Number of cars</p>      
      <select>        
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      </div>
    </div>
  );
}
export default ControlPanel;
