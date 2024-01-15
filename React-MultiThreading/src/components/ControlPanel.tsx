import ControlBtn from "./ControlBtn";
import { ControlPanelType } from "../Models/model";


function ControlPanel({appStartHandler,appStopHandler }:ControlPanelType) {
  


  return (
    <div className="flex bg-black justify-center items-center h-28 fixed top-0 w-full z-20">
      <ControlBtn appStateHandler={appStartHandler} actionType="Start" />
      <ControlBtn appStateHandler={appStopHandler} actionType="Stop" />
    </div>
  );
}
export default ControlPanel;
