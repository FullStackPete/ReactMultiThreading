import ControlBtn from "./ControlBtn";
import { ControlPanelType } from "../Models/model";
import SpeedChange from "./SpeedChange";
function ControlPanel({ appRestartHandler,numberOfCarsChanged,trainSpeed,handleTrainSpeedChange,car1Speed,car2Speed,handleCar1SpeedChange,handleCar2SpeedChange,car2Exists }: ControlPanelType) {
  return (
    <div className="flex bg-black justify-center items-center h-28 fixed top-0 w-full z-20">
      <ControlBtn appStateHandler={appRestartHandler} actionType="Restart" />
      <label htmlFor="numOfCars"></label>
      <div className="flex flex-col">
      <p className="text-white text-lg">Number of cars</p>      
      <select onChange={(e)=>numberOfCarsChanged(e)}>        
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      </div>
      <SpeedChange min={8} max={24} title="Train speed" value={trainSpeed} onChange={handleTrainSpeedChange}/>
      <SpeedChange min={2} max={10} title="Car 1 speed" value={car1Speed} onChange={handleCar1SpeedChange}/>
      {car2Exists&&<SpeedChange min={2} max={10} title="Car 2 speed" value={car2Speed} onChange={handleCar2SpeedChange}/>}
    </div>
  );
}
export default ControlPanel;
